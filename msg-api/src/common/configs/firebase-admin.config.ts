import { registerAs } from '@nestjs/config';

export const FIREBASE_CONFIG = 'firebase-admin';

export default registerAs(FIREBASE_CONFIG, () => ({
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  projectId: process.env.FIREBASE_PROJECT_ID,
}));
