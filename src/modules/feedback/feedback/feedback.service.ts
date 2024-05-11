import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/modules/firebase/services/firestore/firestore.service';
import { v4 } from 'uuid';

@Injectable()
export class FeedbackService {
    collection = `feedback`;
    constructor(
        private firestoreService: FirestoreService,
    ){}

    create(data:any){
        const id = data.id || v4();
        console.log({id});
        
        return  this.firestoreService.create({id, data, collection:this.collection});
    }

    findAll(){
      return  this.firestoreService.findAll(this.collection);
    }

    findOne(id){
        console.log({id});
        
        return  this.firestoreService.findOne({id, collection:this.collection});
      }

      update(payload:{id:string, data:any}){
        const {id, data} = payload;
        return this.firestoreService.update({data, id, collection:this.collection});
      }

      delete(id){
        return  this.firestoreService.delete({id, collection:this.collection});
      }

} 