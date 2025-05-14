import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	target: "esnext",
	dts: true,
	sourcemap: false,
	clean: true,
	format: ["esm"],
	external: ["es-toolkit", "@storybook/react", "storybook", "valtio"],
});
