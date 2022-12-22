import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Level } from 'src/levels/entities/level.entity';

export type DeveloperDocument = Developer & Document;

export class SexProps {
  id: string;
  name: string;
}

@Schema()
export class Developer {
  @Prop()
  name: string;

  @Prop()
  level: Level;

  @Prop()
  sex: SexProps;

  @Prop()
  birthday: string;

  @Prop()
  age: number;

  @Prop()
  hobby: string;

  @Prop({ default: null })
  deleted_at: string | null;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
