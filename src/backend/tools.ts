import type { PluginAPI, ToolDefinition } from '../shared/types.js';

/**
 * Build tool definitions that Claude can call
 */
export function buildExampleTools(api: PluginAPI): ToolDefinition[] {
  return [
    {
      name: 'greet',
      description: 'Send a greeting message. Use this to demonstrate how tools work.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name to greet',
          },
        },
        required: ['name'],
      },
      handler: async (params: Record<string, unknown>) => {
        const name = params.name as string;
        const config = api.config.get();
        const state = api.state.get();

        // Update plugin state
        const newCount = state.messageCount + 1;
        const message = `${config.greeting}, ${name}!`;

        api.state.set('messageCount', newCount);
        api.state.set('lastMessage', message);

        // Show notification
        api.notifications.show({
          id: `greet-${Date.now()}`,
          title: 'Greeting Sent',
          message,
          type: 'success',
        });

        api.log.info(`Greeted ${name}, total greetings: ${newCount}`);

        return message;
      },
    },
  ];
}
