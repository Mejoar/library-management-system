const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('../models/User');
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

const checkData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // Check users
    const users = await User.find({});
    console.log('\n👥 USERS:');
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.role})`);
    });

    // Check books
    const books = await Book.find({});
    console.log('\n📚 BOOKS:');
    books.forEach(book => {
      console.log(`  - ${book.title} by ${book.author}`);
    });

    // Check transactions
    const transactions = await Transaction.find({}).populate('user book');
    console.log('\n📋 TRANSACTIONS:');
    transactions.forEach(transaction => {
      console.log(`  - ${transaction.user?.email} requested "${transaction.book?.title}" (${transaction.status})`);
    });

    console.log('\n📊 SUMMARY:');
    console.log(`👥 Total Users: ${users.length}`);
    console.log(`📚 Total Books: ${books.length}`);
    console.log(`📋 Total Transactions: ${transactions.length}`);
    
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
};

// Run the checker
checkData();
