import nodemailer from "nodemailer";

export const PORT = process.env.PORT || 8080
export const SALT = 10
export const SECRET_JWT = 'azamat'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kubasultanov68@gmail.com',
        pass: process.env.GOOOGLE_PASS || 'kqzv tswd lcxy ozns',
    },
});