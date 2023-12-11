import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    desc: {
        type: String,
        required: true
    },
    tags: [String],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
    id: true,
});

// Экспорт модели поста
export default model('Post', PostSchema);
