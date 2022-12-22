import { Level } from 'src/levels/entities/level.entity';
import { SexProps } from '../entities/developer.entity';

export class CreateDeveloperDto {
  name: string;
  level: Level;
  sex: SexProps;
  age: number;
  hobby: string;
  deleted_at: string | null;
}
