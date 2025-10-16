import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema({ timestamps: true })
export class Food {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'FoodType' })
  foodtype_id: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
