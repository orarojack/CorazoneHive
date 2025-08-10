-- Insert categories
INSERT INTO categories (name, icon) VALUES
('Popcorns', '🍿'),
('Ice Pops', '🍡'),
('Ice Cream 250ml', '🍦'),
('Ice Cream 500ml', '🍦'),
('Ice Cream 1L', '🍦'),
('Wholesale Ice Cream 4L', '🍦'),
('Roses', '🌹')
ON CONFLICT (name) DO NOTHING;

-- Insert all products
WITH category_ids AS (
  SELECT id, name FROM categories
)
INSERT INTO products (name, description, price, sale_price, discount, image, category_id, rating, reviews, on_sale, popular)
-- Popcorns
SELECT 
  'Salted Popcorns',
  'Classic salted popcorn, perfect for movie nights and snacking',
  20.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  45,
  false,
  true
FROM category_ids c WHERE c.name = 'Popcorns'

UNION ALL

SELECT 
  'Caramel Popcorns',
  'Sweet caramel-coated popcorn with a delicious crunch',
  50.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  67,
  false,
  true
FROM category_ids c WHERE c.name = 'Popcorns'

UNION ALL

-- Ice Pops
SELECT 
  'Ice Pops',
  'Refreshing ice pops in various flavors, perfect for hot days',
  10.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  89,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Pops'

UNION ALL

-- Ice Cream 250ml
SELECT 
  'Vanilla Ice Cream 250ml',
  'Creamy vanilla ice cream in 250ml size, perfect for individual servings',
  120.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  123,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 250ml'

UNION ALL

SELECT 
  'Vanilla Strawberry Ice Cream 250ml',
  'Delicious vanilla ice cream with strawberry swirls, 250ml size',
  120.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  98,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 250ml'

UNION ALL

SELECT 
  'Vanilla Chocolate Ice Cream 250ml',
  'Rich vanilla ice cream with chocolate chips, 250ml size',
  120.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  112,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 250ml'

UNION ALL

-- Ice Cream 500ml
SELECT 
  'Vanilla Ice Cream 500ml',
  'Creamy vanilla ice cream in 500ml size, great for sharing',
  200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  156,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 500ml'

UNION ALL

SELECT 
  'Vanilla Strawberry Ice Cream 500ml',
  'Delicious vanilla ice cream with strawberry swirls, 500ml size',
  200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  134,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 500ml'

UNION ALL

SELECT 
  'Vanilla Chocolate Ice Cream 500ml',
  'Rich vanilla ice cream with chocolate chips, 500ml size',
  200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  145,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 500ml'

UNION ALL

-- Ice Cream 1L
SELECT 
  'Vanilla Ice Cream 1L',
  'Creamy vanilla ice cream in 1L size, perfect for family gatherings',
  350.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  178,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 1L'

UNION ALL

SELECT 
  'Vanilla Strawberry Ice Cream 1L',
  'Delicious vanilla ice cream with strawberry swirls, 1L size',
  350.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  167,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 1L'

UNION ALL

SELECT 
  'Vanilla Chocolate Ice Cream 1L',
  'Rich vanilla ice cream with chocolate chips, 1L size',
  350.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  189,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 1L'

UNION ALL

SELECT 
  'Strawberry Ice Cream 1L',
  'Pure strawberry ice cream made with real strawberries, 1L size',
  350.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  145,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 1L'

UNION ALL

SELECT 
  'Chocolate Ice Cream 1L',
  'Rich chocolate ice cream with intense cocoa flavor, 1L size',
  350.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  167,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 1L'

UNION ALL

SELECT 
  'Vanilla Pistachio Ice Cream 1L',
  'Creamy vanilla ice cream with real pistachio nuts, 1L size',
  350.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  134,
  false,
  true
FROM category_ids c WHERE c.name = 'Ice Cream 1L'

UNION ALL

