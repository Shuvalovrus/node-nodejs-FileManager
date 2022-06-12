import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from 'zlib'
import {join, dirname, parse, isAbsolute} from "path";
import { pipeline } from "stream";

export const decompressFile = async (toReadPath, toWritePath) => {

    const readPath = !isAbsolute( toReadPath ) ? join(process.cwd(), toReadPath) : toReadPath

    let writePath = !isAbsolute( toWritePath ) ? join(process.cwd(), toWritePath) : toWritePath


    const unzipFileNameArr = parse(toReadPath).base.split('.')
    unzipFileNameArr.length = unzipFileNameArr.length -1;

    const unzipFileName = unzipFileNameArr.join('.');


    writePath = writePath === readPath ?

        join( dirname(toWritePath), unzipFileName) :
        join( toWritePath, unzipFileName);

    
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
