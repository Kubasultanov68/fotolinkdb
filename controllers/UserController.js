import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SALT, SECRET_JWT} from "../config.js";

export const register = async (req, res) => {
    try {

        const {firstName, lastName, email, userName, password, avatarUrl, resetCode} = req.body

        const objectLength = Object.keys(req.body).length;

        if (objectLength < 4) {
            const existUser = await User.findOne({email})

            if (existUser) {
                return res.status(400).json({
                    message: 'Пользователь с таким почтовым адресом уже существует!',
                    input: 'email'
                })
            }

            return res.json({email, firstName, lastName})
        } else {
            const existUser = await User.findOne({userName})

            if (existUser) {
                return res.status(400).json({
                    message: 'Пользователь с таким логином уже существует!',
                    input: 'userName'
                })
            }

            const hashedPassword = await bcrypt.hash(password, SALT)

            const user = await User.create({
                firstName,
                lastName,
                email,
                userName,
                password: hashedPassword,
                avatarUrl,
                resetCode
            })

            const token = await genToken(user._id)

            return res.status(201).json({ user, token, message: 'Вы успешно зарегистрировались!' })

        }

    } catch (e) {
        console.log(e)
        return res.status(500).json('Серверная ошибка!')
    }
}


export const login = async (req, res) => {
    try {

        const { userName, password} = req.body


        const user = await User.findOne({userName})

        if (!user) {
            return res.status(404).json({
                message: 'Пользователб с таким логином не существует!',
                input: 'userName'
            })
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Неверный пароль!',
                input: 'password'
            })
        }

        const token = await genToken(user._id)

        return res.status(201).json({user, token, message: 'Вы успешно вошли!'})


    } catch (e) {
        console.log(e)
        return res.status(500).json('Серверная ошибка!')
    }
}

export const me = async (req, res) => {
    try {

        const {token} = req.body

        const {userId} = await jwt.decode(token)

        const user = await User.findOne({_id: userId})




        return res.status(200).json({user})


    } catch (e) {
        console.log(e)
        return res.status(500).json('Серверная ошибка!')
    }
}


function genToken (userId) {
    const token = jwt.sign({userId}, SECRET_JWT)
    return token
}
