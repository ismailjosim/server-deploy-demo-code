# Ful Stack Deployment Techniques for Project

## 1. add proxy server on vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
```

### 2. Rename all API with /api convention

```js
app.get("/products"); //❌❌
app.get("/api/products"); //✅✅
```

### 3. replace all your API URL with "/api"

### 4. Comment Await Commands and important credentials on client side

### 5. copy build to server

Build your client

```bash
npm run build
```

copy and paste in vercel

### 6. use express.static middleware

```js
const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));
```

### 7. Replace your default get function with this

```js
app.get("*", (__, res) => {
  console.log(path.join(__dirname, "dist", "index.html"));
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

### 8. add vercel.json for full-stack deployment

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    },
    {
      "src": "dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    },
    {
      "src": "/(.+\\.[a-z]+)$",
      "dest": "/dist/$1"
    }
  ]
}
```

### 9. Deploy & add to Firebase for Authorization

```bash
vercel  --prod
```

### যদি ডেপলয় করার পরে CORS ইস্যু দেয় তাহলে middleware এর মধ্যে আপনার ক্লায়েন্টের প্রজেক্টের লিংকগুলো দিয়ে দেনঃ

```
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://enmmedia-19300.web.app'],
        credentials: true,
    }),
)
```

### ক্লায়েন্টে টোকেন না পাওয়া গেলেঃ

```
app.post('/jwt', async (req, res) => {
    try {
        const user = req.body
        const token = jwt.sign(user, jwtSecret, {
            expiresIn: '1d',
        })
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            })
            .send({
                status: true,
            })
    } catch (error) {
        res.send({
            status: true,
            error: error.message,
        })
    }
})

```

### ক্লায়েন্টে logout করার পরে টোকেন রিমুভ না হলে

```
app.post('/logout', async (req, res) => {
    const user = req.body
    res
        .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ status: true })
})

```
