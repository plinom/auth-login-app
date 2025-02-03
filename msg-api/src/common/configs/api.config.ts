import { registerAs } from '@nestjs/config';

export const API_CONFIG = 'api';

export default registerAs(API_CONFIG, () => ({
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT,
}));
