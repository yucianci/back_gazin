import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelsModule } from './levels/levels.module';
import { DevelopersModule } from './developers/developers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CLUSTER_CONNECTION),
    LevelsModule,
    DevelopersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
