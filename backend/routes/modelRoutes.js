import express from 'express';
import User from '../models/usermodel.js';
import data from '../../frontend/data.js';

const modelRoutes = express.Router();

modelRoutes.get('/', async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
});

export default modelRoutes;