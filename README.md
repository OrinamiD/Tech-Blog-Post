# Blog API Documentation

A comprehensive RESTful API for a blog platform with user authentication, admin management, category organization, and blog post creation with image uploads.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Security Features](#security-features)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Management**
  - User and Admin registration with email verification
  - OTP-based account verification
  - Secure login with JWT tokens
  - Password reset functionality
  - Email notifications for important events

- **Blog Management**
  - Create, read, update, and delete blog posts
  - Multi-image upload support with Cloudinary
  - Category-based organization
  - Soft delete functionality

- **Category Management**
  - Create and manage blog categories
  - Category-based content filtering
  - Admin-only category updates

- **Security**
  - Password hashing with bcrypt
  - JWT-based authentication (access & refresh tokens)
  - HTTP-only cookies for refresh tokens
  - OTP expiration (5 minutes)
  - Role-based access control

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **File Upload**: Multer, Cloudinary
- **Email Service**: Custom email templates
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Custom middleware validators

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- SMTP server or email service credentials

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration (see [Environment Variables](#environment-variables))

4. **Build the TypeScript code**
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/blog-api
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-api

# JWT Secrets
ACCESS_TOKEN=your_access_token_secret_here
REFRESH_TOKEN=your_refresh_token_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password_or_app_password
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Environment Variable Descriptions

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Application environment (development/production) |
| `PORT` | Server port number |
| `MONGODB_URI` | MongoDB connection string |
| `ACCESS_TOKEN` | Secret key for access token generation |
| `REFRESH_TOKEN` | Secret key for refresh token generation |
| `CLOUDINARY_*` | Cloudinary credentials for image storage |
| `EMAIL_*` | SMTP configuration for sending emails |
| `FRONTEND_URL` | Frontend application URL for CORS |

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:5000` (or your configured PORT) with hot-reloading enabled.

### Production Mode
```bash
npm run build
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm test` | Run test suite |

## 📚 API Documentation

Once the server is running, access the Swagger API documentation at:

```
http://localhost:5000/api-docs
```

The Swagger UI provides:
- Interactive API testing
- Request/response schemas
- Authentication requirements
- Example payloads

## 📁 Project Structure

```
blog-api/
├── src/
│   ├── configs/
│   │   └── cloudinary.config.ts      # Cloudinary setup
│   ├── controllers/
│   │   ├── adminAuth.controller.ts   # Admin auth logic
│   │   ├── userAuth.controller.ts    # User auth logic
│   │   ├── blog.controller.ts        # Blog CRUD operations
│   │   └── category.controller.ts    # Category management
│   ├── models/
│   │   ├── admin.model.ts            # Admin schema
│   │   ├── user.model.ts             # User schema
│   │   ├── blog.model.ts             # Blog post schema
│   │   └── category.model.ts         # Category schema
│   ├── services/
│   │   ├── adminAuth.service.ts      # Admin business logic
│   │   ├── userAuth.service.ts       # User business logic
│   │   ├── blog.service.ts           # Blog business logic
│   │   └── category.service.ts       # Category business logic
│   ├── routes/
│   │   ├── adminAuth.route.ts        # Admin auth routes
│   │   ├── userAuth.route.ts         # User auth routes
│   │   ├── blog.route.ts             # Blog routes
│   │   ├── category.route.ts         # Category routes
│   │   └── index.ts                  # Route aggregator
│   ├── middlewares/
│   │   ├── auth.middleware.ts        # Authentication middleware
│   │   └── upload.middleware.ts      # File upload middleware
│   ├── emails/
│   │   ├── registration.email.ts     # Registration email template
│   │   ├── loginNotification.email.ts # Login notification template
│   │   ├── forgottenPassword.email.ts # Password reset template
│   │   └── resendOtp.email.ts        # OTP resend template
│   ├── utils/
│   │   └── hashedPassword.ts         # Password hashing utilities
│   ├── types/
│   │   └── auth.types.ts             # TypeScript type definitions
│   └── app.ts                         # Express app setup
├── .env                               # Environment variables
├── .env.example                       # Environment template
├── .gitignore
├── package.json
├── tsconfig.json                      # TypeScript configuration
└── README.md
```

## 🔒 Authentication Flow

### User Registration
1. User submits registration details
2. System validates input and checks for existing user
3. Password is hashed using bcrypt
4. OTP is generated and stored (expires in 5 minutes)
5. Registration email with OTP is sent
6. User account created with `isVerified: false`

### Email Verification
1. User submits email and OTP
2. System validates OTP and expiration
3. Account is marked as verified (`isVerified: true`)
4. User can now login

### Login
1. User submits credentials (email/phone + password)
2. System validates credentials
3. Access token (5 min) and refresh token (7 days) are generated
4. Refresh token stored in HTTP-only cookie
5. Access token returned in response
6. Login notification email sent

### Password Reset
1. User requests password reset with email
2. OTP generated and sent via email
3. User submits OTP and new password
4. Password is hashed and updated
5. User can login with new password

## 🔌 API Endpoints

### Authentication Endpoints

#### User Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register-user` | Register new user | No |
| POST | `/api/auth/verify-otp` | Verify email with OTP | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password with OTP | No |
| POST | `/api/auth/resend-otp` | Resend verification OTP | No |

#### Admin Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register-admin` | Register new admin | No |
| POST | `/api/auth/admin/verify-otp` | Verify admin email | No |
| POST | `/api/auth/admin/login` | Admin login | No |
| POST | `/api/auth/admin/forgot-password` | Admin password reset | No |

### Category Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/category` | Create category | Yes (Admin) |
| GET | `/api/category` | Get all categories | No |
| GET | `/api/category/:id` | Get single category | No |
| PUT | `/api/category/:id` | Update category | Yes (Admin) |

### Blog Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/blog/create-blog/:id` | Create blog post | Yes (Admin) |
| GET | `/api/blog` | Get all blogs | No |
| GET | `/api/blog/:id` | Get single blog | No |
| PUT | `/api/blog/:id` | Update blog post | Yes |
| DELETE | `/api/blog/:id` | Soft delete blog | Yes (Admin) |

### Example Request Payloads

#### Register User
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "SecurePass123!",
  "age": 25,
  "phoneNumber": "+1234567890",
  "gender": "female"
}
```

#### Login
```json
{
  "email": "jane.smith@example.com",
  "password": "SecurePass123!"
}
```

#### Create Category
```json
{
  "title": "Technology",
  "description": "All tech-related blog posts"
}
```

#### Create Blog (Multipart Form Data)
```
title: "My First Blog Post"
content: "This is the content of my blog post"
authorsId: "64f9c8a12b34567890abcdef"
images: [file1.jpg, file2.jpg]
```

## 💾 Database Models

### User Model
```typescript
{
  firstName: String (required)
  lastName: String (required)
  email: String (required, unique)
  phoneNumber: String (required, unique)
  password: String (required, hashed)
  age: Number (required)
  gender: String (required)
  role: String (default: "user")
  isVerified: Boolean (default: false)
  otp: String
  otpExpiresAt: Date
  createdAt: Date
  updatedAt: Date
}
```

### Admin Model
```typescript
{
  firstName: String (required)
  lastName: String (required)
  email: String (required, unique)
  phoneNumber: String (required, unique)
  password: String (required, hashed)
  age: Number (required)
  gender: String (required)
  role: String (default: "admin")
  isAdmin: Boolean (default: false)
  isVerified: Boolean (default: false)
  otp: String
  otpExpiresAt: Date
  createdAt: Date
  updatedAt: Date
}
```

### Category Model
```typescript
{
  title: String (required, unique)
  description: String
  createdAt: Date
  updatedAt: Date
}
```

### Blog Model
```typescript
{
  title: String (required)
  content: String (required)
  authorsId: ObjectId (required, ref: 'Admin')
  images: [{
    public_id: String
    url: String
  }]
  isDeleted: Boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

## 🔐 Security Features

1. **Password Security**
   - Passwords hashed using bcrypt (10 salt rounds)
   - Never stored or transmitted in plain text
   - Password strength validation recommended

2. **JWT Authentication**
   - Access tokens expire in 5 minutes
   - Refresh tokens expire in 7 days
   - Refresh tokens stored in HTTP-only cookies
   - Secure flag enabled in production

3. **OTP Security**
   - 6-digit OTP generation
   - 5-minute expiration time
   - One-time use only
   - Email-based delivery

4. **Cookie Security**
   - HTTP-only flag prevents XSS attacks
   - Secure flag in production (HTTPS only)
   - SameSite=Strict prevents CSRF
   - 7-day expiration for refresh tokens

5. **Input Validation**
   - Request validation middleware
   - Type checking with TypeScript
   - Sanitization of user inputs

6. **Role-Based Access Control**
   - Admin-only endpoints protected
   - User role verification
   - Resource ownership checks

## ⚠️ Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request / Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 500 | Internal server error |

### Common Error Messages

- `User already exists` - Duplicate email/phone during registration
- `User not found` - Invalid credentials or user doesn't exist
- `Invalid OTP` - Incorrect OTP code
- `OTP expired` - OTP validity period exceeded
- `Account not verified` - Login attempt before email verification
- `Incorrect email or password` - Invalid login credentials
- `You are not allowed` - Insufficient permissions
- `Category already exist` - Duplicate category title
- `Image is required` - Missing required file upload

## 🧪 Testing

### Manual Testing with Swagger
1. Start the server
2. Navigate to `http://localhost:5000/api-docs`
3. Use the interactive interface to test endpoints

### Testing with Postman
1. Import the API collection (if available)
2. Set up environment variables
3. Test each endpoint sequentially

### Recommended Test Flow
1. Register a user
2. Verify OTP
3. Login
4. Create categories (as admin)
5. Create blog posts
6. Test all CRUD operations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - *Initial work*

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- Mongoose team for MongoDB integration
- Cloudinary for image hosting services
- All contributors and supporters

## 📞 Support

For support, email support@yourdomain.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Add pagination for blog listings
- [ ] Implement search functionality
- [ ] Add comment system
- [ ] Implement like/favorite features
- [ ] Add user profile management
- [ ] Implement email subscription
- [ ] Add analytics dashboard
- [ ] Implement rate limiting
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add Redis caching
- [ ] Implement WebSocket for real-time updates

## 📊 API Rate Limits

Currently, there are no rate limits implemented. Consider implementing rate limiting for production:

- Authentication endpoints: 5 requests per 15 minutes per IP
- Blog creation: 10 posts per hour per user
- General API: 100 requests per 15 minutes per IP

## 🔄 Version History

- **v1.0.0** - Initial release
  - User and Admin authentication
  - Blog CRUD operations
  - Category management
  - Image upload support

---

**Note**: This is a development version. For production deployment, ensure all security measures are properly configured and environment variables are secured.
