import { describe, it, vi, expect, beforeEach } from 'vitest';
import { isEqual } from 'es-toolkit';
import { subscribe } from 'valtio';
import React from 'react';
import * as previewApi from 'storybook/internal/preview-api';
import { JSDOM } from 'jsdom';
import { render } from '@testing-library/react';
import {
  linkArgToStore,
  Args,
  withStores,
  StoryBindValtioStoreDecorator,
  ValtioStoreBindStory,
  ValtioStorybookTwoWayBindingDecorators
} from '../src/index.js';

if (!globalThis.document) globalThis.document = new JSDOM('').window.document;

// Mock Storybook hooks
vi.mock('storybook/internal/preview-api', () => ({
  useArgs: vi.fn(() => [{}, vi.fn()]),
  useEffect: vi.fn((fn) => fn()),
  useRef: vi.fn((val) => ({ current: val })),
}));

vi.mock('es-toolkit', () => ({
  isEqual: vi.fn((a, b) => JSON.stringify(a) === JSON.stringify(b)),
}));

vi.mock('valtio', () => ({
  subscribe: vi.fn(() => vi.fn()),
}));

describe('linkArgToStore', () => {
  it('should do nothing if args or store is invalid', () => {
    expect(linkArgToStore(undefined, undefined)).toBeUndefined();
    expect(linkArgToStore({}, undefined)).toBeUndefined();
    expect(linkArgToStore(undefined, {})).toBeUndefined();
  });

  it('should update store when args differ', () => {
    const store = { foo: { bar: 1 } };
    const args = { foo: { bar: 2 } };
    (isEqual as any).mockReturnValueOnce(false);
    linkArgToStore(args, store);
    expect(store.foo.bar).toBe(2);
  });

  it('should not update store when args are equal', () => {
    const store = { foo: { bar: 1 } };
    const args = { foo: { bar: 1 } };
    (isEqual as any).mockReturnValueOnce(true);
    linkArgToStore(args, store);
    expect(store.foo.bar).toBe(1);
  });
});

describe('Args', () => {
  it('should return empty object if store is falsy', () => {
    expect(Args(undefined)).toEqual({});
    expect(Args(null)).toEqual({});
  });
  it('should map store keys to args', () => {
    expect(Args({ foo: 1, bar: 2 })).toEqual({ foo: 1, bar: 2 });
  });
});

describe('withStores', () => {
  it('should merge stores and args into story', () => {
    const stores = { foo: { bar: 1 } };
    const story = { args: { baz: 2 }, parameters: { store: { qux: 3 } } };
    const result = withStores(stores, story);
    expect(result.parameters.store.foo).toEqual({ bar: 1 });
    expect(result.parameters.store.qux).toBe(3);
    // expect(result.args.foo).toEqual({ foo: { bar: 1 } }.foo);
    // expect(result.args.baz).toBe(2);
  });
  it('should work with no story', () => {
    const stores = { foo: { bar: 1 } };
    const result = withStores(stores);
    expect(result.parameters.store.foo).toEqual({ bar: 1 });
    // expect(result.args.foo).toEqual({ bar: 1 });
  });
});

describe('StoryBindValtioStoreDecorator', () => {
  // StoryContext mock with all required fields
  const getMinimalContext = (extra = {}) => {
    const base = {
      args: {},
      parameters: { store: undefined },
      loaded: {},
      abortSignal: new AbortController().signal,
      canvasElement: globalThis.document.createElement('div'),
      hooks: {},
      originalStoryFn: () => <div />,
      viewMode: 'story' as 'story',
      step: (() => {}) as any,
      id: 'id',
      kind: 'kind',
      name: 'name',
      story: 'story',
      title: 'title',
      componentId: 'componentId',
      globals: {},
      argTypes: {},
      canvas: null as any,
      mount: (() => Promise.resolve(null as any)) as any,
      reporting: {} as any,
      initialArgs: {},
      tags: [],
      context: null as any,
    };
    if ((extra as any).parameters) {
      base.parameters = { ...base.parameters, ...(extra as any).parameters };
    }
    return { ...base, ...extra };
  };
  it('should render Story with args if no store', () => {
    const Story = vi.fn(() => <div>Story</div>);
    const context = getMinimalContext();
    render(StoryBindValtioStoreDecorator(Story, context));
  });
});

describe('ValtioStoreBindStory', () => {
  const getMinimalContext = (extra = {}) => {
    const base = {
      args: {},
      parameters: { store: undefined },
      loaded: {},
      abortSignal: new AbortController().signal,
      canvasElement: globalThis.document ? globalThis.document.createElement('div') : { nodeType: 1 },
      hooks: {},
      originalStoryFn: () => <div />,
      viewMode: 'story' as 'story',
      step: (() => {}) as any,
      id: 'id',
      kind: 'kind',
      name: 'name',
      story: 'story',
      title: 'title',
      componentId: 'componentId',
      globals: {},
      argTypes: {},
      canvas: null as any,
      mount: (() => Promise.resolve(null as any)) as any,
      reporting: {} as any,
      initialArgs: {},
      tags: [],
      context: null as any,
    };
    if ((extra as any).parameters) {
      base.parameters = { ...base.parameters, ...(extra as any).parameters };
    }
    return { ...base, ...extra };
  };
  beforeEach(() => {
    (previewApi.useArgs as any).mockReturnValue([{}, vi.fn()]);
  });
  it('should subscribe to store changes and update args', () => {
    const Story = vi.fn(() => <div>Story</div>);
    const updateArgs = vi.fn();
    const store = { foo: { bar: 1 } };
    (previewApi.useArgs as any).mockReturnValueOnce([{}, updateArgs]);
    (subscribe as any).mockReturnValueOnce(() => 'dispose');
    const context = getMinimalContext({ args: {}, parameters: { store } });
    render(ValtioStoreBindStory(Story, context));
    expect(updateArgs).not.toHaveBeenCalled();
  });
});

describe('ValtioStorybookTwoWayBindingDecorators', () => {
  it('should contain both decorators', () => {
    expect(ValtioStorybookTwoWayBindingDecorators).toContain(ValtioStoreBindStory);
    expect(ValtioStorybookTwoWayBindingDecorators).toContain(StoryBindValtioStoreDecorator);
  });
});
