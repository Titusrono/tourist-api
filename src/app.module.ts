import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './modules/firebase/firebase.module';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from './shared/config/firebase-config';
import { FeedbackModule } from './modules/feedback/feedback.module';

@Module({
  imports: [FirebaseModule, FeedbackModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'FirebaseAdmin',
      useValue: admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        databaseURL: firebaseConfig.databaseURL,
      }),
    },
  ],
})
export class AppModule {}
