import * as readline from 'node:readline';
import { getUserName } from './src/cli/getUserName.js';
import { goUpDirectory,goToDirectory, getListDirectory } from "./src/nav/navigation.js";
import { readFile } from "./src/files/readFile.js";
import { createFile } from "./src/files/createFile.js";
import { renameFile } from "./src/files/renameFile.js";
import { copyFile } from "./src/files/copyFile.js";
import { moveFile } from "./src/files/moveFile.js";
import { osCommandHandler } from "./src/os/os.js";
import { calcHash } from "./src/hash/calcHash.js";
import { compressFile } from "./src/zip/compress.js";
import { decompressFile } from "./src/zip/decompress.js";
import { deleteFile } from "./src/files/deleteFile.js";

const { stdin, stdout, cwd } = process;
const homeDirectory = process.env["HOME"];
const userName = getUserName();
const readLineInterface = readline.createInterface({ input: stdin, output: stdout });

const printCurrentDir = () => process.stdout.write(`You are currently in ${cwd()}\n`);

(function sayHi () {
    process.chdir(homeDirectory);
    stdout.write(`Welcome to the File Manager, ${userName}!\n`);
    stdout.write(`You are currently in ${cwd()}\n`);
})();


readLineInterface.on('line', async (line) => {

    const path = line.split(' ').slice(1);
    const pathFile = path[0] || false;
    const fileName = path[1] || false;
    const pathDestination = path[1] || path[0];

    const command = line.split(' ')[0];

    switch (command) {
        case 'up' :
            await goUpDirectory();
            printCurrentDir();
           break;
        case 'cd' :
            await goToDirectory(pathFile);
            printCurrentDir();
            break;
        case 'ls' :
            await getListDirectory();
            printCurrentDir();
            break;
        case 'cat' :
            await readFile(pathFile);
            printCurrentDir();
            break;
        case 'add' :
            await createFile(pathFile);
            printCurrentDir();
            break;
        case 'rn' :
            await renameFile(pathFile, fileName);
            printCurrentDir();
            break;
        case 'cp' :
            await copyFile(pathFile, pathDestination);
            printCurrentDir();
            break;
        case 'mv' :
            await moveFile(pathFile, pathDestination);
            printCurrentDir();
            break;
        case 'rm' :
            await deleteFile(pathFile);
            printCurrentDir();
            break;
        case 'os' :
            await osCommandHandler(pathFile);
            printCurrentDir();
            break;
        case 'hash' :
            await calcHash(pathFile);
            printCurrentDir();
            break;
        case 'compress' :
            await compressFile(pathFile, pathDestination);
            printCurrentDir();
            break;
        case 'decompress' :
            await decompressFile(pathFile, pathDestination);
            printCurrentDir();
            break;
        case '.exit' :
            process.exit();
            break;
        default:
            process.stdout.write('Invalid input\n');
            printCurrentDir();
    }

})

process.on('exit', () => process.stdout.write(`Thank you for using File Manager, ${userName}!`));
process.on('SIGINT', () => process.exit());
