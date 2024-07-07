import multer from "multer";
import { __dirname } from '../path.js';


const storageProducts = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, `${__dirname}/public/images/products`);
    }
    ,
    filename : (req, file, cb) => {
        cb(null, `${Date.now() + file.originalname}`);
    }
});

const storageDocs = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, `${__dirname}/docs/uploadedUserDocs`);
    }
    ,
    filename : (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const storageProfiles = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, `${__dirname}/public/images/profiles`);
    }
    ,
    filename : (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

export const uploadProducts = multer({ storage: storageProducts });
export const uploadDocs = multer({ storage: storageDocs });
export const uploadProfiles = multer({ storage: storageProfiles });
