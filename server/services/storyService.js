const Story = require('../models/Story');


async function getAll() {
    return Story.find({});
}

async function getByUserId(userId) {
    return Story.find({ _ownerId: userId });
}

async function getById(id) {
    return Story.findById(id);
}

async function create(story) {
    return Story.create(story);
}

async function update(id, story) {
    const existing = await Story.findById(id);

    existing.title = story.title;  
    existing.description = story.description;
    existing.img = story.img;
    existing.duration = story.duration;
    existing.route = story.route;
    existing.placesToEat = story.placesToEat;

    return existing.save();
}

async function deleteById(id) {
    return Story.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getByUserId,
    getById,
    create,
    update,
    deleteById
};