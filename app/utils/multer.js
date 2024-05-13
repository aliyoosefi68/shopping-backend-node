const multer = require("multer");
const path = require("path");
const fs = require("fs");

function createRoute() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    date
  );
  fs.mkdirSync(directory, { recursive: true });

  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = createRoute();
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = String(new Date().getTime() + ext);
    cb(null, fileName);
  },
});

const uploadFile = multer({ storage });

module.exports = {
  uploadFile,
};
