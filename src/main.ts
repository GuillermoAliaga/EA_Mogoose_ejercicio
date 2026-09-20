import { connectDatabase, disconnectDatabase } from './config/db.js';
import { OrganizationModel } from './models/organization.model.js';
import { deleteAllOrganizations } from './services/organization.service.js';
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getProductById,
  listAllProducts,
  updateProduct
} from './services/productService.js';

const main = async (): Promise<void> => {
  try {

    await connectDatabase();
    console.log('Conectado a MongoDB');

    await deleteAllProducts(); 
    await deleteAllOrganizations();
    console.log('Base de datos limpiada');

    const organization = await OrganizationModel.create({
      name: 'Acme Corp',
      country: 'España'
    });
    console.log('Organización creada:', organization.name);

    console.log('\n--- CRUD ---');
    const nuevoProducto = await createProduct({
      name: 'Zapatillas',
      precio: 50,
      organization: organization._id
    });
    console.log('Creado', nuevoProducto);

    const productoActualizado = await updateProduct(nuevoProducto._id, { precio: 25 });
    console.log('Actualizado', productoActualizado);

    console.log('\n--- POPULATE ---');
    const productoConOrg = await getProductById(nuevoProducto._id);
    console.log('Encontrado (por id y usando populate)', productoConOrg);

    console.log('\n--- LIST ALL ---');
    const todos = await listAllProducts();
    console.table(todos);

    console.log('\n--- DELETE ---');
    const productoBorrado = await deleteProduct(nuevoProducto._id);
    console.log('Borrado', productoBorrado);

  } catch (error) {
    console.error('Error en el ejemplo:', error);
  } finally {
    await disconnectDatabase();
    console.log('Desconectado de MongoDB');
  }
};

main();