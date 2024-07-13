import express from 'express';
import fileRoute from '../controller/file.controller';

const apiRoute= express();

//const basURL = '/api'

apiRoute.use('/file',fileRoute);

export default apiRoute;