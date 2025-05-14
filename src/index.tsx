import type { Decorator, StoryObj } from "@storybook/react";
import { useArgs, useEffect, useRef } from "storybook/internal/preview-api";
import { isEqual } from "es-toolkit";
import { subscribe } from "valtio";

type StoreValue = unknown | Record<string, unknown>;

interface StoreType {
	[key: string]: StoreValue;
}

const linkArgToStore = (args: unknown, store: StoreType | undefined) => {
	if (!args || typeof args !== "object" || !store) {
		return;
	}
	Object.keys(args).forEach((key) => {
		if (store.hasOwnProperty(key)) {
			const target = (args as Record<string, unknown>)[key];
			if (
				typeof target === "object" &&
				target &&
				typeof store[key] === "object" &&
				store[key]
			) {
				Object.keys(target).forEach((subKey) => {
					if ((store[key] as Record<string, unknown>).hasOwnProperty(subKey)) {
						if (
							!isEqual(
								(store[key] as Record<string, unknown>)[subKey],
								(target as Record<string, unknown>)[subKey],
							)
						) {
							(store[key] as Record<string, unknown>)[subKey] = (
								target as Record<string, unknown>
							)[subKey];
						}
					}
				});
			}
		}
	});
};

const Args = (store: StoreType | unknown) => {
	const args: Record<string, unknown> = {};
	if (!store) {
		return args;
	}

	Object.keys(store).forEach((key) => {
		args[`${key}`] = (store as Record<string, unknown>)[key];
	});

	return args;
};

type StoreConfig = Record<string, unknown>;

export function withStores<
	Stores extends StoreConfig,
	Story extends StoryObj<unknown>,
>(stores: Stores, story?: Story) {
	return {
		...story,
		parameters: {
			...story?.parameters,
			store: {
				...(story?.parameters?.store || {}),
				...stores,
			},
		},
		args: {
			...Object.entries(stores).reduce(
				(acc, [key, store]) => {
					acc[key] = Args(store);
					return acc;
				},
				{} as Record<string, unknown>,
			),
			...story?.args,
		},
	};
}

/** Story Args binding to Valtio store */
export const StoryBindValtioStoreDecorator: Decorator = (Story, context) => {
	const [args] = useArgs();

	const isExistStore = Boolean(context.parameters.store);

	if (!isExistStore) {
		return <Story args={args} />;
	}

	if (context.parameters.store) {
		linkArgToStore(args, context.parameters.store);
	}

	return <Story args={args} />;
};

/** Valtio store binding to Storybook args */
export const ValtioStoreBindStory: Decorator = (
	Story,
	{ args, parameters },
) => {
	const [, updateArgs] = useArgs();
	const argsRef = useRef(args);
	const parametersRef = useRef(parameters);

	argsRef.current = args;
	parametersRef.current = parameters;

	useEffect(() => {
		const disposers: (() => void)[] = [];
		// merge store to
		const newArgs = {
			...argsRef.current,
			...parametersRef.current.store,
		};
		if (parametersRef.current.store) {
			// subscribe to store changes
			Object.keys(parametersRef.current.store).forEach((key) => {
				const disposer = subscribe(parametersRef.current.store[key], () => {
					updateArgs(newArgs);
				});

				disposers.push(disposer);
			});
		}
		return () => {
			disposers.forEach((disposer) => disposer());
		};
	}, [updateArgs]);
	return <Story args={args} />;
};

export const ValtioStorybookTwoWayBindingDecorators = [
	ValtioStoreBindStory,
	StoryBindValtioStoreDecorator,
];
