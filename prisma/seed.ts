import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  for (const user of users) {
    const newUser = await prisma.userAuth.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: 'defaultHashedPassword123',
      },
    });

    await prisma.user.create({
      data: {
        userId: newUser.id,
        username: user.username,
        phone: user.phone,
        website: user.website,
        address: {
          create: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
              create: {
                lat: user.address.geo.lat,
                lng: user.address.geo.lng,
              },
            },
          },
        },
        company: {
          create: {
            name: user.company.name,
            catchPhrase: user.company.catchPhrase,
            bs: user.company.bs,
          },
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log('✅ Seed completed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
