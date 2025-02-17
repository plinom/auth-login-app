import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FIREBASE_CONFIG } from 'src/common/configs/firebase-admin.config';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: this.configService.get<string>(
          `${FIREBASE_CONFIG}.clientEmail`,
        ),
        privateKey: this.configService.get<string>(
          `${FIREBASE_CONFIG}.privateKey`,
        ),
        projectId: this.configService.get<string>(
          `${FIREBASE_CONFIG}.projectId`,
        ),
      }),
    });
  }

  async verifyToken(token: string) {
    try {
      return admin.auth().verifyIdToken(token);
    } catch (error) {
      this.logger.error(`Error verifying id token ${error}`);
      throw new Error(`Error verifying id token ${error}`);
    }
  }
}
