// importing express library
const express = require("express");
const path = require("path");
//creating app component
const app = express();
//creating port for server
const PORT =  5000;
const cors = require('cors');
const indexController = require('./server/controllers/indexController')
const assetsRouter = require("./server/controllers/assets-router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

 app.use("/", express.static(path.join(__dirname, "public")));
 app.use("/src", assetsRouter);



//get

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// app.get("/api/v1", (req, res) => {
//   console.log('hit api endpoint')
//   res.json({
//     project: "Honeybadger take home",
//     from: "John Wroge",
//   });
// });


app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

// post
app.post('/api', indexController.checkForSpam, (req, res) => {
    console.log('hit endpoint')
    return res.status(200).json(res.locals.newItem)
})

// 
//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: {err: 'An error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  })

//listening for port to verify connectivity 
app.listen(PORT, () => {
  console.log();
  console.log(`  App running at port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});