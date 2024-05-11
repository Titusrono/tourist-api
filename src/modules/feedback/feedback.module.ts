import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback/feedback.service';
import { FeedbackController } from './feedback/feedback.controller';
import { FirestoreService } from '../firebase/services/firestore/firestore.service';

@Module({
  providers: [FeedbackService, FirestoreService],
  controllers: [FeedbackController]
})
export class FeedbackModule {}
