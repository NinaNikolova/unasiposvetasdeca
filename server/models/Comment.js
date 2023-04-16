const { Schema, model, Types: { ObjectId } } = require('mongoose');



const commentSchema = new Schema({
    content: { type: String, required: true, minlength: [3, 'Съдържанието трябва да бъде поне 3 букви'] },
     _storyId: { type: ObjectId, ref: 'Story', required: true },
     _ownerId: { type: ObjectId, ref: 'User', required: true }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;