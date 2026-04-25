import { ExamplePanel } from './components/ExamplePanel.tsx';
import { ExampleSettings } from './components/ExampleSettings.tsx';

/**
 * Plugin frontend entry point
 * This runs in the browser/renderer process
 */

export function register(env) {
  // Make React available globally for components
  globalThis.React = env.React;

  // Register React components
  env.registerComponents('example', {
    ExamplePanel,
    ExampleSettings,
  });
}
