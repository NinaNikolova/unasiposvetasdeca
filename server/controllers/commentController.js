const commentController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAllComments, createComment, updateComment, deleteByIdComment, getByIdComment } = require('../services/commentService');
const { parseError } = require('../util/parser');


commentController.get('/', async (req, res) => {
    let items = [];
    
        items = await getAllComments();
    
    res.json(items);
});

commentController.post('/', hasUser(), async (req, res) => {
    try {
        const comment = Object.assign({ _ownerId: req.user._id }, req.body);
        const item = await createComment(comment);
        res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});



commentController.put('/:id', hasUser(), async (req, res, next) => {
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        const result = await updateComment(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

commentController.delete('/:id', hasUser(), async (req, res) => {
    const item = await getByIdComment(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await deleteByIdComment(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

module.exports = commentController;