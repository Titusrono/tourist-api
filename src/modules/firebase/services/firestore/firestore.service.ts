import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from 'src/shared/config/firebase-config';

@Injectable()
export class FirestoreService {
    private readonly db: FirebaseFirestore.Firestore;

    constructor(
    ) {
  
      this.db = admin.firestore();
    }

  async create(collection: string, data: any): Promise<string> {
    const docRef = await this.db.collection(collection).add(data);
    return docRef.id;
  }

  async findAll(collection: string): Promise<any[]> {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(collection: string, id: string): Promise<any> {
    const docRef = await this.db.collection(collection).doc(id).get();
    if (!docRef.exists) {
      return null;
    }
    return {
      id: docRef.id,
      ...docRef.data(),
    };
  }

  async update(collection: string, id: string, data: any): Promise<void> {
    await this.db.collection(collection).doc(id).update(data);
  }

  async delete(collection: string, id: string): Promise<void> {
    await this.db.collection(collection).doc(id).delete();
  }
}
