const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
// const functions = require('firebase-functions');
const app = express();
const fs = require('fs')



// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors( ));
//Soket.IO Server

//HTTPS

const http = require("http").createServer(app);

io = require("socket.io")(http, {
  cors: {
    origin: '*',
   
  }
});

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: " Hey buddy, I think you've got the wrong door, the leather club's two blocks down." });
});



//Routes
app.get("/test/socket", (req,res)=>{
  res.sendFile(path.join(__dirname+'/static/index.html'))
})
require("./routes/users.routes.js")(app);
require("./routes/other.routes.js")(app);
require("./routes/websetup.routes.js")(app);
require("./routes/projects.routes.js")(app);
require("./routes/categories.routes.js")(app);
require("./routes/bidding.routes.js")(app);
require("./routes/messages.routes.js")(app);
require("./routes/chat.routes.js")(app);
require("./routes/payment.routes.js")(app);
require("./routes/userprojects.routes.js")(app);
require("./routes/history.routes.js")(app);
require("./routes/notifications.routes.js")(app);
require("./routes/wallet.routes.js")(app);
require("./routes/sms.routes.js")(app);
require("./routes/mailer.routes")(app);
require("./routes/videos.routes")(app);
require("./routes/slider.routes")(app);
require("./routes/builder.routes")(app);
require("./routes/pages.routes")(app);



io.on("connection", function(socket){
  console.log("User connected", socket.id);
})



http.listen(3031, () => {
    console.log("Server is running on port 3031.");
  });

