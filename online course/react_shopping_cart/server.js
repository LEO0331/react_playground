const express = require('express'); 
const mongoose = require('mongoose');
const {Schema} = mongoose;
const shortid = require('shortid');

const app = express();
app.use(express.json()); //https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
//production
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

mongoose.connect(
    process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-db", { //resolve dependency warnings in deploy to Heroku
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

const orderSchema = new Schema({
    _id: {type: String, default: shortid.generate},
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
            _id: String,
            title: String,
            price: Number,
            count: Number
        }],
    }, 
    {   
        timestamps: true
    }); //'createdAt' and 'updatedAt' timestamps
const Order = mongoose.model('order', orderSchema);

app.post('/api/orders', async (req, res) => { 
    if(!req.body.name || !req.body.email || !req.body.address || !req.body.total || !req.body.cartItems){
        return res.send({message: "Data is required"})
    }
    //const newOrder = new Order(req.body);
    //const saved = await newOrder.save();
    const order = await Order(req.body).save();
    res.send(order);
});

app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

app.delete("/api/orders/:id", async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); //serve at http://localhost:5000
