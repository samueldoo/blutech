import axios from 'axios';

const API_BASE_URL = 'http://3.88.1.181:8000';

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

  try {
    const response = await axios.get(`${API_BASE_URL}/products/public/catalog?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}