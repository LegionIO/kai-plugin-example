import { buildExampleTools } from './tools.js';
import { PANEL_ID, NAV_ID, SETTINGS_ID, PLUGIN_NAME, PLUGIN_ICON } from '../shared/constants.js';
import type { PluginAPI, PluginState } from '../shared/types.js';

/**
 * Plugin backend entry point
 * This runs in the Node.js/Electron main process
 */

let api: PluginAPI | null = null;

export async function activate(pluginAPI: PluginAPI): Promise<void> {
  api = pluginAPI;

  // Initialize plugin state
  const initialState: PluginState = {
    messageCount: 0,
  };
  api.state.replace(initialState);

  // Register tools that Claude can call
  const tools = buildExampleTools(api);
  api.tools.register(tools);

  // Register UI components
  api.ui.registerPanel({
    id: PANEL_ID,
    title: PLUGIN_NAME,
    component: 'ExamplePanel',
    visible: true,
  });

  api.ui.registerNavigationItem({
    id: NAV_ID,
    label: PLUGIN_NAME,
    icon: { lucide: PLUGIN_ICON },
    visible: true,
    priority: 50,
    target: { type: 'panel', panelId: PANEL_ID },
  });

  api.ui.registerSettingsSection({
    id: SETTINGS_ID,
    label: PLUGIN_NAME,
    component: 'ExampleSettings',
    priority: 50,
  });

  api.log.info('Example plugin activated');
}

export async function deactivate(): Promise<void> {
  api?.log.info('Example plugin deactivated');
  api = null;
}
