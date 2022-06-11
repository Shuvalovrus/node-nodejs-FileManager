import { createReadStream } from "fs";
import { createHash } from 'crypto'
import { join } from "path";
import { finished } from "stream/promises";

export const calcHash = async (path) => {

        try {
            const readPath = join( process.cwd(), path );
            const readStream = createReadStream(readPath);

            readStream.on('data', (chunk) => {

                let hash = createHash('sha256');
                let updateHash = hash.update(chunk);
                let hexHash = updateHash.digest('hex');

                process.stdout.write(hexHash + '\n');

            })

            await finished(readStream);

        } catch (err) {

            console.error('Operation failed');
        }
}
