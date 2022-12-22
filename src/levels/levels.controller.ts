import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelsService.create(createLevelDto);
  }

  @Get()
  async findAll(@Req() req) {
    let options = {};
    const search = req.query?.search;
    const sort: 'asc' | 'desc' = req.query?.sort;
    const sortBy: string = req.query.sortBy || 'name';

    if (search) {
      options = {
        $or: [{ name: new RegExp(search.toString(), 'i') }],
      };
    }
    const query = this.levelsService.findAll(options).where('deleted_at', null);

    if (sort) {
      query.sort({
        [sortBy]: sort,
      });
    }

    let levels;

    if (req.query?.page && req.query?.limit) {
      const page: number = parseInt(req.query?.page) || 1;
      const limit: number = parseInt(req.query?.limit) || 10;
      const total = await this.levelsService.count(options);
      const lastPage = Math.ceil(total / limit);

      levels = await query
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      return { levels, total, page, lastPage };
    }
    levels = await query.exec();

    return { levels };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelsService.update(id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(id);
  }
}
