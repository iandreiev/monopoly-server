const sql = require('./db')

const Page = function (page) {
    this.alias = page.alias;
    this.title = page.title;
    this.title_en = page.title_en;
    this.title_ch = page.title_ch;
    this.meta = page.meta;
    this.meta_en = page.meta_en;
    this.meta_ch = page.meta_ch;
}

Page.create = (newPage, result) => {
    sql.query("INSERT INTO builder SET ?", newPage, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("page created: ", {id: res.insertId, ...newPage});
        result(null, {id: res.insertId, ...newPage});
    })
}

Page.getAll = result => {
    sql.query("SELECT * FROM builder", (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("Pages: ", res);
          result(null, res);  
    })
}

Page.findByAlias = (alias, result) => {
    sql.query("SELECT * FROM builder WHERE alias = ?", alias, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res) {
            console.log("found page item: ", res);
            result(null, res);
            return;
          }
      
          // not found page with the id
          result({ kind: "not_found" }, null);
    })
}

Page.update = (alias, page, result) => {
    sql.query('UPDATE builder SET title = ?, title_en = ?, title_ch = ?, meta = ?, meta_en = ?, meta_ch = ? WHERE alias = ?',
    [page.title, page.title_en, page.title_ch, page.meta, page.meta_en, page.meta_ch, alias],
    (err,res)=>{
        if (err){
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("updated page: ", {alias:  alias, ...page});
        result(null, {alias:alias, ...page});
    }
    )
}

Page.remove = (alias, result) => {
    sql.query("DELETE FROM builder WHERE alias = ?", alias, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted page with alias: ", alias);
        result(null, res);
    });
  };

module.exports = Page;
