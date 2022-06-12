import { createReadStream } from 'fs';
import { finished } from 'stream/promises'
import { join } from "path";

export const readFile = async (file) => {
    try {
        const streamPath = join( process.cwd(), file );

        const readStream = createReadStream(streamPath);

        readStream.on('data', (chunk) => process.stdout.write(chunk + '\n'));

        await finished(readStream);

    } catch (err) {
        console.error('Operation failed');
    }
}