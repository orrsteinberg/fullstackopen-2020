const { UserInputError, PubSub } = require("apollo-server");
const pubsub = new PubSub();
const Book = require("./models/Book");
const Author = require("./models/Author");

module.exports = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author");
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: { $in: author.id } }).populate(
          "author"
        );
      } else if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate(
          "author"
        );
      } else {
        return await Book.find({}).populate("author");
      }
    },
    allAuthors: () => {
      return Author.find({}).populate("books");
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // Check if user is logged in
      if (!currentUser) {
        throw new UserInputError("You must be logged in to add a new book");
      }

      // Check if book already exists
      const bookAlreadyExists = await Book.findOne({ title: args.title });
      if (bookAlreadyExists) {
        throw new UserInputError("Book title must be unique", {
          invalidArgs: args,
        });
      }

      let book;
      let author;

      try {
        // Check if author exists, if not then create a new one
        author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({ name: args.author });
        }

        // Create and save new book
        newBook = new Book({ ...args, author });
        const savedBook = await newBook.save();

        // Add book to author's list of books and save new/updated author
        author.books = author.books.concat(savedBook._id);
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      // Publish subscription
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new UserInputError("You must be logged in to edit an author");
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new UserInputError("Author not found");
        return null;
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args });

      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return newUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      // Return a new token with the key 'value' and the token value,
      // just like the schema
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
