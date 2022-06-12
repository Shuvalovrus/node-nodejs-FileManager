import { createWriteStream } from 'fs';
import { join } from "path";

export const createFile = async (file) => {
    try {
        const path = join( process.cwd(), file );

        await createWriteStream(path).end();

    } catch (err) {
        console.error('Operation failed');
    }


}