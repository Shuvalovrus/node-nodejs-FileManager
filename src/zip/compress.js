import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from 'zlib'
import {join, parse, dirname, isAbsolute} from "path";
import { pipeline } from "stream";

export const compressFile = async (toReadPath, toWritePath) => {

    const readPath = !isAbsolute( toReadPath ) ? join(process.cwd(), toReadPath) : toReadPath

    const writePath = toWritePath === toReadPath ?

        join( process.cwd(), dirname(toWritePath) , parse(toReadPath).base + '.gz') :
        join( process.cwd(), toWritePath , parse(toReadPath).base + '.gz');



    console.log(readPath)
    console.log(writePath)

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
