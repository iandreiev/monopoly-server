const sql = require("./db.js");

const Category = function (category) {
    this.title = category.title;
    this.title_en = category.title_en;
    this.title_ch = category.title_ch;
    this.alias = category.alias;
};


Category.create = (newCategory, result) => {

    sql.query("INSERT INTO categories SET ?", newCategory, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("Category item created: ", {id: res.insertId, ...newCategory});
        result(null, {id: res.insertId, ...newCategory});
    })
}

Category.getAll = result => {
    sql.query("SELECT * FROM categories", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("category: ", res);
          result(null, res);
    });
};

Category.findById = (categoryId, result) => {
    sql.query("SELECT * FROM categories WHERE id = ?", categoryId, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found user item: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          // not found Customer with the id
          result({ kind: "not_found" }, null);
    })
}

Category.updateById = (id,category, result) => { 
    sql.query("UPDATE categories SET title = ?, title_en = ?, title_ch = ?, alias = ? WHERE id = ?",
    [category.title, category.title_en, category.title_ch, category.alias, id],
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

        console.log("updated category: ", {id:  id, ...category});
        result(null, {id:id, ...category});
    })
}

Category.remove = (id, result) => {
    sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted category with id: ", id);
        result(null, res);
    });
  };



module.exports = Category;
