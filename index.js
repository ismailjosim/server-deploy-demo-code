const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 5000


app.use(
    cors({
        origin: ['http://localhost:5173', 'https://enmmedia.web.app'],
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookieParser())

// custom middleware
const verifyToken = async (req, res, next) => {
}

// database info
const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.s9x13go.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

const dbConnect = async () => {
    try {
        client.connect()
        console.log('DB Connected Successfully✅')
    } catch (error) {
        console.log(error.name, error.message)
    }
}
dbConnect()


// all database collection
const collectionOne = client.db('yourDB').collection('your-collection-01')
const collectionTwo = client.db('yourDB').collection('your-collection-02')


// default route
app.get('/', (req, res) => {

})

// others routes
/* Brands Route */
app.get('/others', async (req, res) => {

})

app.listen(port, () => {

})
