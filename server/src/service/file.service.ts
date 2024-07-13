import { Request, Response } from 'express';
import fileHandler from '../handler/file.handler';
import path from 'path';
import fs from 'fs';

const uploadFile =async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
  
    if (!files || files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
  
    try {
      const savedFiles = await Promise.all(files.map(async (file) => {
        return await fileHandler.createFile(file);
      }));
  
      res.json(savedFiles);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving files to database.');
    }
  }

const getAllFiles = async (req: Request, res: Response) => {
    try {
        const files = await fileHandler.getAllFiles();
        res.status(200).json(files);
    } catch (err) {
        res.status(500).send('Error retrieving files from database.');
    }
}

const downloadFile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const file = await fileHandler.getFileById(id);
        if (file) {
            res.setHeader('Content-Disposition', `attachment; filename=${file.originalName}`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.status(200).send(file.content);
        } else {
            res.status(404).send('File not found.');
        }
    } catch (err) {
        res.status(500).send('Error retrieving file from database.');
    }
}

const deleteFile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const file = await fileHandler.getFileById(id);
        if (file) {
         
            // Delete the file record from the database
            await fileHandler.deleteFileById(id);
            res.status(200).send('File deleted successfully.');
        } else {
            res.status(404).send('File not found.');
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Error deleting file.');
    }
}

export default { uploadFile, getAllFiles, downloadFile, deleteFile };