const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Set your desired port

mongoose.connect('mongodb://localhost:27017/betterdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const User = mongoose.model('User', userSchema);

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    const newUser = new User({ email });
    newUser.save((err) => {
        if (err) {
            console.error("Error saving user email:", err);
            res.status(500).json({ error: 'Subscription failed' });
        } else {
            console.log("User email saved successfully.");
            res.status(200).json({ message: 'Subscription successful' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
