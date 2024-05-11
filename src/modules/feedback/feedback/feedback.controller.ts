import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {

    constructor(
        private feedbackService: FeedbackService,
    ){}
    
    @Get()
    findAll(){
     return this.feedbackService.findAll();
    }

    @Get(':id')
    findOne( @Param('id') id:string ){
        console.log({getBYId:id})
     return this.feedbackService.findOne(id);
    }

    @Post()
    create(@Body() payload:any ){
     return this.feedbackService.create(payload);
    }

    @Put(':id')
    update( @Param('id') id:string, @Body() data:any ){
        return this.feedbackService.update({id, data});
       }
   
       @Delete(':id')
       delete( @Param('id') id:string ){
        return this.feedbackService.delete(id);
       }
}
