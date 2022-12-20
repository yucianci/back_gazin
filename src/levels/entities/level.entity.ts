import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LevelDocument = Level & Document;

@Schema()
export class Level {
  @Prop()
  name: string;

  @Prop()
  created_at: string;

  @Prop({ default: null })
  deleted_at: string | null;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
