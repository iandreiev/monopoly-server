const sql = require('./db')

const Block = function(block){
    this.page_id = block.page_id;
    this.title_title = block.title_title;
    this.title_title_en = block.title_title_en;
    this.title_title_ch = block.title_title_ch;
    this.title_type = block.title_type;
    this.title_align = block.title_align;
    this.content_type = block.content_type;
    this.content_text = block.content_text;
    this.content_text_en = block.content_text_en;
    this.content_text_ch = block.content_text_en;
    this.content_align = block.content_align;
    this.media_type = block.media_type;
    this.media_content = block.media_content;
    this.cta_type = block.cta_type;
    this.cta_text = block.cta_text;
    this.cta_text_en = block.cta_text_en;
    this.cta_text_ch = block.cta_text_ch;
    this.cta_url = block.cta_url;
    this.meta_title = block.meta_title;
    this.meta_arrange = block.meta_arrange;
    this.meta_alias = block.meta_alias;
    this.meta_align = block.meta_align
}

Block.create = (newBlock, result) => {
    sql.query("INSERT INTO pages SET ?", newBlock, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log("page created: ", {id: res.insertId, ...newBlock});
        result(null, {id: res.insertId, ...newBlock});
    })
}

Block.findById = (id, result) => {
    sql.query("SELECT * FROM pages WHERE page_id = ?", id, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res) {
            console.log("found block item: ", res);
            result(null, res);
            return;
          }
      
          // not found page with the id
          result({ kind: "not_found" }, null);
    })
}

Block.update = (id, page, result) => {
    sql.query('UPDATE pages SET title_title = ?, title_title_en = ?,title_title_ch = ?, title_type = ?, title_align = ?, content_type = ?, content_text = ? content_text_en = ? content_text_ch = ?, content_align = ?, media_type = ?, media_content = ?, cta_type = ?, cta_text = ?, cta_text_en = ?, cta_text_ch = ?,  cta_url = ?, meta_title = ?, meta_arrange = ?, meta_alias = ?, meta_align = ? WHERE page_id = ?',
    [page.title_title, page.title_title_en,page.title_title_ch, page.title_type,page.title_align, page.content_type, page.content_text,page.content_text_en,page.content_text_ch, page.content_align, page.media_type, page.media_content, page.cta_type, page.cta_text, page.cta_text_en, page.cta_text_ch, page.cta_url, page.meta_title, page.meta_arrange, page.meta_alias, page.meta_align, id],
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

        console.log("updated page: ", {id:  id, ...page});
        result(null, {id:id, ...page});
    })
}

Block.remove = (id, result) => {
    sql.query('DELETE FROM pages WHERE page_id = ?', id, (err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRow == 0){
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted block with alias: ", id);
        result(null, res);
    })
}

module.exports = Block;
