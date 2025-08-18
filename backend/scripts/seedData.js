const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('../models/User');
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await Book.deleteMany({});
    // await Transaction.deleteMany({});
    // console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminExists = await User.findOne({ email: 'chris@chrislibrary.com' });
    let adminUser;
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('chris123', salt);
      
      adminUser = await User.create({
        username: 'chrisadmin',
        email: 'chris@chrislibrary.com',
        password: hashedPassword,
        firstName: 'Chris',
        lastName: 'Admin',
        role: 'admin',
        isActive: true
      });
      console.log('✅ Created admin user');
    } else {
      adminUser = adminExists;
      console.log('ℹ️  Admin user already exists');
    }

    // Create regular user
    const userExists = await User.findOne({ email: 'reader@chrislibrary.com' });
    let regularUser;
    
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('reader123', salt);
      
      regularUser = await User.create({
        username: 'reader',
        email: 'reader@chrislibrary.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Reader',
        role: 'user',
        isActive: true
      });
      console.log('✅ Created regular user');
    } else {
      regularUser = userExists;
      console.log('ℹ️  Regular user already exists');
    }

    // Sample books data
    const sampleBooks = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        genre: 'Classic Literature',
        description: 'A classic American novel set in the Jazz Age',
        publisher: 'Scribner',
        publishedDate: new Date('1925-04-10'),
        pages: 180,
        availability: {
          totalCopies: 3,
          availableCopies: 3,
          issuedCopies: 0
        },
        location: {
          section: 'A',
          shelf: '1',
          floor: 'Ground'
        },
        tags: ['classic', 'american', 'jazz age'],
        addedBy: adminUser._id,
        isActive: true
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780061120084',
        genre: 'Classic Literature',
        description: 'A gripping tale of racial injustice and childhood innocence',
        publisher: 'J.B. Lippincott & Co.',
        publishedDate: new Date('1960-07-11'),
        pages: 324,
        availability: {
          totalCopies: 2,
          availableCopies: 1,
          issuedCopies: 1
        },
        location: {
          section: 'A',
          shelf: '2',
          floor: 'Ground'
        },
        tags: ['classic', 'american', 'social issues'],
        addedBy: adminUser._id,
        isActive: true
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        genre: 'Dystopian Fiction',
        description: 'A dystopian social science fiction novel',
        publisher: 'Secker & Warburg',
        publishedDate: new Date('1949-06-08'),
        pages: 328,
        availability: {
          totalCopies: 4,
          availableCopies: 2,
          issuedCopies: 2
        },
        location: {
          section: 'B',
          shelf: '1',
          floor: 'Ground'
        },
        tags: ['dystopian', 'science fiction', 'political'],
        addedBy: adminUser._id,
        isActive: true
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        isbn: '9780141439518',
        genre: 'Romance',
        description: 'A romantic novel of manners',
        publisher: 'T. Egerton',
        publishedDate: new Date('1813-01-28'),
        pages: 432,
        availability: {
          totalCopies: 2,
          availableCopies: 2,
          issuedCopies: 0
        },
        location: {
          section: 'C',
          shelf: '1',
          floor: 'Ground'
        },
        tags: ['romance', 'classic', 'british'],
        addedBy: adminUser._id,
        isActive: true
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        isbn: '9780316769174',
        genre: 'Coming-of-age Fiction',
        description: 'A controversial novel about teenage rebellion',
        publisher: 'Little, Brown and Company',
        publishedDate: new Date('1951-07-16'),
        pages: 277,
        availability: {
          totalCopies: 1,
          availableCopies: 0,
          issuedCopies: 1
        },
        location: {
          section: 'A',
          shelf: '3',
          floor: 'Ground'
        },
        tags: ['coming of age', 'american', 'controversial'],
        addedBy: adminUser._id,
        isActive: true
      }
    ];

    // Create books if they don't exist
    for (const bookData of sampleBooks) {
      const existingBook = await Book.findOne({ isbn: bookData.isbn });
      if (!existingBook) {
        await Book.create(bookData);
        console.log(`✅ Created book: ${bookData.title}`);
      } else {
        console.log(`ℹ️  Book already exists: ${bookData.title}`);
      }
    }

    // Create some sample transactions
    const books = await Book.find({}).limit(3);
    
    if (books.length > 0) {
      // Create a pending transaction
      const pendingTransaction = await Transaction.findOne({ 
        user: regularUser._id, 
        book: books[0]._id, 
        status: 'pending' 
      });
      
      if (!pendingTransaction) {
        await Transaction.create({
          user: regularUser._id,
          book: books[0]._id,
          type: 'issue',
          status: 'pending',
          notes: 'Would like to read this classic'
        });
        console.log('✅ Created pending transaction');
      }

      // Create an approved transaction
      const approvedTransaction = await Transaction.findOne({ 
        user: regularUser._id, 
        book: books[1]._id, 
        status: 'approved' 
      });
      
      if (!approvedTransaction) {
        await Transaction.create({
          user: regularUser._id,
          book: books[1]._id,
          type: 'issue',
          status: 'approved',
          issuedAt: new Date(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
          approvedBy: adminUser._id,
          notes: 'Approved for reading'
        });
        console.log('✅ Created approved transaction');
      }
    }

    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users: ${await User.countDocuments()}`);
    console.log(`📚 Books: ${await Book.countDocuments()}`);
    console.log(`📋 Transactions: ${await Transaction.countDocuments()}`);
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedData();
