import React from 'react';
import { usePluginState } from '../hooks.ts';
import type { PluginState } from '../../shared/types.ts';

/**
 * Main panel component for the plugin
 * Uses Tailwind CSS for styling
 */

export function ExamplePanel() {
  const state = usePluginState<PluginState>();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Example Plugin</h1>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Plugin State</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total greetings: <span className="font-mono font-bold">{state.messageCount}</span>
        </p>
        {state.lastMessage && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Last message: <span className="italic">{state.lastMessage}</span>
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">How to use this plugin:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>Ask Claude to use the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">example_greet</code> tool</li>
            <li>Try: "Use the example greet tool to say hello to Alice"</li>
            <li>Watch the message count update in real-time</li>
          </ol>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Plugin Features:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Backend tool registration (<code className="text-xs">example_greet</code>)</li>
            <li>Real-time state synchronization</li>
            <li>Settings panel integration</li>
            <li>Notification support</li>
            <li>Tailwind CSS styling</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
