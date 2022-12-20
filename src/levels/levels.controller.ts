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

    const page: number = parseInt(req.query?.page) || 1;
    const limit: number = parseInt(req.query?.limit) || 10;
    const total = await this.levelsService.count(options);
    const lastPage = Math.ceil(total / limit);

    const levels = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { levels, total, page, lastPage };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      await this.levelsService.findOne(id);
    } catch (error) {
      return res.status(404).json({
        message: `${id} this level not found`,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateLevelDto,
  ) {
    return this.levelsService.update(id, updateLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelsService.remove(id);
  }
}
