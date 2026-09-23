#### **Video**

https://drive.google.com/drive/u/1/folders/1UwvnCp1VQk7zFsj2jQiiFG3GwOfvsGzw (Video seminario 2)



#### **Uso IA (prompts):**

\- En mongoose, que hace la opción .lean()?

\- Me puedes explicar también el .populate?

\- Como enlazo un modelo en typescript con otro?

\- import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose';



const productSchema = new Schema({

&#x20; name: { type: String },

&#x20; precio: { type: Number },

&#x20; organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }

});



export type ProductSchemaType = InferSchemaType<typeof productSchema>;



export type ProductDocument = HydratedDocument<ProductSchemaType>;



export const ProductModel = model<ProductSchemaType>('Product', productSchema); ya he creado el modelo, hace falta que los parametros name y precio tambien tengan required, o mongoose lanzara un error?

\- Vale este modelo de product lo he hecho basándome en otro de user que nos han dado de ejemplo, pero no entiendo del todo la diferencia entre el ProductSchemaType y el ProductDocument, el Schema es un tipo de typescript que describe que campos tiene no? pero el document no se muy bien que es





