module.exports = app => {
    const slider = require('../controllers/slider.controller');

    app.post('/slider', slider.create);
    app.get('/slider',slider.getAll);
    app.get('/slider/:id',slider.getById);
    app.patch('/slider/:id',slider.updateById);
    app.delete('/slider/:id',slider.delete);
}