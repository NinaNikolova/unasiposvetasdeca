const Comment = require('../models/Comment');


async function getAllComments() {
    return Comment.find({});
}


async function getByIdComment(id) {
    return Comment.findById(id);
}

async function createComment(comment) {
    return Comment.create(comment);
}

async function updateComment(id, comment) {
    const existing = await Comment.findById(id);

    existing.content = comment.content;  

    return existing.save();
}

async function deleteByIdComment(id) {
    return Comment.findByIdAndDelete(id);
}


module.exports = {getAllComments, createComment, updateComment, deleteByIdComment, getByIdComment };