# Kai Plugin Example

A template and reference implementation for building Kai plugins. Use this as a starting point for your own plugin.

## Project Structure

```
kai-plugin-example/
├── src/
│   ├── backend/           # Node.js/Electron main process code
│   │   ├── index.ts       # Plugin entry point (activate/deactivate)
│   │   └── tools.ts       # Tool definitions and handlers
│   ├── frontend/          # Browser/renderer process code
│   │   ├── index.ts       # React component registration
│   │   ├── hooks.ts       # Shared prop types for plugin components
│   │   └── components/
│   │       ├── ExamplePanel.tsx    # Main plugin panel
│   │       └── ExampleSettings.tsx # Settings panel
│   └── shared/            # Shared between backend and frontend
│       ├── types.ts        # TypeScript type definitions
│       └── constants.ts   # Shared constants (IDs, icons)
├── dist/                  # Build output (gitignored)
├── plugin.json            # Plugin manifest
├── package.json
├── tsconfig.json
├── esbuild.config.mjs
└── .github/workflows/
    └── release.yml        # Automated release workflow
```

## Getting Started

### 1. Use This Template

Click **Use this template** on GitHub, then clone your new repo:

```bash
git clone https://github.com/YOUR_USERNAME/my-plugin.git
cd my-plugin
npm install
```

### 2. Update Plugin Identity

**`plugin.json`** — change `name`, `displayName`, `description`, `author`:
```json
{
  "name": "my-plugin",
  "displayName": "My Plugin",
  "version": "0.1.0",
  "description": "What your plugin does",
  "author": "Your Name"
}
```

**`package.json`** — update `name` and `author` to match.

### 3. Develop

```bash
npm run dev
```

Builds to `~/.kai/plugins/{name}/` and watches for changes. Restart Kai to reload after changes.

### 4. Build for Release

```bash
npm run build
```

Outputs `dist/plugin.json`, `dist/backend.js`, and `dist/frontend.js`.

---

## Plugin Manifest (`plugin.json`)

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique identifier (lowercase, no spaces) |
| `displayName` | string | Human-readable name shown in UI |
| `version` | string | Semantic version |
| `description` | string | Short description |
| `author` | string | Author name |
| `permissions` | array | Declared permissions (see below) |
| `priority` | number | Load order — lower loads first |
| `required` | boolean | If true, Kai won't start without it |
| `configSchema` | object | JSON Schema for user-editable settings |

### Permissions

| Permission | What it allows |
|------------|----------------|
| `config:read` | Read app configuration |
| `config:write` | Write app configuration |
| `tools:register` | Register tools Claude can call |
| `ui:panel` | Add full-page panels |
| `ui:navigation` | Add sidebar navigation items |
| `ui:settings` | Add a settings section |
| `ui:banner` | Show inline banners |
| `ui:modal` | Show modal dialogs |
| `state:publish` | Sync backend state to frontend |
| `notifications:send` | Show in-app and native notifications |
| `http:listen` | Start a local HTTP server |
| `network:fetch` | Make outbound HTTP requests |
| `messages:hook` | Intercept or modify messages |
| `conversations:read` | Read conversation data |
| `conversations:write` | Create or update conversations |
| `navigation:open` | Trigger in-app navigation |
| `agent:generate` | Call the AI agent from the backend |
| `safe-storage` | Encrypted key/value storage |
| `auth:window` | Open OAuth browser windows |
| `browser:window` | Open arbitrary browser windows |

---

## Backend API

Your `activate()` function receives a `PluginAPI` object:

