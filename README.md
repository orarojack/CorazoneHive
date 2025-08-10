# CorazoneHives - Premium Sweet Delights

A modern e-commerce platform for selling sweet treats and beautiful flowers, built with Next.js 14, TypeScript, and Supabase.

## Features

### 🛍️ Customer Features
- **Product Browsing**: Browse products with search and filtering
- **Shopping Cart**: Add products to cart and manage quantities
- **Responsive Design**: Beautiful UI that works on all devices
- **Product Categories**: Organize products by categories
- **Product Ratings**: See product ratings and reviews

### 👨‍💼 Admin Features
- **Product Management**: Add, edit, and delete products
- **Category Management**: Create and manage product categories
- **Image Upload**: Upload product images or use image URLs
- **Real-time Preview**: See how products will appear to customers
- **Dashboard Analytics**: View product statistics

## Image Upload Functionality

The admin panel supports two methods for adding product images:

### 1. Image URL
- Enter a direct URL to an image (e.g., `https://example.com/image.jpg`)
- Use relative paths for local images (e.g., `/images/product.jpg`)
- Supports all common image formats

### 2. File Upload
- Click "Upload File" to select an image from your device
- Supported formats: JPG, PNG, GIF, WebP
- Maximum file size: 5MB
- Images are automatically saved to `/public/uploads/` directory
- Unique filenames are generated to prevent conflicts

### Image Preview
- Real-time preview of uploaded images
- Error handling with fallback to placeholder
- Option to remove images before saving

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Environment Variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup**
   Run the SQL scripts in the `scripts/` directory to set up your database:
   ```bash
   # Create tables
   psql -d your_database -f scripts/create-tables.sql
   
   # Seed with sample data
   psql -d your_database -f scripts/seed-data-working.sql
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Access Admin Panel**
   Navigate to `/admin` to access the admin panel

## File Structure

```
corazonehives/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes (including upload)
│   ├── products/        # Product pages
│   └── ...
├── components/          # Reusable UI components
├── lib/                 # Utility functions and API
├── public/
│   └── uploads/         # Uploaded images (auto-created)
└── scripts/             # Database setup scripts
```

## API Routes

### `/api/upload`
Handles image file uploads:
- **Method**: POST
- **Body**: FormData with 'file' field
- **Response**: JSON with uploaded image URL
- **Validation**: File type, size (5MB max)

## Database Schema

### Products Table
- `id`: Unique identifier
- `name`: Product name
- `description`: Product description
- `price`: Regular price
- `sale_price`: Sale price (optional)
- `discount`: Discount percentage (optional)
- `image`: Image URL or path
- `category_id`: Foreign key to categories
- `rating`: Product rating (1-5)
- `reviews`: Number of reviews
- `on_sale`: Boolean flag
- `popular`: Boolean flag

### Categories Table
- `id`: Unique identifier
- `name`: Category name
- `icon`: Emoji icon

## Styling

The application uses:
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Custom CSS classes** for glass effects and gradients
- **Responsive design** for all screen sizes

## Deployment

The application can be deployed to:
- Vercel (recommended)
- Netlify
- Any platform supporting Next.js

Make sure to:
1. Set up environment variables
2. Configure your database
3. Set up image upload directory permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
