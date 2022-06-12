import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from 'zlib'
import { join, parse, dirname, isAbsolute } from "path";
import { pipeline } from "stream";

export const compressFile = async (toReadPath, toWritePath) => {


    const readPath = !isAbsolute( toReadPath ) ? join(process.cwd(), toReadPath) : toReadPath

    let writePath = !isAbsolute( toWritePath ) ? join(process.cwd(), toWritePath) : toWritePath


    writePath = readPath === writePath ?

        join( dirname(toWritePath) , parse(toReadPath).base + '.gz') :
        join( toWritePath , parse(toReadPath).base + '.gz');


    const readStream = createReadStream( readPath );
    const writeStream = createWriteStream( writePath );


    await pipeline(
        readStream,
        createBrotliCompress(),
        writeStream,
        (err) => {
            if (err) console.error('Operation Failed');
        }
    )
}
