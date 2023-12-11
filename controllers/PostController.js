import Post from "../models/Post.js";


export const create = async (req, res) => {
    try {

        const {user, images, tags, desc} = req.body

        const post = await Post.create({
            user,
            desc,
            images,
            tags: tags.map((item) => `#${item}`),
            likes: [],
            bookmarks: [],
        })

        return res.status(201).json({
            post,
            message: 'Пост успешно создан!',
            postId: post._id
        })



    } catch (e) {
        console.log(e)
        return res.status(500).json('Серверная ошибка!')
    }
}

export const one = async (req, res) => {
    try {

        const {user} = req.body

        const post = await Post.findOne({user}).populate('user')

        return res.status(201).json({
            post
        })



    } catch (e) {
        console.log(e)
        return res.status(500).json('Серверная ошибка!')
    }
}

export const all = async (req, res) => {
    try {


        const posts = await Post.find().populate('user')

        return res.status(201).json({
            posts
        })



    } catch (e) {
        console.log(e)
        return res.status(500).json('Серверная ошибка!')
    }
}
