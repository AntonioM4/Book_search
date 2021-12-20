const mongoose = require('mongoose');
// testing comment
console.log("testing comment");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Book_search', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
