const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Apollo Server
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB Connection successful");
		return server.listen({ port: process.env.PORT });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	});
