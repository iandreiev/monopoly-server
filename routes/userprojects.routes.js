module.exports = app =>{
    const uProject = require("../controllers/userprojects.controller");

    app.post("/buy", uProject.buy);
    app.patch("/buy/increase", uProject.increase);
    app.get("/users/stats/:userId", uProject.getUserStat);
    app.get("/stats/projects/", uProject.getProjectsStat);
    app.get("/users/returns/:userId", uProject.getTotalReturns);
    app.patch("/users/projects/activate", uProject.setActive)
}   