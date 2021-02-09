const sql = require("./db")

const Video = function(video){
    this.id = video.id;
    this.title = video.title;
    this.caption = video.caption;
    this.projectID = video.projectID;
    this.file = video.file;
    this.type = video.type;
}

Video.create = (newVideo, result) => {
    sql.query("INSERT INTO videos SET ?", newVideo, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("Video item created: ", {id: res.insertId, ...newVideo});
        result(null, {id: res.insertId, ...newVideo}); 
    })
}

Video.getAll = result => {
    sql.query("SELECT * FROM videos", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Project: ", res);
          result(null, res);  
    })
}

Video.getByPID = (projectID, result) => {
    sql.query("SELECT * FROM videos WHERE projectID = ?", projectID,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user item: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    })
}


module.exports = Video;