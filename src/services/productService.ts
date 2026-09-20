import { Types } from 'mongoose';
import { ProductModel, ProductSchemaType, ProductDocument } from '../models/product.js';
import { IOrganization } from '../models/organization.model.js';


type NewProduct = Pick<ProductSchemaType, 'name' | 'precio' | 'organization'>;

export const seedProducts = async (
  products: ReadonlyArray<NewProduct>
): Promise<ProductDocument[]> => ProductModel.insertMany(products);

export const deleteAllProducts = async (): Promise<number> => {
  const { deletedCount } = await ProductModel.deleteMany({});
  return deletedCount ?? 0;
};
export const createProduct = async (
  data: NewProduct
): Promise<ProductDocument> => {
  const product = new ProductModel(data);
  return product.save();
};

export const getProductById = async (
  id: Types.ObjectId | string
): Promise<ProductDocument | null> => ProductModel.findById(id).populate('organization');

export const updateProduct = async (
  id: Types.ObjectId | string,
  data: Partial<NewProduct> 
): Promise<ProductDocument | null> => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, data);
  return updatedProduct;
}

export const deleteProduct = async (
  id: Types.ObjectId | string
): Promise<ProductDocument | null> => ProductModel.findByIdAndDelete(id);

export const listAllProducts = async (): Promise<ProductDocument[]> => ProductModel.find().lean();

// --- CRUD básico ---

export const findProductByName = async (name: string): Promise<ProductDocument | null> =>
  ProductModel.findOne({ name });

type ProductSummary = Pick<ProductSchemaType, 'name' | 'precio'> & { _id: Types.ObjectId };

export const findProductSummaryByName = async (name: string): Promise<ProductSummary | null> =>
  ProductModel.findOne({ name }).select('name precio').lean();

type ProductWithOrganization = Omit<ProductSchemaType, 'organization'> & {
  _id: Types.ObjectId;
  organization: IOrganization;
};

export const findProductWithOrganization = async (
  name: string
): Promise<ProductWithOrganization | null> =>
  ProductModel.findOne({ name })
    .populate<{ organization: IOrganization }>('organization')
    .lean();


