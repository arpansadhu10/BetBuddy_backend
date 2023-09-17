import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host:'localhost',
    //   port:27017,
    //   database:'betbuddy'
    // }),
    AuthModule, HealthModule, UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
