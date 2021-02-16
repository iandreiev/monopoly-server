module.exports = app => {
    const page = require('../controllers/builder.controller')

    app.post('/pages', page.create);
    app.get('/pages', page.findAll)
    app.get('/pages/:alias', page.findOne)
    app.patch('/pages/:alias', page.update)
    app.delete('/pages/:alias', page.delete)
}