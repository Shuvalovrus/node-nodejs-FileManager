import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from 'zlib'
import { join, parse, dirname } from "path";
import { pipeline } from "stream";

export const compressFile = async (toReadPath, toWritePath) => {

    const readPath = join( process.cwd(), toReadPath );

    const writePath = toWritePath === toReadPath ?

        join( process.cwd(), dirname(toWritePath) , parse(toReadPath).base + '.gz') :
        join( process.cwd(), toWritePath , parse(toReadPath).base + '.gz');


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
