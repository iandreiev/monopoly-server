module.exports = app =>{
    const category = require("../controllers/categories.controller.js");

    app.post("/categories", category.create);
    app.get("/categories", category.findAll);
    app.get("/categories/:categoryId", category.findOne);
    app.patch("/categories/:categoryId", category.update);
    app.delete("/categories/:categoryId", category.delete);
}