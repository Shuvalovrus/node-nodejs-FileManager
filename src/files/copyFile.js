import { createWriteStream, createReadStream } from "fs";
import { pipeline } from 'stream';
import { isAbsolute, join, parse } from "path";

export const copyFile = async (toReadPath,toWritePath) => {

    if (!isAbsolute(toReadPath)) toReadPath = join(process.cwd(), toReadPath);
    toWritePath = join( toWritePath, parse(toReadPath).base) ;


    const readStream = createReadStream(toReadPath);
    const writeStream = createWriteStream(toWritePath);

    await pipeline (
        readStream,
        writeStream,
        (err) => {
            if (err) console.error('Operation failed');
        }
    )
}