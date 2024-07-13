import express from 'express';
import multer from 'multer';
import fileService from '../service/file.service';


//const basURL = '/api/file'
const fileRoute = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileRoute.post('/upload',upload.array('files', 100), fileService.uploadFile);

fileRoute.get('/', fileService.getAllFiles);

fileRoute.get('/:id',fileService.downloadFile);

fileRoute.delete('/:id',fileService.deleteFile);

export default fileRoute;
