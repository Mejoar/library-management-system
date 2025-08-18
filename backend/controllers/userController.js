const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('issuedBooks.bookId', 'title author');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phoneNumber, address },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's transactions
// @route   GET /api/users/transactions
// @access  Private
const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate('book', 'title author coverImage')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single user (Admin only)
// @route   GET /api/users/:id
// @access  Private (Admin)
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('issuedBooks.bookId', 'title author');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const transactions = await Transaction.find({ user: user._id })
      .populate('book', 'title author')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ user, transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private (Admin)
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, role, isActive, phoneNumber, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, role, isActive, phoneNumber, address },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has active book issues
    const activeTransactions = await Transaction.countDocuments({
      user: user._id,
      status: 'approved',
      returnedAt: { $exists: false }
    });

    if (activeTransactions > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete user with active book issues. Please return all books first.' 
      });
    }

    // Soft delete - deactivate user instead of actually deleting
    user.isActive = false;
    await user.save();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get dashboard statistics (Admin only)
// @route   GET /api/users/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    console.log('Dashboard stats endpoint hit by user:', req.user._id);
    console.log('User role:', req.user.role);
    
    // Get all statistics in parallel for better performance
    const [totalUsers, totalBooks, allBooks, transactions] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Book.countDocuments({ isActive: true }),
      Book.find({ isActive: true }).select('availability totalCopies'),
      Transaction.find({})
    ]);
    
    console.log('Raw data:', {
      totalUsers,
      totalBooks,
      booksCount: allBooks.length,
      transactionsCount: transactions.length
    });
    
    // Calculate available books (sum of all available copies)
    let availableBooks = 0;
    let totalCopies = 0;
    
    allBooks.forEach(book => {
      if (book.availability) {
        const available = book.availability.availableCopies || 0;
        const total = book.availability.totalCopies || 0;
        availableBooks += available;
        totalCopies += total;
        console.log(`Book: ${book._id}, Available: ${available}, Total: ${total}`);
      }
    });
    
    // Calculate pending requests
    const pendingRequests = transactions.filter(t => t.status === 'pending').length;
    
    // Calculate active issues (approved issue transactions that haven't been returned)
    const activeIssues = transactions.filter(t => 
      t.status === 'approved' && t.type === 'issue' && !t.returnedAt
    ).length;
    
    // Get recent transactions for admin dashboard
    const recentTransactions = await Transaction.find({})
      .populate('user', 'firstName lastName email')
      .populate('book', 'title author')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    
    const stats = {
      totalUsers,
      totalBooks,
      availableBooks,
      pendingRequests,
      activeIssues,
      totalTransactions: transactions.length,
      recentTransactions
    };
    
    console.log('Final dashboard stats:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      details: 'Check server logs for more information'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getMyTransactions,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getDashboardStats
}; 