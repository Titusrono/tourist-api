import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from 'src/shared/config/firebase-config';
import { v4 } from 'uuid';

@Injectable()
export class FirestoreService {
    private readonly db: FirebaseFirestore.Firestore;

    constructor(
    ) {
  
      this.db = admin.firestore();
    }

  async create(payload:{id:string, collection: string, data: any}): Promise<any> {
    const {id,collection,data} = payload;
    const docId = id || v4();
    const docRef = await this.db.collection(collection).doc(docId).set(data);
    return docRef;
  }

  async findAll(collection: string): Promise<any[]> {
    const snapshot = await this.db.collection(collection).get();
    console.log({snapshot});
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(payload:{collection: string, id: string}): Promise<any> {
    const {collection, id} = payload;
    console.log({payload});
    
    const docRef = await this.db.collection(collection).doc(id).get();
    if (!docRef.exists) {
      return null;
    }
    return {
      id: docRef.id,
      ...docRef.data(),
    };
  }

  async update(payload:{collection: string, id: string, data: any}): Promise<void> {
    const {collection, id, data} = payload;
    await this.db.collection(collection).doc(id).update(data);
  }

  async delete(payload:{collection: string, id: string}): Promise<void> {
    const {collection, id} = payload;
    await this.db.collection(collection).doc(id).delete();
  }
}
