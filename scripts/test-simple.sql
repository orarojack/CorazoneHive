-- Test simple numeric values
INSERT INTO products (name, description, price, sale_price, discount, image, category_id, rating, reviews, on_sale, popular)
SELECT 
  'Test Product',
  'Test description',
  20,
  NULL,
  NULL,
  '/placeholder.svg',
  (SELECT id FROM categories LIMIT 1),
  5,
  10,
  false,
  true;
