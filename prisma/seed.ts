import { prisma } from '../src/config/database';

async function main () {
    const email = "cleberBamBam@bol.com.br"
    const password = "MariaEugenia#123"

    await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, password }
    })
}

main()
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect()
    })