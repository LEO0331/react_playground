const express = require('express'); 
const mongoose = require('mongoose');
const {Schema} = mongoose;
const shortid = require('shortid');

const app = express();
app.use(express.json()); //https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

mongoose.connect("mongodb://localhost/react-shopping-cart-db", { //resolve dependency warnings in deploy to Heroku
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const productSchema = new Schema({
    _id: {type: String, default: shortid.generate},
    title: String,
    image: String,
    description: String,
    availableSizes: [String],
    price: Number
});
const Product = mongoose.model('products', productSchema);

app.get('/api/products', async (req, res) => { //fetch
    const products = await Product.find({});
    res.send(products);
});

app.post('/api/products', async (req, res) => { //create new products
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.send(saved);
});
//https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
app.delete('/api/products/:id', async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.send(deleted);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);