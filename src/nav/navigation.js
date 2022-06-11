import { join } from 'path';
import { readdir } from 'fs/promises';
import { isAbsolute } from 'path';

export const goUpDirectory = async () => {

    try {
       await process.chdir(join(process.cwd(), '../'));
    } catch (err) {
        console.error('Operation failed');
    }

}

export const goToDirectory = async (path) => {
    try {
        if (!isAbsolute(path)) path = join(process.cwd(), path);
        await process.chdir(path)
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