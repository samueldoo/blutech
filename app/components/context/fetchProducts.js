import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function fetchProducts(params = {}) {
  const queryParams = new URLSearchParams({
    supplier: params.supplier || '',
    first: params.first || 0,
    last: params.last || 50,
    search: params.search || '',
    ...Object.entries(params).reduce((acc, [key, value]) => {
      if (key.includes('_')) {
        acc[key] = value;
      }
      return acc;
    }, {})
  });
  console.log(API_BASE_URL);
  try {
    const response = await axios.get(`${API_BASE_URL}/products/public/catalog?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
