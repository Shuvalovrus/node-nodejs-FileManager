import * as os from "os";


export const osCommandHandler = async (arg) => {

    switch (arg) {
        case '--EOL' :
            process.stdout.write(JSON.stringify(os.EOL) + '\n');
            break;

        case '--cpus' :
            process.stdout.write(`Total: ${ os.cpus().length + '\n' }`);

            os.cpus().forEach((item) => process.stdout.write(`Model: ${ item.model } Speed: ${ item.speed / 1000 } GHz\n`));
            break;

        case '--homedir' :
            process.stdout.write(os.homedir() + '\n');
            break;

        case '--username' :
            process.stdout.write(os.userInfo().username + '\n');
            break;

        case '--architecture' :
            process.stdout.write(os.arch() + '\n');
            break;

        default:
            console.error('Operation Failed');
    }
}



