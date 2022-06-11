import { join } from 'path';
import { readdir } from 'fs/promises';

export const goUpDirectory = async () => {

    try {
       await process.chdir(join(process.cwd(), '../'));
    } catch (err) {
        console.error('Operation failed');
    }

}

export const goToDirectory = async (path) => {
    try {
       await process.chdir(join(process.cwd(), path))
    } catch (err) {
        console.error('Operation failed');
    }

}

export const getListDirectory = async () => {

    try {
        const result = await readdir(process.cwd());
        console.log(result);
    } catch (err) {
        console.error('Operation failed');
    }

}