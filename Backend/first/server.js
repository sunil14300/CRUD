const express = require('express');
const mongoose = require('mongoose');
const Register = require('./modules/people');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware to parse request body
app.use(bodyParser.json()); // or use app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Home Route
app.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
});


app.post('/register', async (req, res) => {
    try {
        const data = req.body;  // Get user data from request
        const newRegister = new Register(data); // Create new user instance

      const respose=  await newRegister.save(); // Save to MongoDB

        res.status(201).json(respose);
    } catch (err) {
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
});

app.get('/register',async(req,res)=>{
    try{
        const user=await Register.find();
        console.log('data fatch');
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
})

app.put('/register/:id', async (req, res) => {
    try {
        const registerId = req.params.id;
        const updateData = req.body;

        const updatedUser = await Register.findByIdAndUpdate(registerId, updateData);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('User updated:');
        res.status(200).json( updatedUser);

    } catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err.message });
    }
});

app.delete('/register/:id',async(req,res)=>{
    try{
        const registerId=req.params.id;
        const deleteuser=await Register.findByIdAndDelete(registerId);
        console.log('data deleted');
        res.status(200).json(deleteuser);
    }catch(err){
        res.status(500).json({err:"Internal server error"});
    }
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
