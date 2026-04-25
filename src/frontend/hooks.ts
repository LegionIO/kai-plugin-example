/**
 * React hooks for accessing plugin state and config
 * These are provided by the Kai plugin environment
 */

// Note: In the actual Kai environment, these hooks are provided
// This is just a type reference for development

export function usePluginState<T>(): T {
  // @ts-expect-error - Provided by Kai runtime
  return window.usePluginState?.();
}

export function usePluginConfig<T>(): {
  config: T;
  updateConfig: (path: string, value: unknown) => void;
} {
  // @ts-expect-error - Provided by Kai runtime
  return window.usePluginConfig?.();
}
