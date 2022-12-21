import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './entities/developer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService],
})
export class DevelopersModule {}
