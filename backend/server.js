import express from 'express';
import data from '../frontend/data.js';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3000;


// Connect to MongoDB
const mongoURI = 'mongodb+srv://monstera:monstera@cluster0.tsgct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoURI).then(console.log('Connected to db'));


// Get request to data.js from frontend to backend
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
// Get request to data.js based on slug of url
app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


// 404 handler
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });

// Global error handlers
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({error: err});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})