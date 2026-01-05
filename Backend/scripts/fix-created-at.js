const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixCreatedAtFields() {
  try {
    // Use raw MongoDB query to update null createdAt fields
    const result = await prisma.$runCommandRaw({
      update: "Listing",
      updates: [
        {
          q: { createdAt: null },
          u: { $set: { createdAt: new Date() } },
          multi: true
        }
      ]
    });

    console.log('Updated records with null createdAt:', result);
  } catch (error) {
    console.error('Error fixing createdAt fields:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCreatedAtFields();