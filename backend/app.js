const express =  require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();


const PORT = 4000;
var corsOption = {
    origin: "http://localhost:4200 ",
    optionsSuccessStatus: 20
}
app.use(cors(corsOption));

app.get("/", (req,res) => {
    res.send("App is running Fine");
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })


  const upload = multer({ storage: storage });

app.post("/file",upload.single("file"),(req,res)=>
{
    const file = req.file;
    if(file)
    {
        res.json(file);
    }
    else{
        throw new Errorlog("File upload Failed");
    }
});

app.post("/files",upload.array("files"),(req,res)=>
{
    const files = req.files;
    if(Array.isArray(files) && files.length > 0)
    {
        res.json(files);
    }
    else{
        throw new Errorlog("File upload Failed");
    }
});


app.listen(PORT, () =>
{
    console.log(`App is running on localhost: ${PORT}`);
})