import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './modules/firebase/firebase.module';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from './shared/config/firebase-config';

@Module({
  imports: [FirebaseModule],
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
