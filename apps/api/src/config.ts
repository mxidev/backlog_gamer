import { JWT_SECRET } from './constants';

export interface AppConfig {
  port: number;
  jwtSecret: string;
  rawgApiKey: string;
}

export function loadConfig(): AppConfig {
  const port = process.env.PORT;
  const rawgApiKey = process.env.RAWG_API_KEY;

  if (port === undefined || port === '') {
    throw new Error('Environment variable PORT is required');
  }

  const parsedPort = Number(port);

  if (Number.isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
    throw new Error(`Invalid PORT value: ${port}. Must be a number between 1 and 65535`);
  }

  if (!rawgApiKey) {
    throw new Error('Environment variable RAWG_API_KEY is required');
  }

  return {
    port: parsedPort,
    jwtSecret: JWT_SECRET,
    rawgApiKey,
  };
}