```typescript
export async function activate(api: PluginAPI): Promise<void> {
  // State (synced to frontend via pluginState prop)
  api.state.replace({ count: 0 });
  api.state.set('count', 1);

  // Config (persisted to ~/.kai/plugins/{name}/settings.json)
  const config = api.config.getPluginData();
  api.config.setPluginData('key', 'value');

  // Tools Claude can call
  api.tools.register([{
    name: 'my_tool',
    description: 'What it does',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
    },
    execute: async (input) => ({ result: `Hello, ${input.name}!` }),
  }]);

  // UI registration
  api.ui.registerPanel({ id: 'my-panel', title: 'My Plugin', component: 'MyPanel', visible: true });
  api.ui.registerNavigationItem({
    id: 'my-nav',
    label: 'My Plugin',
    icon: { lucide: 'plug' }, // or { svg: '<svg>...</svg>' }
    visible: true,
    priority: 50,
    target: { type: 'panel', panelId: 'my-panel' },
  });
  api.ui.registerSettingsSection({ id: 'my-settings', label: 'My Plugin', component: 'MySettings', priority: 50 });

  // Notifications
  api.notifications.show({ id: 'n1', title: 'Hello', body: 'World', level: 'info' });

  // Logging
  api.log.info('Plugin activated');
}

export async function deactivate(): Promise<void> {
  // Clean up timers, connections, etc.
}
```

---

## Frontend API

Kai passes state and config as **props** to every plugin component. Destructure what you need:

```tsx
import React from 'react';
import type { PluginComponentProps } from '../hooks.ts';
import type { MyState, MyConfig } from '../../shared/types.ts';

export function MyPanel({ pluginState, pluginConfig, setPluginConfig, onAction }: PluginComponentProps<MyState, MyConfig>) {
  const state = pluginState ?? { count: 0 };
  const config = pluginConfig ?? { greeting: 'Hello' };

  return (
    <div className="p-6">
      <p className="text-sm text-foreground">{config.greeting}</p>
      <p className="text-xs text-muted-foreground">Count: {state.count}</p>
      <button onClick={() => setPluginConfig?.('greeting', 'Hi')}>
        Change greeting
      </button>
    </div>
  );
}
```

### Styling

Use Kai's semantic Tailwind classes — they automatically adapt to light and dark mode:

| Class | Purpose |
|-------|---------|
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary/hint text |
| `bg-background` | Page background |
| `bg-card` | Card/surface background |
| `bg-muted` | Subtle background |
| `border-border` | Default border |
| `text-primary` | Accent/link color |

> **Do not** use hardcoded color utilities like `text-gray-600` or `dark:bg-gray-800` — those classes are not included in Kai's compiled stylesheet.

### Opening Settings from a Panel

```typescript
window.dispatchEvent(new CustomEvent('kai:open-settings', {
  detail: { plugin: 'my-plugin-name' }
}));
```

### Icons

```typescript
icon: { lucide: 'clock' }    // Lucide icon name (lucide.dev)
icon: { svg: '<svg>...</svg>' } // Custom SVG string
```

---

## Building and Releasing

### Development

```bash
npm run dev
```

Builds backend and frontend to `~/.kai/plugins/{name}/` and watches for changes. plugin.json is copied automatically. Restart Kai after each rebuild.

### Production Build

```bash
npm run build
```

Outputs to `dist/`:
```
dist/
├── plugin.json
├── backend.js
├── backend.js.map
├── frontend.js
└── frontend.js.map
```

### Automated Release

The included GitHub Actions workflow handles versioning and publishing:

1. Go to **Actions → Release Plugin → Run workflow**
2. Choose a version bump (major / minor / patch)
3. The workflow will:
   - Bump version in `plugin.json` and `package.json`
   - Commit and tag the release
   - Build the plugin
   - Create a GitHub Release with `{name}-v{version}.tar.gz`

---

## Publishing to the Marketplace

1. Create a GitHub release using the workflow above
2. Open a PR on [kai-plugin-marketplace](https://github.com/LegionIO/kai-plugin-marketplace) adding your entry to `marketplace.json`:

```json
{
  "name": "my-plugin",
  "displayName": "My Plugin",
  "description": "What your plugin does",
  "repository": "YOUR_USERNAME/my-plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "tags": ["category"],
  "icon": "plug"
}
```

---

## License

MIT
