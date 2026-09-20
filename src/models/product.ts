import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  precio: { type: Number, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
});

export type ProductSchemaType = InferSchemaType<typeof productSchema>;

export type ProductDocument = HydratedDocument<ProductSchemaType>;

export const ProductModel = model<ProductSchemaType>('Product', productSchema);