const multer = require("multer");
const path = require("path");

 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");  
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

 const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb("Error: Only images are allowed!");
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
