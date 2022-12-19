import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level, LevelDocument } from './entities/level.entity';

@Injectable()
export class LevelsService {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<LevelDocument>,
  ) {}

  create(createLevelDto: CreateLevelDto) {
    const level = new this.levelModel(createLevelDto);
    return level.save();
  }

  findAll(options) {
    return this.levelModel.find(options);
  }

  findOne(id: string) {
    return this.levelModel.findById(id);
  }

  update(id: string, updateLevelDto: UpdateLevelDto) {
    return this.levelModel.findByIdAndUpdate(
      {
        _id: id,
      },
      { $set: updateLevelDto },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    const currentDate = JSON.stringify(new Date());

    return this.levelModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          deleted_at: currentDate,
        },
      },
      {
        new: true,
      },
    );
  }

  count(options) {
    return this.levelModel.count(options).where('deleted_at', null).exec();
  }
}
