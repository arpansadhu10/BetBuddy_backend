import { Controller, Get, Post } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private healthService:HealthService,
        // private sqlService:MysqlService
        ){}
    @Get()
    health():object{
        return this.healthService.getHealth()
    }

    // @Post()
    // async createUser():Promise<any>{
    //     const a=await this.sqlService.createUser('abc','a@a.com');
    //     return a;
    // }
}
