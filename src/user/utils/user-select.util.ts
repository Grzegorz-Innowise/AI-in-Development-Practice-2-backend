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
