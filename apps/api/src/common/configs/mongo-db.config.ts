import { registerAs } from '@nestjs/config';

export const MONGO_CONFIG = 'mongo';

export default registerAs(MONGO_CONFIG, () => ({
  uri: process.env.MONGO_URI,
}));
