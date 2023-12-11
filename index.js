import express from 'express';
import mongoose from 'mongoose';
import {PORT} from "./config.js";
import * as AuthController from './controllers/AuthController.js';
import * as PostController from './controllers/PostController.js';
import cors from "cors";

mongoose
    .connect('mongodb+srv://kubalalaoplp:lulubox_2000@sl.ramtfzg.mongodb.net/rt?retryWrites=true&w=majority')
    .then(() => console.log('DB OK!'))
    .catch((e) => console.log('DB error!', e))

const router = express()

router.use(cors())
router.use(express.json());
router.listen(PORT,(e) => {
    if (e) {
        return console.log('Server error!', e)
    }
    console.log(`Server OK on port ${PORT}!`);
})

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.post('/auth/me', AuthController.me)
router.post('/auth/reset', AuthController.reset)

router.post('/posts', PostController.create)
router.get('/posts', PostController.all)