module.exports = app =>{
    const project = require("../controllers/projects.controller.js");

    app.post("/projects", project.create);
    app.get("/projects", project.findAll);
    app.get("/projects/cat/:catId", project.getProjectsByCatId);
    app.get("/projects/:projectId", project.findOne);
    app.patch("/projects/:projectId", project.update);
    app.patch("/projects/setType/:projectId", project.setType);
    app.delete("/projects/:projectId", project.delete);
}