const { UserInputError, PubSub } = require("apollo-server");
const pubsub = new PubSub();
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

module.exports = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");

      if (args.author && args.genre) {
        const byAuthorAndGenre = (book) =>
          book.author.name === args.author && book.genres.includes(args.genre);
        return books.filter(byAuthorAndGenre);
      } else if (args.author) {
        return books.filter((b) => b.author.name === args.author);
      } else if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      } else {
        return books;
      }
    },
    allAuthors: () => {
      console.log("Author.find"); // DEBUGGING
      return Author.find({});
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      console.log("Book.find"); // DEBUGGING
      const books = await Book.find({}).populate("author");
      return books.filter((b) => b.author.name === root.name).length;
    },
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

      // Check if author exists, if not then create a new one
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      // Create new book
      const newBook = new Book({ ...args, author });
      try {
        await newBook.save();
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

