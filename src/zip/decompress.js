import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from 'zlib'
import {join, dirname, parse} from "path";
import { pipeline } from "stream";

export const decompressFile = async (toReadPath, toWritePath) => {

    const readPath = join( process.cwd(), toReadPath );

    const unzipFileNameArr = parse(toReadPath).base.split('.')
    unzipFileNameArr.length = unzipFileNameArr.length -1;

    const unzipFileName = unzipFileNameArr.join('.');

    const writePath = toWritePath === toReadPath ?

        join( process.cwd(), dirname(toWritePath), unzipFileName) :
        join( process.cwd(), toWritePath, unzipFileName);


    const readStream = createReadStream( readPath );
    const writeStream = createWriteStream( writePath );


    await pipeline(
        readStream,
        createBrotliDecompress(),
        writeStream,
        (err) => {
            if (err) console.error('Operation Failed');
        }
    )
}
