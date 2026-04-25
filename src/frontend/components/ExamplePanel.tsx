import React from 'react';
import type { PluginComponentProps } from '../hooks.ts';
import type { PluginState, PluginConfig } from '../../shared/types.ts';

export function ExamplePanel({ pluginState, pluginConfig }: PluginComponentProps<PluginState, PluginConfig>) {
  const state = pluginState ?? { messageCount: 0 };
  const config: PluginConfig = pluginConfig ?? { greeting: 'Hello', enabled: true, showGreeting: true };

  const openSettings = () => {
    window.dispatchEvent(new CustomEvent('kai:open-settings', { detail: { plugin: 'example' } }));
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">

      <fieldset className="rounded-lg border p-3 space-y-3">
        <legend className="text-xs font-semibold px-1">Greeting</legend>

        {config.showGreeting ? (
          <p className="text-sm text-foreground">{config.greeting}</p>
        ) : (
          <p className="text-xs text-muted-foreground italic">Greeting hidden</p>
        )}

        {state.messageCount > 0 && (
          <p className="text-[10px] text-muted-foreground">
            Tool called {state.messageCount} {state.messageCount === 1 ? 'time' : 'times'}
            {state.lastMessage ? ` — last: "${state.lastMessage}"` : ''}
          </p>
        )}

        <button
          onClick={openSettings}
          className="rounded-lg border border-border/70 bg-card/80 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          Configure greeting →
        </button>
      </fieldset>

      <fieldset className="rounded-lg border p-3 space-y-2">
        <legend className="text-xs font-semibold px-1">Resources</legend>
        {[
          { label: 'GitHub Repository', description: 'Browse the source code and use this as a template.', href: 'https://github.com/LegionIO/kai-plugin-example' },
          { label: 'README & Documentation', description: 'Full guide covering the plugin API, build system, and how to publish.', href: 'https://github.com/LegionIO/kai-plugin-example#readme' },
          { label: 'Plugin Marketplace', description: 'Browse and install plugins built by the community.', href: 'https://github.com/LegionIO/kai-plugin-marketplace' },
        ].map((r) => (
          <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer"
            className="flex items-start justify-between gap-3 rounded-md border p-3 hover:bg-muted/50 transition-colors no-underline">
            <div>
              <span className="text-xs font-medium text-foreground">{r.label}</span>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{r.description}</p>
            </div>
            <span className="text-muted-foreground text-xs mt-0.5 shrink-0">↗</span>
          </a>
        ))}
      </fieldset>

    </div>
  );
}
