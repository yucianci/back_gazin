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
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  async findAll(@Req() req) {
    let options = {};
    const search = req.query?.search;
    const sort: 'asc' | 'desc' = req.query?.sort;
    const sortBy: string = req.query.sortBy || 'name';

    if (search) {
      options = {
        $or: [
          { name: new RegExp(search.toString(), 'i') },
          { level: new RegExp(search.toString(), 'i') },
          { sex: new RegExp(search.toString(), 'i') },
          { birthday: new RegExp(search.toString(), 'i') },
          { age: new RegExp(search.toString(), 'i') },
        ],
      };
    }

    const query = this.developersService
      .findAll(options)
      .where('deleted_at', null);

    if (sort) {
      query.sort({
        [sortBy]: sort,
      });
    }

    const page: number = parseInt(req.query?.page) || 1;
    const limit: number = parseInt(req.query?.limit) || 10;
    const total = await this.developersService.count(options);
    const lastPage = Math.ceil(total / limit);

    const developers = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { developers, total, page, lastPage };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developersService.update(id, updateDeveloperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developersService.remove(id);
  }
}
