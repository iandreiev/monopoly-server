

module.exports = app =>{
    const user = require("../controllers/users.controller.js");

 app.post("/users",  user.create);
 app.post("/users/reg", user.regPass);
 app.post("/users/login", user.loginPass);
 app.patch("/users/setPassword/:password/:userId",user.setPassword);
 app.patch("/users/resetPasswordEmail/:password/:email",user.resetUserPassword);
 app.get("/users", user.findAll);
 app.get("/users/:userId", user.findOne);
 app.get("/users/getUser/:userId", user.getUserById);
 app.get("/users/projects/:userId", user.getUP);
 app.patch("/users/:userId", user.update);
 app.patch("/users/setPassport/:userId", user.setPassports);
 app.patch("/users/verify/:id",user.setVerified);
 app.patch("/users/setAvatar/:userId",user.setAvatar);
 app.delete("/users/:userId", user.delete);
//  app.patch("/users/:userId/:roleId", user.setUserRole);

}