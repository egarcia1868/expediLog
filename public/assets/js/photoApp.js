const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('gallery'));

app.get('/gallery',function(req,res){
  res.render('gallery', { });
 });

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('gallery',{
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('gallery', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('gallery', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});


app.get('/events', function(req, res){
  Event.find({}, function(err, allevents){
     if(err) {
         console.log('Error!');
     } else {
         res.render('eventDisplay', {events:allevents});
     }
  });
});

const port = 3100;

app.listen(port, () => console.log(`Server started on port ${port}`));
