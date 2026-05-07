import React from 'react';
import type { PluginComponentProps } from '../hooks.ts';
import type { PluginState, PluginConfig } from '../../shared/types.ts';

export function PanelView({ pluginState, pluginConfig }: PluginComponentProps<PluginState, PluginConfig>) {
  const state = pluginState ?? { messageCount: 0 };
  const config: PluginConfig = pluginConfig ?? { greeting: 'Hello', enabled: true, showGreeting: true };

  return (
    <div className="space-y-4 p-4">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Example Plugin</h2>
          <p className="text-[10px] text-muted-foreground">Template &amp; reference implementation</p>
        </div>
      </div>

      <fieldset className="space-y-3 rounded-lg border border-border/50 p-3">
        <legend className="px-1 text-[10px] font-medium text-muted-foreground">Greeting</legend>

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
      </fieldset>

      <fieldset className="space-y-2 rounded-lg border border-border/50 p-3">
        <legend className="px-1 text-[10px] font-medium text-muted-foreground">Resources</legend>
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
