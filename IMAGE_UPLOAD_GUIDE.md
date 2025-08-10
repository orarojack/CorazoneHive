# Image Upload Guide

## Admin Panel Image Upload Features

### Two Upload Methods:

1. **Image URL**
   - Enter direct URL to image
   - Supports: https://example.com/image.jpg
   - Supports: /images/local-image.jpg

2. **File Upload**
   - Click "Upload File" button
   - Select image from device
   - Max size: 5MB
   - Formats: JPG, PNG, GIF, WebP
   - Auto-saves to /public/uploads/

### Features:
- Real-time image preview
- Error handling with placeholder fallback
- Remove image option
- Validation for file type and size

### API Route:
- `/api/upload` - Handles file uploads
- Creates unique filenames
- Returns public URL for saved image

### Customer Display:
- Images display perfectly on product pages
- Fallback to placeholder if image fails
- Responsive image sizing
