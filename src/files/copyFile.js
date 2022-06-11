import { createWriteStream, createReadStream } from "fs";
import { pipeline } from 'stream';
import { join, parse } from "path";

export const copyFile = async (toReadPath,toWritePath) => {
    const readPath = join( process.cwd(), toReadPath );
    const writePath = join( toWritePath, parse(toReadPath).base );

    const readStream = createReadStream(readPath);
    const writeStream = createWriteStream(writePath);

    await pipeline (
        readStream,
        writeStream,
        (err) => {
            if (err) console.error('Operation failed');
        }
    )
}