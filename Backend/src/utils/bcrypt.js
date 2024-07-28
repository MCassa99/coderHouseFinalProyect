import bcrypt from 'bcrypt';
import varenv from '../dotenv.js';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const validateHash = (password, hashDB) => bcrypt.compareSync(password, hashDB);
