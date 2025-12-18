const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(undefined);

async function main() {
  console.log('🌱 Seeding database...');

  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: 'J. K. Rowling',
      bio: 'British author, best known for the Harry Potter series',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'George R. R. Martin',
      bio: 'American novelist, author of A Song of Ice and Fire series',
    },
  });

  const author3 = await prisma.author.create({
    data: {
      name: 'Jane Austen',
      bio: 'English novelist known for works like Pride and Prejudice',
    },
  });

  console.log('✅ Created authors');

  // Create books
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      isbn: '9780747532699',
      publishedYear: 1997,
      authorId: author1.id,
    },
  });

  await prisma.book.create({
    data: {
      title: 'Harry Potter and the Chamber of Secrets',
      isbn: '9780747538495',
      publishedYear: 1998,
      authorId: author1.id,
    },
  });

  await prisma.book.create({
    data: {
      title: 'A Game of Thrones',
      isbn: '9780553103540',
      publishedYear: 1996,
      authorId: author2.id,
    },
  });

  await prisma.book.create({
    data: {
      title: 'A Clash of Kings',
      isbn: '9780553108033',
      publishedYear: 1998,
      authorId: author2.id,
    },
  });

  await prisma.book.create({
    data: {
      title: 'Pride and Prejudice',
      isbn: '9780141439518',
      publishedYear: 1813,
      authorId: author3.id,
    },
  });

  await prisma.book.create({
    data: {
      title: 'Sense and Sensibility',
      isbn: '9780141439662',
      publishedYear: 1811,
      authorId: author3.id,
    },
  });

  console.log('✅ Created books');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

