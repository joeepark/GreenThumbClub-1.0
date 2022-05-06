import express from 'express';
import data from '../frontend/data.js';
import mongoose from 'mongoose';
import modelRoutes from './routes/modelRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 3000;

// Order matters in where these are placed. 
// use(Express.json) needs to be before the use routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/model', modelRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
const mongoURI = 'mongodb+srv://monstera:monstera@cluster0.tsgct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURI).then(console.log('Connected to db'));

// Get product info from frontend to backend
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
// Get product info based on slug of url
app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


// 404 handler
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Global error handlers
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err.message });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})