# MongoDB Atlas Setup Guide

## What Changed
Replaced in-memory `let products = []` with **MongoDB Atlas** for permanent product storage.

**Before**: Products reset on every serverless restart  
**After**: Products persist permanently in MongoDB cloud database

---

## Code Changes Summary

### Dependencies Added
```json
"mongoose": "^9.7.3"
```

### Key Changes in `api/index.js`

1. **MongoDB Connection**
```js
import mongoose from 'mongoose'

let isConnected = false
const connectDB = async () => {
  if (isConnected) return
  await mongoose.connect(process.env.MONGODB_URI)
  isConnected = true
}
```

2. **Product Schema**
```js
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  imageUrl: String,
  filename: String,
  uploadedAt: String
})
const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
```

3. **All Routes Updated**
- `GET /api/products` → `Product.find({}).sort({ uploadedAt: -1 })`
- `POST /api/admin/upload` → `new Product({...}).save()`
- `DELETE /api/admin/products/:id` → `Product.deleteOne({ id })`

4. **Version Updated**
```js
version: '3.0.0',
storage: 'Cloudinary + MongoDB'
```

---

## MongoDB Atlas Setup (Required Before Testing)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free tier available - M0 Sandbox)
3. Create a new project (e.g., "Best Price")

### Step 2: Create Database Cluster
1. Click "Build a Database"
2. Choose **M0 Free** tier
3. Select AWS as provider
4. Choose region closest to Vercel deployment (e.g., `us-east-1`)
5. Cluster name: `BestPriceCluster` (or any name)
6. Click "Create"

### Step 3: Create Database User
1. Security → Database Access → Add New Database User
2. Authentication Method: **Password**
3. Username: `bestprice-admin`
4. Password: Generate a secure password (save it!)
5. Database User Privileges: **Read and write to any database**
6. Click "Add User"

### Step 4: Whitelist IP Addresses
1. Security → Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (for Vercel serverless)
3. IP Address: `0.0.0.0/0`
4. Click "Confirm"

### Step 5: Get Connection String
1. Database → Connect → Drivers
2. Driver: **Node.js**, Version: **6.8 or later**
3. Copy the connection string:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

4. Replace placeholders:
   - `<username>` → `bestprice-admin`
   - `<password>` → your password
   - `<database>` → `bestprice` (or any name)

**Example**:
```
mongodb+srv://bestprice-admin:your_password@bestpricecluster.abc123.mongodb.net/bestprice?retryWrites=true&w=majority
```

---

## Vercel Environment Variables Setup

### Add MONGODB_URI to Vercel

1. Go to https://vercel.com/dashboard
2. Select `best-price-api` project
3. Settings → Environment Variables
4. Add new variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your connection string from Step 5
   - **Environment**: Production, Preview, Development

**Example**:
```
Key: MONGODB_URI
Value: mongodb+srv://bestprice-admin:SecurePass123@bestpricecluster.abc123.mongodb.net/bestprice?retryWrites=true&w=majority
```

5. Click "Save"
6. Redeploy the backend:
   - Deployments tab → Click "..." on latest deployment → Redeploy

---

## Testing After Setup

### 1. Check API Version
```bash
curl https://best-price-api-t7fv.vercel.app/
```
Should return:
```json
{
  "version": "3.0.0",
  "storage": "Cloudinary + MongoDB"
}
```

### 2. Test Product Upload
1. Go to https://best-price-seven.vercel.app/admin
2. Login with `bestprice2024`
3. Upload a test product
4. Verify it appears in the products list

### 3. Test Persistence
1. Wait 5 minutes (serverless cold start)
2. Refresh `/shop` page
3. Product should still be there (not reset!)

### 4. MongoDB Atlas Dashboard
1. Database → Browse Collections
2. Database: `bestprice` (or your chosen name)
3. Collection: `products`
4. Should see uploaded products with all fields

---

## Environment Variables Checklist

Make sure ALL these are set in Vercel backend:

✅ `CLOUDINARY_CLOUD_NAME=teontk9r`  
✅ `CLOUDINARY_API_KEY=693672151642532`  
✅ `CLOUDINARY_API_SECRET=gmFDXF5-AeIIr6B6hYVfflRkWFs`  
✅ `ADMIN_PASSWORD=bestprice2024`  
✅ `SESSION_SECRET=bestprice-secret-2024-xk92mz`  
🆕 `MONGODB_URI=mongodb+srv://...` **(NEW - REQUIRED)**

---

## Troubleshooting

### Error: "MongooseServerSelectionError"
- Check MONGODB_URI is correct in Vercel
- Verify IP whitelist includes `0.0.0.0/0`
- Confirm database user password is correct

### Error: "Authentication failed"
- Check username/password in connection string
- Ensure no special characters in password (or URL encode them)

### Products not persisting
- Verify MONGODB_URI is set in Production environment
- Redeploy after adding environment variable
- Check Vercel logs for connection errors

### Connection timeout
- Verify network access allows `0.0.0.0/0`
- Try different Atlas region closer to Vercel

---

## Migration Notes

- **No data migration needed** (old in-memory storage was empty on restart)
- First upload will create the `products` collection automatically
- MongoDB indexes can be added later for performance if needed

---

## Security Best Practices

1. ✅ Use strong password for database user
2. ✅ Never commit MONGODB_URI to git
3. ✅ Keep password in environment variables only
4. ✅ Use `0.0.0.0/0` whitelist for Vercel serverless (dynamic IPs)
5. ⚠️ For production, consider using Vercel's IP ranges if available

---

## Next Steps After Setup

1. ✅ Create MongoDB Atlas account
2. ✅ Create cluster and database user
3. ✅ Add MONGODB_URI to Vercel
4. ✅ Redeploy backend
5. ✅ Test product upload
6. ✅ Verify persistence after cold start

**Status**: Ready for permanent product storage! 🎉
