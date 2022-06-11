import { unlink } from "fs/promises";

export const deleteFile = async (path) => {

    try {
        await unlink(path)

    } catch (err) {
        console.error('Operation failed');
    }
}