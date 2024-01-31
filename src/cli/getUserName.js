export const getUserName = () => {

    let result = 'Stranger';

    process.argv.forEach((item) => {

        const name = item.split('=').pop();

        if (item.startsWith('--username')) result = name ? result : name;

    })

    return result;
}