-- Wholesale Ice Cream 4L - Standard Flavors (1500)
SELECT 
  'Vanilla Ice Cream 4L',
  'Premium vanilla ice cream in 4L wholesale size, perfect for events and businesses',
  1500.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  89,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Strawberry Ice Cream 4L',
  'Pure strawberry ice cream in 4L wholesale size, made with real strawberries',
  1500.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  76,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Chocolate Ice Cream 4L',
  'Rich chocolate ice cream in 4L wholesale size, perfect for chocolate lovers',
  1500.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  98,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Mango Ice Cream 4L',
  'Tropical mango ice cream in 4L wholesale size, refreshing and delicious',
  1500.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  67,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

-- Wholesale Ice Cream 4L - Premium Flavors (1800)
SELECT 
  'Pistachio Ice Cream 4L',
  'Premium pistachio ice cream in 4L wholesale size, with real pistachio nuts',
  1800.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  78,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Orange Sorbet Ice Cream 4L',
  'Refreshing orange sorbet in 4L wholesale size, perfect for hot days',
  1800.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  56,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Blueberry Ice Cream 4L',
  'Delicious blueberry ice cream in 4L wholesale size, made with real blueberries',
  1800.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  67,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

-- Wholesale Ice Cream 4L - Premium Flavors (2200)
SELECT 
  'Pina Colada Ice Cream 4L',
  'Tropical pina colada ice cream in 4L wholesale size, with coconut and pineapple',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  89,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Cookies n''Cream Ice Cream 4L',
  'Classic cookies and cream ice cream in 4L wholesale size',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  123,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Caramel Ice Cream 4L',
  'Rich caramel ice cream in 4L wholesale size, with caramel swirls',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  98,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Peach Melba Ice Cream 4L',
  'Delicious peach melba ice cream in 4L wholesale size, with peach and raspberry',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  76,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Biscotti Ice Cream 4L',
  'Italian biscotti ice cream in 4L wholesale size, with almond biscotti pieces',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  67,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Mint Chocolate Chips Ice Cream 4L',
  'Refreshing mint ice cream with chocolate chips in 4L wholesale size',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  89,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Cappuccino Sundae Ice Cream 4L',
  'Coffee-flavored ice cream in 4L wholesale size, perfect for coffee lovers',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  78,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

SELECT 
  'Butter Scotch Ice Cream 4L',
  'Rich butterscotch ice cream in 4L wholesale size, with butterscotch sauce',
  2200.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  67,
  false,
  true
FROM category_ids c WHERE c.name = 'Wholesale Ice Cream 4L'

UNION ALL

-- Roses
SELECT 
  'Single Rose',
  'Beautiful single rose, perfect for a simple gesture of love',
  50.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  234,
  false,
  true
FROM category_ids c WHERE c.name = 'Roses'

UNION ALL

SELECT 
  'Bouquet of 10 Roses & Chocolate',
  'Elegant bouquet of 10 roses with premium chocolate, perfect for special occasions',
  500.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  189,
  false,
  true
FROM category_ids c WHERE c.name = 'Roses'

UNION ALL

SELECT 
  'Bouquet of 20 Roses & Big Chocolate',
  'Stunning bouquet of 20 roses with large chocolate box, ideal for romantic gestures',
  1000.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  156,
  false,
  true
FROM category_ids c WHERE c.name = 'Roses'

UNION ALL

SELECT 
  'Bouquet of 30 Roses & Big Chocolate',
  'Luxurious bouquet of 30 roses with premium chocolate box, perfect for grand celebrations',
  1500.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  123,
  false,
  true
FROM category_ids c WHERE c.name = 'Roses'

UNION ALL

SELECT 
  'Bouquet of 50 Roses & Big Chocolate',
  'Extravagant bouquet of 50 roses with deluxe chocolate box, the ultimate romantic gesture',
  2000.00,
  NULL,
  NULL,
  '/placeholder.svg?height=300&width=300',
  c.id,
  5,
  98,
  false,
  true
FROM category_ids c WHERE c.name = 'Roses';
