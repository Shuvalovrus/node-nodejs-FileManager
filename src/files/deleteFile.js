import { unlink } from "fs/promises";
import { isAbsolute, join } from "path";

export const deleteFile = async (path) => {
    if (!isAbsolute(path)) path = join(process.cwd(), path);

    try {
        await unlink(path)

    } catch (err) {
        console.error('Operation failed');
    }
}