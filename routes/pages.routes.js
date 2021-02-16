module.exports = app => {
    const block = require('../controllers/pages.controller')

    app.post('/blocks', block.create)
    app.get('/blocks/:id', block.findOne)
    app.patch('/blocks/:id', block.update)
    app.delete('/blocks/:id', block.delete)
}