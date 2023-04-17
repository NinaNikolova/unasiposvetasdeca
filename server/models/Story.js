const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https:\/\/.+$/i;

const storySchema = new Schema({
    title: { type: String, required: true, minlength: [3, 'Заглавието трябва да бъде поне 3 букви'] },
    description: { type: String, required: true, minlength: [10, 'Описанието трябва да бъде поне 10 букви'] },
    img: { type: String, required: true, validate:{
        validator: (value)=>URL_PATTERN.test(value),
        message: 'Невалиден адрес на снимката. Трябва да започва с http или https'
    } },
    _ownerId: { type: ObjectId, ref: 'User', required: true },
    email: { type: String },
    duration: { type: String, minlength: [3, 'Продължителност трябва да бъде поне 3 букви или цифри'] },
    route: { type: String, minlength: [3, 'Продължителност трябва да бъде поне 3 букви или цифри'] },
    placesToEat: { type: String, minlength: [3, 'Продължителност трябва да бъде поне 3 букви или цифри'] },
});

const Story = model('Story', storySchema);

module.exports = Story;