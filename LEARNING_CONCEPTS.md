# 📚 Node.js & Backend Development - Learning Concepts

> A comprehensive guide to concepts you need to master for backend development with Node.js.

---

## 🎯 Table of Contents

1. [JavaScript Fundamentals](#javascript-fundamentals)
2. [Node.js Core Concepts](#nodejs-core-concepts)
3. [Express.js Framework](#expressjs-framework)
4. [API Development](#api-development)
5. [Database Concepts](#database-concepts)
6. [Authentication & Security](#authentication--security)
7. [Advanced Topics](#advanced-topics)
8. [DevOps & Deployment](#devops--deployment)

---

## JavaScript Fundamentals

> ⚠️ **Master these before diving into Node.js!**

### Core Language Features

| Concept | Description | Priority |
|---------|-------------|----------|
| **Variables** | `let`, `const`, `var` - scope and hoisting | 🔴 High |
| **Data Types** | Primitives, Objects, Arrays | 🔴 High |
| **Functions** | Regular, Arrow, IIFE, Callbacks | 🔴 High |
| **Objects & Arrays** | Destructuring, Spread, Rest operators | 🔴 High |
| **Control Flow** | if/else, switch, loops, try/catch | 🔴 High |

### ES6+ Features (Essential)

```javascript
// Arrow Functions
const greet = (name) => `Hello, ${name}!`;

// Destructuring
const { name, age } = user;
const [first, second] = array;

// Spread & Rest
const merged = { ...obj1, ...obj2 };
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

// Template Literals
const message = `User ${name} is ${age} years old`;

// Optional Chaining & Nullish Coalescing
const city = user?.address?.city ?? 'Unknown';
```

### Asynchronous JavaScript

| Concept | What to Learn |
|---------|---------------|
| **Callbacks** | Understanding callback functions and callback hell |
| **Promises** | `.then()`, `.catch()`, `.finally()`, Promise.all() |
| **Async/Await** | Cleaner syntax for handling promises |
| **Event Loop** | How JavaScript handles async operations |

```javascript
// Promises
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.error(error));

// Async/Await (preferred)
async function getUserPosts(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    return posts;
  } catch (error) {
    console.error(error);
  }
}
```

---

## Node.js Core Concepts

### What is Node.js?

- **Runtime Environment**: JavaScript running outside the browser
- **V8 Engine**: Google's JavaScript engine
- **Non-blocking I/O**: Efficient handling of concurrent operations
- **Single-threaded**: Uses event loop for concurrency

### Built-in Modules

| Module | Purpose | Example Use |
|--------|---------|-------------|
| `fs` | File System operations | Read/write files |
| `path` | Path utilities | `path.join()`, `path.resolve()` |
| `http` | HTTP server/client | Create web servers |
| `os` | Operating system info | CPU, memory info |
| `events` | Event handling | Custom event emitters |
| `crypto` | Cryptography | Hashing, encryption |
| `stream` | Stream data handling | Large file processing |
| `buffer` | Binary data handling | Raw memory allocation |

### CommonJS vs ES Modules

```javascript
// CommonJS (traditional Node.js)
const express = require('express');
module.exports = { myFunction };

// ES Modules (modern approach)
import express from 'express';
export { myFunction };
```

### npm (Node Package Manager)

```bash
# Essential Commands
npm init -y                  # Initialize project
npm install <package>        # Install dependency
npm install -D <package>     # Install dev dependency
npm uninstall <package>      # Remove package
npm update                   # Update packages
npm run <script>             # Run script from package.json
```

### package.json Structure

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

---

## Express.js Framework

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Routing** | Defining endpoints (GET, POST, PUT, DELETE) |
| **Middleware** | Functions that execute between request and response |
| **Request Object** | `req.body`, `req.params`, `req.query`, `req.headers` |
| **Response Object** | `res.json()`, `res.send()`, `res.status()` |

### Basic Server Setup

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());              // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

app.post('/users', (req, res) => {
  const userData = req.body;
  res.status(201).json(userData);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Middleware Types

1. **Application-level**: `app.use()`
2. **Router-level**: `router.use()`
3. **Error-handling**: 4 parameters `(err, req, res, next)`
4. **Built-in**: `express.json()`, `express.static()`
5. **Third-party**: `cors`, `helmet`, `morgan`

---

## API Development

### REST API Principles

| Principle | Description |
|-----------|-------------|
| **Stateless** | Server doesn't store client state |
| **Resource-based** | URLs represent resources |
| **HTTP Methods** | GET, POST, PUT, PATCH, DELETE |
| **Status Codes** | Meaningful response codes |

### HTTP Status Codes to Know

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

### API Response Structure

```javascript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "User created successfully"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required"
  }
}

// Paginated Response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Input Validation

```javascript
// Using express-validator
const { body, validationResult } = require('express-validator');

app.post('/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process valid data
  }
);
```

---

## Database Concepts

### SQL vs NoSQL

| Aspect | SQL (PostgreSQL, MySQL) | NoSQL (MongoDB) |
|--------|-------------------------|-----------------|
| **Structure** | Tables with rows/columns | Documents/Collections |
| **Schema** | Fixed schema | Flexible schema |
| **Relationships** | JOINs | Embedded/Referenced |
| **Scaling** | Vertical | Horizontal |
| **Best For** | Complex queries, transactions | Rapid development, unstructured data |

### MongoDB with Mongoose

```javascript
const mongoose = require('mongoose');

// Connect
mongoose.connect('mongodb://localhost:27017/myapp');

// Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create Model
const User = mongoose.model('User', userSchema);

// CRUD Operations
const user = await User.create({ name, email, password });
const users = await User.find({ active: true });
const user = await User.findById(id);
await User.findByIdAndUpdate(id, { name: 'New Name' });
await User.findByIdAndDelete(id);
```

### PostgreSQL with Prisma

```javascript
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

// Usage
const user = await prisma.user.create({
  data: { email, name }
});
const users = await prisma.user.findMany();
```

---

## Authentication & Security

### Authentication Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| **JWT** | JSON Web Tokens | Stateless APIs |
| **Sessions** | Server-stored sessions | Traditional web apps |
| **OAuth 2.0** | Third-party auth | Social login |
| **API Keys** | Simple token auth | Service-to-service |

### JWT Implementation

```javascript
const jwt = require('jsonwebtoken');

// Generate Token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Password Hashing

```javascript
const bcrypt = require('bcrypt');

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Compare password
const isValid = await bcrypt.compare(password, hashedPassword);
```

### Security Best Practices

- ✅ Use HTTPS in production
- ✅ Hash passwords with bcrypt
- ✅ Use helmet for security headers
- ✅ Implement rate limiting
- ✅ Validate and sanitize all inputs
- ✅ Use environment variables for secrets
- ✅ Enable CORS properly
- ✅ Keep dependencies updated

---

## Advanced Topics

### Error Handling

```javascript
// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Async Handler Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

### File Uploads

```javascript
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});
```

### Caching with Redis

```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache middleware
const cacheMiddleware = async (req, res, next) => {
  const cached = await client.get(req.originalUrl);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  next();
};

// Set cache
await client.setEx('key', 3600, JSON.stringify(data));
```

### WebSockets with Socket.io

```javascript
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('message', (data) => {
    io.emit('message', data); // Broadcast to all
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
```

---

## DevOps & Deployment

### Environment Variables

```bash
# .env file
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost/mydb
JWT_SECRET=your-secret-key
```

```javascript
require('dotenv').config();
const port = process.env.PORT || 3000;
```

### Project Structure

```
my-app/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.js          # Express app setup
├── tests/              # Test files
├── .env                # Environment variables
├── .gitignore
├── package.json
└── README.md
```

### Docker Basics

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

### Deployment Platforms

| Platform | Best For |
|----------|----------|
| **Railway** | Quick deployments, free tier |
| **Render** | Free tier, auto-deploys |
| **Heroku** | Easy to use, add-ons |
| **AWS EC2** | Full control, scalability |
| **DigitalOcean** | VPS, App Platform |
| **Vercel** | Serverless functions |

---

## 📋 Learning Checklist

### Phase 1: Fundamentals ⬜
- [ ] JavaScript ES6+ mastery
- [ ] Async/Await & Promises
- [ ] Node.js core modules
- [ ] npm & package.json

### Phase 2: Express & APIs ⬜
- [ ] Express.js basics
- [ ] RESTful API design
- [ ] Middleware concepts
- [ ] Input validation

### Phase 3: Database ⬜
- [ ] MongoDB with Mongoose **OR**
- [ ] PostgreSQL with Prisma
- [ ] Data modeling
- [ ] CRUD operations

### Phase 4: Authentication ⬜
- [ ] JWT implementation
- [ ] Password hashing
- [ ] Protected routes
- [ ] Role-based access

### Phase 5: Advanced ⬜
- [ ] Error handling
- [ ] File uploads
- [ ] Caching (Redis)
- [ ] WebSockets

### Phase 6: Production ⬜
- [ ] Environment setup
- [ ] Docker basics
- [ ] Deployment
- [ ] Monitoring & logging

---

## 🔗 Recommended Resources

### Documentation
- [Node.js Docs](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Practice Platforms
- [Exercism](https://exercism.org/tracks/javascript)
- [LeetCode](https://leetcode.com)
- [HackerRank](https://www.hackerrank.com)

### YouTube Channels
- Traversy Media
- The Net Ninja
- Fireship

---

> 💡 **Tip**: Build projects as you learn! Theory without practice won't stick.

**Last Updated**: January 12, 2026
