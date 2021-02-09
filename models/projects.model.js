const sql = require("./db.js");

const Project = function(project){
    this.title = project.title;
    this.title_en = project.title_en;
    this.title_ch = project.title_ch;
    this.category = project.category;
    this.projectBrief = project.projectBrief;
    this.projectBrief_en = project.projectBrief_en;
    this.projectBrief_ch = project.projectBrief_ch;
    this.funded = project.funded;
    this.pledged = project.pledged;
    this.backers = project.backers;
    this.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.entrance = project.entrance;
    this.image = project.image;
    this.yield = project.yield;
    this.returns = project.returns;
    this.minimum = project.minimum;
    this.cost = project.cost;
    this.location = project.location;
    this.location_en = project.location_en;
    this.location_ch = project.location_ch;
    this.type = project.type;
}




//Create
Project.create = (newProject, result) => {
    sql.query("INSERT INTO projects SET ?", newProject, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("Project item created: ", {id: res.insertId, ...newProject});
        result(null, {id: res.insertId, ...newProject}); 
    })
}

//GetAll
Project.getAll = result => {
    sql.query("SELECT * FROM projects", (err,res)=>{
       
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

        //   console.log("Project ID", res[0].id)
      
        //   console.log("Project: ", res);
          result(null, res);  
    })
}

//GetById
Project.findById = (projectId, result) => {
    sql.query("SELECT * FROM projects WHERE id = ?", projectId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found project item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null);
    })
}

Project.getByCat = (catId, result) =>{
    sql.query("SELECT * FROM projects WHERE category = ?", catId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found project item: ", res);
            result(null, res);
            return;
          }
      
          // not found project with the id
          result({ kind: "not_found" }, null);
    })
}

//Update
Project.updateById = (id, project, result) => {
    sql.query("UPDATE projects SET title = ?, category = ?, projectBrief = ?, funded = ?, backers = ?, createdAt = ?, entrance = ?, image = ?, yield = ?, returns = ?, minimum = ?, cost = ?, location = ?, title_en = ?, projectBrief_en = ?, location_en = ?, title_ch = ?, projectBrief_ch= ?, location_ch = ? WHERE id = ?",
    [project.title, project.category, project.projectBrief, project.funded, project.backers, project.createdAt, project.entrance, project.image,  project.yield, project.returns, project.minimum, project.cost, project.location, project.title_en, project.projectBrief_en, project.location_en, project.title_ch, project.projectBrief_ch, project.location_ch, id],
    (err,res) => {
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated project: ", {id:  id, ...project});
        result(null, {id:id, ...project});
    }
    );   
}

//Remove
Project.remove = (id, result) => {
    sql.query("DELETE FROM projects WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted project with id: ", id);
        result(null, res);
    });
  };

// Set project mode
Project.setType = (type, id, result) => {
    sql.query("UPDATE projects SET type = ? WHERE id = ?", [type, id], (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }
        
        if(type == 1){
            testInterval(id,type)
        } else {
            console.log('Таке життя')
        }

        console.log("Set mode to project id: ", id);
        result(null, res); 
    })
}


function testInterval(id,type){
    let ms = 2592000000
    let minute = 60000
    let dev = 5*minute

    setInterval(()=>{
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        sql.query("SELECT userId, userfunded, percentage FROM userprojects WHERE projectId = ? AND type = ?", [id,type],(err,res)=>{
            res.forEach(i => {
                sql.query('SELECT balance, userID FROM wallet WHERE userID = ?', [i.userId], (err,res)=>{
                    res.forEach(item => {
                        let divs = calcDivs(i.userfunded,i.percentage,i.userId)
                       let amount = item.balance + calcDivs(i.userfunded,i.percentage,i.userId)
                       
                       sql.query('UPDATE wallet SET balance = ? WHERE userID = ?', [amount, item.userID], (err,res)=>{
                           if(err){
                               console.log('Error has been occured: ', err)
                           }
                           let msg = `Привет! Пришли дивиденды от проекта #${id} в размере ${divs} MNP`
                           sendNotification(item.userID, 1, msg, date, 1)
                       })
                    })
                })
            });
        
        })

        }, dev)
}

function calcDivs(userfunded, percentage, userId) {
   return formula = userfunded * (percentage/100)
}

function sendNotification(id, type, message, createdAt, isShow){
    let data = {
        userId: id,
        content: message,
        authorId: 77,
        createdAt: createdAt,
        type: type,
        isShow: isShow
    }    

    sql.query('INSERT INTO notifications SET ?', [data, id], (err,res)=>{
        if(err){
            console.log('Error has been occured: Check the sendNotification!',err)
        }
        else{
            console.log(`Sent to id ${id}!`)
        }
       
    })
}

module.exports = Project;

