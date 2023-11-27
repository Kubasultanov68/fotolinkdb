import express from 'express';
import mongoose from 'mongoose';
import {PORT} from "./config.js";
import * as UserController from './controllers/UserController.js';
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

router.post('/auth/register', UserController.register)
router.post('/auth/login', UserController.login)
router.post('/auth/me', UserController.me)
router.post('/auth/reset', UserController.reset)