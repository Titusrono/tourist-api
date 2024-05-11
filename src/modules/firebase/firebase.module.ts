import { Module } from '@nestjs/common';
import { FirestoreService } from './services/firestore/firestore.service';
import { RtdbService } from './services/rtdb/rtdb.service';

@Module({
  providers: [FirestoreService, RtdbService]
})
export class FirebaseModule {}
