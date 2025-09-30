const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3002;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // в разработке можно использовать http
}));

//тестовый администратор
const adminUser = {
    username: 'admin',
    password: 'password'
};

//MongoDB connection mongodb+srv://alkotju:<db_password>@cluster0.sp4bqqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoURI = 'mongodb+srv://alkotju:895122@cluster0.sp4bqqv.mongodb.net/dbWeb?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Mongoose schema and model
const courseSchema = new mongoose.Schema({
    img: String,
    altimg: String,
    title: String,
    descr: String,
    price: Number
});

const courseItem = mongoose.model('courseItem', courseSchema, 'course');

const requestSchema = new mongoose.Schema({
    name: String,
    phone: String
});

// function to seed the database
const seedDatabase = async () => {
    try {
        const count = await courseItem.countDocuments();
        if (count === 0){
            console.log('No data found in courses collection. Seeding database...');
            const data = fs.readFileSync('db.json', 'utf-8');
            const json = JSON.parse(data);
            await courseItem.insertMany(json.courses);
            console.log('Database seeded successfully.');
        } else {
            console.log('Courses collection already contains data. Skipping seed.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

const Request = mongoose.model('Request', requestSchema);

//Middleware для проверки аутентификации
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    }else {
        res.status(401).send('UnauTHORized');
    }
};

//Маршрут для входа
app.post('/login', (req, res) => {
    const { username, password} = req.body;
    if (username === adminUser.username && password === adminUser.password){
        req.session.user = adminUser;
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials')
    }
})
//Маршрут для выхода
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Logout successful');
});

//Маршрут для проверки статуса сеанса
app.get('/session-status', (req, res) => {
    if (req.session.user){
        res.status(200).json({loggedIn: true});
    } else {
        res.status(200).json({loggedIn: false});
    }
});

//Маршрут для админ-панели
app.get('/admin', isAuthenticated, (req, res) =>{
    res.sendFile(path.join(__dirname, 'admin/admin.html'));
});



//API Routes
app.post('/requests', async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error){
        res.status(400).json({message: error.message });
    }
});

app.get('/courses', async (req, res) =>{
    try{
        const coursesItems = await courseItem.find();
        res.json(coursesItems);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

app.post('/courses', isAuthenticated, async(req, res) =>{
    try {
        const newItem= new courseItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error){
        res.status(400).json({ message: error.message});
    }
});

app.delete('/courses/:id', isAuthenticated, async (req, res) =>{
    try{
        const { id } = req.params;
        await courseItem.findByIdAndDelete(id);
        res.status(200).send('Course item deleted');
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

app.put('/courses/:id', isAuthenticated, async (req, res) =>{
    try{
        const { id } = req.params;
        const updatedItem = await courseItem.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

// start the server and seed database
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    seedDatabase();
});


