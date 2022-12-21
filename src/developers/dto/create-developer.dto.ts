import { Level } from 'src/levels/entities/level.entity';

export class CreateDeveloperDto {
  name: string;
  level: Level;
  sex: string;
  birthday: string;
  age: number;
  hobby: string;
}
