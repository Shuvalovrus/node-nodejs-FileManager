import { copyFile } from "./copyFile.js";
import { deleteFile } from "./deleteFile.js";

export const moveFile = async (toCopyPath, toDestinationPath) => {
    try {
        await copyFile(toCopyPath, toDestinationPath);
        await deleteFile(toCopyPath);

    } catch (err) {
        console.error('Operation failed');
    }
}