import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TagSchema = new Schema({
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }],
    hashTag: {
        required: true,
        type: String
    }
});

// Экспорт модели поста
export default model('Tag', TagSchema);
