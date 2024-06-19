import { prisma } from "../src/config/prisma";


async function seed() {

    await prisma.user.createMany({
        data: [
            {
                name: "Alék Doe",
                email: "alekdoe@gmail.com",

            },
            {
                name: "Darren Korb",
                email: "darrenkorb@gmail.com",
            },
            {
                name: "Ryan Dahl",
                email: "ryandahl@gmail.com",
            }
        ]
    })
}

seed().then(() => {
    console.log("Database Seeded!🍃")
}
)
