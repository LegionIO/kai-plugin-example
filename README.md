# Kai Plugin Example

A template and reference implementation for building Kai plugins. Use this as a starting point for creating your own plugins.

## Features

This example demonstrates:

- **Backend Tools**: Register tools that Claude can call
- **Frontend UI**: React components with Tailwind CSS
- **State Management**: Real-time state synchronization between backend and frontend
- **Settings Panel**: User-configurable options with schema validation
- **Navigation**: Custom navigation items with Lucide icons
- **Notifications**: Show native and in-app notifications
- **TypeScript**: Full type safety across backend and frontend

## Project Structure

```
kai-plugin-example/
├── src/
│   ├── backend/           # Node.js/Electron main process code
│   │   ├── index.ts       # Plugin entry point (activate/deactivate)
│   │   └── tools.ts       # Tool definitions and handlers
│   ├── frontend/          # Browser/renderer process code
│   │   ├── index.ts       # React component registration
│   │   ├── hooks.ts       # React hooks (usePluginState, usePluginConfig)
│   │   └── components/    # React UI components
│   │       ├── ExamplePanel.tsx     # Main plugin panel
│   │       └── ExampleSettings.tsx  # Settings panel
│   └── shared/            # Code shared between backend and frontend
│       ├── types.ts       # TypeScript type definitions
│       └── constants.ts   # Shared constants
├── dist/                  # Build output (generated)
│   ├── backend.js         # Bundled backend code
│   └── frontend.js        # Frontend entry point
├── plugin.json            # Plugin manifest
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── esbuild.config.mjs     # Build configuration
└── .github/workflows/
    └── release.yml        # Automated release workflow
```

## Getting Started

### 1. Use This Template

Click "Use this template" on GitHub or clone this repository:

```bash
git clone https://github.com/YOUR_USERNAME/kai-plugin-example.git my-plugin
cd my-plugin
```

### 2. Customize Your Plugin

Update `plugin.json` with your plugin details:

```json
{
  "name": "my-plugin",
  "displayName": "My Plugin",
  "version": "0.1.0",
  "description": "What your plugin does",
  "author": "Your Name",
  "permissions": ["tools:register", "ui:panel", "ui:navigation", "ui:settings"],
  "priority": 50,
  "required": false,
  "configSchema": {
    "type": "object",
    "properties": {
      "yourSetting": {
        "type": "string",
        "default": "default value"
      }
    }
  }
}
```

Update `package.json`:

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "author": "Your Name"
}
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Develop Your Plugin

- **Backend**: Edit `src/backend/index.ts` and `src/backend/tools.ts`
- **Frontend**: Edit components in `src/frontend/components/`
- **Types**: Define shared types in `src/shared/types.ts`

### 5. Build

```bash
npm run build
```

This creates:
- `dist/backend.js` - Bundled backend code
- `dist/frontend.js` - Frontend entry point

### 6. Test Locally

Copy the entire plugin directory to Kai's plugins folder:

```bash
# macOS
cp -r . ~/Library/Application\ Support/Kai/plugins/my-plugin/

# Linux
cp -r . ~/.config/Kai/plugins/my-plugin/

# Windows
cp -r . %APPDATA%\Kai\plugins\my-plugin\
```

Restart Kai to load your plugin.

## Plugin Manifest

The `plugin.json` file defines your plugin's metadata and permissions:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique plugin identifier (lowercase, no spaces) |
| `displayName` | string | Human-readable name shown in UI |
| `version` | string | Semantic version (e.g., "1.0.0") |
| `description` | string | Short description of what the plugin does |
| `author` | string | Plugin author name |
| `permissions` | array | Required permissions (see below) |
| `priority` | number | Loading order (lower = earlier) |
| `required` | boolean | Whether plugin is required for app to function |
| `configSchema` | object | JSON Schema for user configuration |

### Available Permissions

- `config:read` - Read app configuration
- `config:write` - Modify app configuration
- `tools:register` - Register tools for Claude
- `ui:banner` - Show banner notifications
- `ui:modal` - Show modal dialogs
- `ui:settings` - Add settings panel
- `ui:panel` - Add custom panels
- `ui:navigation` - Add navigation items
- `messages:hook` - Intercept/modify messages
- `network:fetch` - Make HTTP requests
- `auth:window` - Open OAuth windows
- `http:listen` - Start HTTP server
- `notifications:send` - Show notifications
- `conversations:read` - Read conversation data
- `conversations:write` - Modify conversations
- `navigation:open` - Navigate to different views
- `state:publish` - Publish plugin state to frontend
- `agent:generate` - Call AI agent
- `safe-storage` - Access encrypted storage
- `browser:window` - Open browser windows

## Plugin API

### Backend API

The `PluginAPI` object is passed to your `activate()` function:

```typescript
export async function activate(api: PluginAPI): Promise<void> {
  // Register tools
  api.tools.register([
    {
      name: 'my_tool',
      description: 'What the tool does',
      inputSchema: { /* JSON Schema */ },
      execute: async (input) => {
        // Tool implementation
        return { result: 'success' };
      }
    }
  ]);

  // Register UI
  api.ui.registerPanel({
    id: 'my-panel',
    title: 'My Panel',
    component: 'MyPanel',
    visible: true,
  });

  api.ui.registerNavigationItem({
    id: 'my-nav',
    label: 'My Plugin',
    icon: { lucide: 'plug' }, // Lucide icon name
    visible: true,
    priority: 50,
    target: { type: 'panel', panelId: 'my-panel' },
  });

  api.ui.registerSettingsSection({
    id: 'my-settings',
    label: 'My Plugin',
    component: 'MySettings',
    priority: 50,
  });

  // Manage state
  api.state.replace({ count: 0 });
  api.state.set('count', 1);

  // Access config
  const config = api.config.get();
  api.config.set('setting', 'value');

  // Show notifications
  api.notifications.show({
    id: 'my-notif',
    title: 'Hello',
    body: 'Notification body',
    level: 'info',
  });

  // Logging
  api.log.info('Plugin activated');
  api.log.warn('Warning message');
  api.log.error('Error message');
}

export async function deactivate(): Promise<void> {
  // Cleanup
}
```

### Frontend API

React components access plugin state and config via hooks:

```tsx
import { usePluginState, usePluginConfig } from '../hooks';

export function MyPanel() {
  const state = usePluginState<MyState>();
  const { config, updateConfig } = usePluginConfig<MyConfig>();

  return (
    <div>
      <p>Count: {state.count}</p>
      <input
        value={config.setting}
        onChange={(e) => updateConfig('setting', e.target.value)}
      />
    </div>
  );
}
```

### Icons

Icons can be specified in two ways:

```typescript
// Lucide icon (recommended)
icon: { lucide: 'clock' }

// Custom SVG
icon: { svg: '<svg>...</svg>' }
```

Browse available Lucide icons at [lucide.dev](https://lucide.dev/).

## Building and Releasing

### Manual Build

```bash
npm run build
```

### Automated Release

This template includes a GitHub Actions workflow for automated releases:

1. Go to **Actions** tab in your GitHub repository
2. Select **Release Plugin** workflow
3. Click **Run workflow**
4. Choose version bump (major/minor/patch)
5. Workflow will:
   - Bump version in `plugin.json` and `package.json`
   - Commit and tag the release
   - Build the plugin
   - Create GitHub release with tarball asset

### Release Asset Format

Releases must include a tarball named `{plugin-name}-v{version}.tar.gz` containing:
- `plugin.json`
- `dist/` folder with `backend.js` and `frontend.js`

Example: `my-plugin-v1.0.0.tar.gz`

## Publishing to Marketplace

To list your plugin in the Kai marketplace:

1. Create a GitHub repository for your plugin
2. Create a release using the workflow above
3. Submit a PR to [kai-plugin-marketplace](https://github.com/LegionIO/kai-plugin-marketplace) adding your plugin to `marketplace.json`:

```json
{
  "name": "my-plugin",
  "displayName": "My Plugin",
  "description": "What your plugin does",
  "repository": "YOUR_USERNAME/my-plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "tags": ["category", "feature"],
  "icon": "plug"
}
```

## Development Tips

### Hot Reload

During development, you can use watch mode:

```bash
npm run build:watch
```

Then manually copy to Kai's plugins folder and restart Kai to see changes.

### TypeScript

All source files in `src/` should be TypeScript (`.ts` or `.tsx`). The build process compiles and bundles everything into JavaScript.

### Debugging

- Backend logs appear in Kai's main process logs
- Frontend logs appear in browser DevTools console
- Use `api.log.info()`, `api.log.warn()`, `api.log.error()` for structured logging

### State vs Config

- **State**: Runtime data that changes during plugin execution (not persisted)
- **Config**: User settings that persist across sessions (saved to disk)

### Error Handling

Always wrap async operations in try-catch:

```typescript
try {
  const result = await someAsyncOperation();
  api.state.set('result', result);
} catch (error) {
  api.log.error('Operation failed:', error);
  api.notifications.show({
    id: 'error',
    title: 'Error',
    body: error.message,
    level: 'error',
  });
}
```

## Examples

### Tool with Parameters

```typescript
{
  name: 'greet_user',
  description: 'Greet a user by name',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'User name' }
    },
    required: ['name']
  },
  execute: async (input) => {
    const greeting = `Hello, ${input.name}!`;
    api.state.set('lastGreeting', greeting);
    return { message: greeting };
  }
}
```

### Settings with Validation

```json
{
  "configSchema": {
    "type": "object",
    "properties": {
      "apiKey": {
        "type": "string",
        "description": "Your API key",
        "minLength": 32
      },
      "enabled": {
        "type": "boolean",
        "default": true
      },
      "maxRetries": {
        "type": "number",
        "minimum": 1,
        "maximum": 10,
        "default": 3
      }
    },
    "required": ["apiKey"]
  }
}
```

### React Component with Tailwind

```tsx
export function MyPanel() {
  const state = usePluginState<MyState>();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Plugin</h1>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Count: {state.count}
        </p>
      </div>
    </div>
  );
}
```

## License

MIT

## Support

- Report issues: [GitHub Issues](https://github.com/YOUR_USERNAME/kai-plugin-example/issues)
- Join discussion: [Kai Discord](https://discord.gg/kai) <!-- Update with actual link -->
- Documentation: [Kai Plugin Docs](https://docs.kai.ai/plugins) <!-- Update with actual link -->
