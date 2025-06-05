/**
 * Provides a Prisma select object for retrieving user data with nested address, geo, and company fields.
 *
 * Use this object in Prisma queries to select only the necessary fields for user responses.
 */

export const userSelect = {
  userId: true,
  username: true,
  phone: true,
  website: true,
  address: {
    select: {
      street: true,
      suite: true,
      city: true,
      zipcode: true,
      geo: {
        select: {
          lat: true,
          lng: true,
        },
      },
    },
  },
  company: {
    select: {
      name: true,
      catchPhrase: true,
      bs: true,
    },
  },
};
