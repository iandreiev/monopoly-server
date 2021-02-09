const sql = require("./db");

const UserProject = function (userProject) {
    this.userID = userProject.userID;
    this.projectID = userProject.projectID;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.userfunded = userProject.userfunded;
    this.percentage = userProject.percentage;
    this.shareSize = userProject.shareSize;
    this.active = userProject.active;
    this.type = userProject.type;
}


UserProject.buy = (newUserProject,result) => {
    sql.query("INSERT INTO userprojects SET ?", newUserProject, (err,res)=>{
      if(err){
          console.log("Error: ", err);
          result(err,null);
      }
      sql.query("UPDATE projects SET backers=backers+1 WHERE id = ?", newUserProject.projectID, (err,res)=>{
        if(err){
            console.log(err)
        }
        console.log(res)
      })
      sql.query("UPDATE projects SET funded=funded+? WHERE id = ?", [newUserProject.userfunded, newUserProject.projectID], (err,res)=>{
        if(err){
            console.log(err)
        }
        console.log(res)
        // result(null, res)
    })

      console.log("Project item created: ", {id: res.insertId, ...newUserProject});
      result(null, {id: res.insertId, ...newUserProject}); 
    })
}

UserProject.setToUser = (id, type, ) => {

}

UserProject.increase = (newUserProject, result) => {
    sql.query("UPDATE projects SET funded=funded+? WHERE id = ?", [newUserProject.userfunded, newUserProject.projectID], (err,res)=>{
        console.log(res)
        result(null, res)
    })
    sql.query("UPDATE userprojects SET userfunded=userfunded+? WHERE userID = ? AND projectID = ?", [newUserProject.userfunded, newUserProject.userID, newUserProject.projectID], (err,res)=>{
        console.log(res)
    })
    sql.query("UPDATE userprojects SET shareSize=shareSize+? WHERE userID = ? AND projectID = ?", [newUserProject.shareSize, newUserProject.userID, newUserProject.projectID], (err,res)=>{
        console.log(res)
    })
    sql.query("UPDATE projects SET shareSize=shareSize+? WHERE id = ?", [newUserProject.shareSize, newUserProject.projectID], (err,res)=>{
        console.log(res)
    })

    return

}

UserProject.getStats = (id, result) => {
    sql.query("SELECT SUM(userprojects.userfunded) as funds, AVG(userprojects.percentage) as percents FROM users INNER JOIN userprojects ON userprojects.userID = users.id INNER JOIN projects ON userprojects.projectID = projects.id WHERE users.id = ?", id, 
    (err,res)=>{
        if(err){
            console.log(err)
            result(err,null)
            return
        }

        console.log("found user stats:", res)
        result(null,res)
        return
    })
}

UserProject.getProjectStats = result => {
    sql.query("SELECT SUM(cost) as sumProjects FROM projects", (err,res)=>{
        if(err){
            console.log(err)
            result(err,null)
            return
        }

        console.log("found stats:", res)
        result(null,res)
        return
    })
}

UserProject.getTotalReturns = (id, result) => {
    sql.query("SELECT SUM(amount) as returns FROM transactions WHERE type = 7 AND userID = ?", id,
    (err,res)=>{
        if(err){
            console.log(err)
            result(err,null)
            return
        }

        console.log("found user stats:", res)
        result(null,res)
        return
    })
}

UserProject.setActive = (id, active, result) =>{
    sql.query("UPDATE userprojects active = ? WHERE id = ?", [active, id], (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRow == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated project with user: ", { id: id });
        result(null, { id: id });
    })
}

module.exports = UserProject;