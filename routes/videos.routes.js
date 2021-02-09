module.exports = app =>{
    const video = require("../controllers/videos.controller")
    app.post("/videos", video.create);
    app.get("/videos", video.getAll)
    app.get("/videos/:projectID", video.getByPID)
}