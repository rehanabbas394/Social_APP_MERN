const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },

    desc:{
        type:String,
        max: 500,
        default: ""
    },

    img:{
        type:String,
        default: ""
    },

    likes:{
        type: Array,
        default: []
    }
}, {timestamps:true});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;