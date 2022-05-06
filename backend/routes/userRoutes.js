import express from 'express';
import User from '../models/usermodel.js';

const userRoutes = express.Router();

userRoutes.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.send({
                user: user
            })
            return;
        }
    } catch (err) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }
});

export default userRoutes;