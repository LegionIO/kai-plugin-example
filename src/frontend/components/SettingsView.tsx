import React from 'react';
import type { PluginComponentProps } from '../hooks.ts';
import type { PluginConfig } from '../../shared/types.ts';

export function SettingsView({ pluginConfig, setPluginConfig }: PluginComponentProps<Record<string, unknown>, PluginConfig>) {
  const config: PluginConfig = pluginConfig ?? { greeting: 'Hello', enabled: true, showGreeting: true };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold">Example Plugin</h3>

      <fieldset className="rounded-lg border p-3 space-y-3">
        <legend className="text-xs font-semibold px-1">Greeting</legend>

        <div className="flex items-start justify-between gap-3 rounded-md border p-3">
          <div>
            <span className="text-xs font-medium">Show greeting</span>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Display the greeting message at the top of the plugin panel.
            </p>
          </div>
          <input
            type="checkbox"
            checked={config.showGreeting}
            onChange={(e) => setPluginConfig?.('showGreeting', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded"
          />
        </div>

        <div>
          <label className="text-[10px] text-muted-foreground block mb-0.5">Greeting message</label>
          <input
            type="text"
            value={config.greeting}
            onChange={(e) => setPluginConfig?.('greeting', e.target.value)}
            placeholder="e.g. Hello"
            className="w-full rounded-xl border border-border/70 bg-card/80 px-3 py-2 text-xs outline-none"
          />
        </div>
      </fieldset>
    </div>
  );
}
