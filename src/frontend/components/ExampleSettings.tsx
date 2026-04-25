import React from 'react';
import { usePluginConfig } from '../hooks.ts';
import type { PluginConfig } from '../../shared/types.ts';

/**
 * Settings panel component
 * Demonstrates how to read and update plugin configuration
 */

export function ExampleSettings() {
  const { config, updateConfig } = usePluginConfig<PluginConfig>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Example Plugin Settings</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Configure how the plugin behaves
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Greeting Message
          </label>
          <input
            type="text"
            value={config.greeting}
            onChange={(e) => updateConfig('greeting', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter greeting"
          />
          <p className="text-xs text-gray-500 mt-1">
            The greeting used when the tool is called
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => updateConfig('enabled', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Enable plugin</span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            When disabled, the plugin will not respond to tool calls
          </p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-gray-500">
          Configuration is saved automatically and synced across the plugin
        </p>
      </div>
    </div>
  );
}
