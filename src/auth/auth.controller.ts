import { Controller,Get, Post,Req,Res,Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
// import { HttpService } from '@nestjs/axios';
// import { Injectable } from '@nestjs/common';
// import { map } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,private userService:UserService){
    }
    @Get('google/callback')
    async callback (@Req() request: Request,@Res() response:Response,@Query('code') query){
        console.log("hello")
        // console.log(request)
        console.log(query);
        const res=await this.authService.getAccessToken(query,process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,process.env.REDIRECT_URI
        )
        console.log(res.data,"Tokens");
        const {id_token,access_token}=res.data;
        let user:any=await this.authService.getProfile(access_token,id_token)
        // console.log(user);


        user=user.data;
        console.log({name:user.name,email:user.email,googleId:user.sub,location:user.locale,photo:user.picture})
        await this.userService.create(
            {name:user.name,email:user.email,googleId:user.sub,location:user.locale,photo:user.picture}
            )
        return user;
    }
    @Post('google/callback')
    callback2(req:Request,res:Response){
        console.log("hello post")
        // console.log(req)
    }

    
}
