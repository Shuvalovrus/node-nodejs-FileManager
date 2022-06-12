import { rename } from "fs/promises"

export const renameFile = async (path, fileName) => {

    try {

        await rename(path, fileName);

    } catch (err) {
        console.error('Operation failed');
    }
}