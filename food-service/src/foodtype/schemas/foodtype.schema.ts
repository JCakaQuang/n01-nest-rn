import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodTypeDocument = HydratedDocument<FoodType>;

@Schema({ timestamps: true })
export class FoodType {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const FoodTypeSchema = SchemaFactory.createForClass(FoodType);
