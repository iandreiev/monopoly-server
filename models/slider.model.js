const sql = require('./db');
const Slider = function(slider) {
    this.name = slider.name;
    this.title = slider.title;
    this.title_en = slider.title_en;
    this.title_ch = slider.title_ch;
    this.subtitle = slider.subtitle;
    this.subtitle_en = slider.subtitle_en;
    this.subtitle_ch = slider.subtitle_ch;
    this.media = slider.media;
    this.url = slider.url;
    this.arrange = slider.arrange;
}

Slider.create = (newSlider, result) => {
    sql.query("INSERT INTO slider SET ?", newSlider, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }
            console.log('CREATED SLIDE', {...newSlider})
            result(null, {...newSlider})
    })
}
Slider.update = (id, newSlider, result) => {
    sql.query('UPDATE slider SET ? WHERE id = ?', [newSlider, id], (err,res)=>{
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
    
            console.log("updated slider: ", {id:  id, ...newSlider});
            result(null, {id:id, ...newSlider});
        }
    })
}
Slider.getAll = result => {
    sql.query("SELECT * FROM slider ORDER BY `slider`.`arrange` ASC", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          result(null, res); 
    })
}
Slider.getById = (id, result) => {
    sql.query("SELECT * FROM slider WHERE id = ?", id, (err,res)=>{
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
Slider.remove = (id, result) => {
    sql.query("DELETE FROM slider WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted slider with id: ", id);
        result(null, res);
    });
}

module.exports = Slider;