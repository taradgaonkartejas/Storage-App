
import prisma from '../prisma.service';


const createFile = async (file: any) => {
    return await prisma.file.create({
        data: {
            originalName: file.originalname,
            filename: file.originalname,
            content: file.buffer,
        },
    });
}

const getAllFiles = async () => {
    return await prisma.file.findMany({
        select: {
            id: true,
            originalName: true,
            filename: true,
            createdAt: true
        }
    });
}

const getFileById = async (id: string) => {
    return await prisma.file.findUnique({
        where: { id: parseInt(id) },
    });
}

const deleteFileById = async (id: string) => {
    return await prisma.file.delete({
        where: {
            id: Number(id)
        }
    });
}

export default { createFile, getAllFiles, getFileById, deleteFileById }