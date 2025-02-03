import { registerAs } from '@nestjs/config';

export const WEB_CONFIG = 'web';

export default registerAs(WEB_CONFIG, () => ({
  webHost: process.env.WEB_HOST,
  webPort: process.env.WEB_PORT,
}));
