//EXCEL-FILE UPLPOAD CONFIG
const multer = require("multer");
const path = require("path");

//==EXCEL FILE UPLOAD CONFIG==
const excelStorage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, 'uploads/excel-sheets/'),
    filename: (req,file,cb) => cb(null, `excel-${Date.now()}${path.extname(file.originalname)}`)
});

const excelFilter = (req,file,cb) => {
    const ext = path.extreme(file.originalname).toLowerCase();
    if (['.xlsx','.xls','.csv'].includes(ext)) cb(null,true);
    else cb(new Error('Only Excel File are Supported'),false);
}

const excelUpload = multer({
    storage: excelStorage,
    fileFilter: excelFilter,
    limits: { fileSize: 5 * 1024 * 1024}
}).single('file');

module.exports = { excelUpload };