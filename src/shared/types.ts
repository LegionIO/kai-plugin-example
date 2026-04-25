/**
 * Shared types used by both backend and frontend
 */

export type PluginConfig = {
  greeting: string;
  enabled: boolean;
  showGreeting: boolean;
};

export type PluginState = {
  messageCount: number;
  lastMessage?: string;
};

// PluginAPI is provided by Kai - these are the types for reference
export type PluginAPI = {
  config: {
    get: () => PluginConfig;
    set: (path: string, value: unknown) => void;
  };
  state: {
    get: () => PluginState;
    replace: (state: PluginState) => void;
    set: (path: string, value: unknown) => void;
  };
  tools: {
    register: (tools: ToolDefinition[]) => void;
  };
  ui: {
    registerPanel: (descriptor: PanelDescriptor) => void;
    registerNavigation: (descriptor: NavigationDescriptor) => void;
    registerSettings: (descriptor: SettingsDescriptor) => void;
  };
  notifications: {
    show: (descriptor: NotificationDescriptor) => void;
    dismiss: (id: string) => void;
  };
  events: {
    emit: (eventName: string, data: unknown) => void;
  };
  log: {
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
  };
};

export type ToolDefinition = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  handler: (params: Record<string, unknown>) => Promise<string>;
};

export type PanelDescriptor = {
  id: string;
  title: string;
  component: string;
};

export type NavigationDescriptor = {
  id: string;
  label: string;
  icon: string;
  targetPanelId: string;
};

export type SettingsDescriptor = {
  id: string;
  title: string;
  component: string;
};

export type NotificationDescriptor = {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
};
