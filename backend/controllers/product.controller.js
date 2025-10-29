import { Product } from '../models/product.js';

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    console.log('Received request with query params:', req.query);
    
    if (category) {
      // Try multiple ways to match the category
      query = {
        $or: [
          { 'category.name': { $regex: new RegExp(category, 'i') } },
          { 'category': { $regex: new RegExp(category, 'i') } },
          { 'category.slug': { $regex: new RegExp(category, 'i') } }
        ]
      };
      
      console.log('Search query:', JSON.stringify(query, null, 2));
    }

    // Get all products (for debugging)
    const allProducts = await Product.find({});
    console.log(`Total products in database: ${allProducts.length}`);
    
    if (allProducts.length > 0) {
      console.log('Sample product:', {
        _id: allProducts[0]._id,
        title: allProducts[0].title,
        category: allProducts[0].category,
        price: allProducts[0].price
      });
      
      // Log all unique categories in the database
      const categories = [...new Set(allProducts.map(p => 
        p.category ? (typeof p.category === 'string' ? p.category : p.category.name) : 'None'
      ))];
      console.log('All categories in database:', categories);
    }

    // Execute the query
    const products = await Product.find(query);
    console.log(`Found ${products.length} matching products`);
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Error fetching products', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};
