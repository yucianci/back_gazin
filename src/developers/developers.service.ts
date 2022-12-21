import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer, DeveloperDocument } from './entities/developer.entity';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectModel(Developer.name)
    private developerModel: Model<DeveloperDocument>,
  ) {}

  create(createDeveloperDto: CreateDeveloperDto) {
    const developer = new this.developerModel(createDeveloperDto);
    return developer.save();
  }

  findAll(options) {
    return this.developerModel.find(options);
  }

  findOne(id: string) {
    return this.developerModel.findById(id);
  }

  update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    return this.developerModel.findByIdAndUpdate(
      {
        _id: id,
      },
      { $set: updateDeveloperDto },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.developerModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          deleted_at: new Date(),
        },
      },
      {
        new: true,
      },
    );
  }

  count(options) {
    return this.developerModel.count(options).where('deleted_at', null).exec();
  }
}
