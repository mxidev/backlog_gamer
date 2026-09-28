export interface AppConfig {
  port: number;
}

export function loadConfig(): AppConfig {
  const port = process.env.PORT;

  if (port === undefined || port === '') {
    throw new Error('Environment variable PORT is required');
  }

  const parsedPort = Number(port);

  if (Number.isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
    throw new Error(`Invalid PORT value: ${port}. Must be a number between 1 and 65535`);
  }

  return { port: parsedPort };
}
