# Cors Issue

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
