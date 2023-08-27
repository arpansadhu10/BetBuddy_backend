import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule, HealthModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
