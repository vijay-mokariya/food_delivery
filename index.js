require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const httpError = require('./utils/HttpError');
const logger = require('morgan');

app.use(cors());

// const bodyparser = require('body-parser');
// app.use(bodyparser.json());

app.use(express.json());
app.use(logger('dev'));

app.set('view engine', 'ejs');

app.use('/api/v1', require('./routes/index.routes'));

// app.use((error, req, res, next) => {
//     res.status(500).end(error.message);
//     console.log(error);
// });

app.use(require('./middlewares/errorHandler'));

app.listen(process.env.PORT, () => {
    require('./services/database')
    console.log(`connected on port number ${process.env.PORT}`)
});


/*
use of graphQL

step 1:- 
        npm i express-graphql graphql axios
step 2:-
        const { buildSchema } = require('graphql');
        const { graphqlHTTP } = require('express-graphql');
        const axios = require('axios');
step 3:- use 

        let message = "hello world"
        
        const schema = buildSchema(`
        type post{
          userId:Int
          id:Int
                 title:String
          body:String
        }

        type user {
          name:String
          age:Int
          colleage:String
        }

        type Query{
          hello:String
          welcomeMessage(name:String!):String
          getuser:user
          getusers:[user]
          getPostsFromExternalAPI:[post]
          message:String
        }

        input userInput{
          name:String!
          age:Int!
          colleage:String!
        }

        type Mutation{
          setMessage(newMessage:String):String
          createUser(user:userInput):user
        }
        `);

        const root = {
          hello: () => {
            return 'Hello World!';
          },
          welcomeMessage: (args) => {
            return `hy ${args.name}, welcome`
          },
          getuser: () => {
            const user = {
              name: "raj",
              age: 22,
              colleage: "r.v patel"
            };
            return user;
          },
          getusers: () => {
            const users = [
              {
                name: "raj",
                age: 22,
                colleage: "r.v patel"
              },
              {
                name: "rajveer",
                age: 22,
                colleage: "r.v patel"
              }
            ]
            return users;
          },
          getPostsFromExternalAPI: () => {
            return axios.get('https://jsonplaceholder.typicode.com/posts').then(result => result.data)
          },
          setMessage: ({ newMessage }) => {
            message = newMessage;
            return message;
          },
          message: () => message,
          createUser: (args) => {
            return args.user;
          }
        };

        app.use('/graphql', graphqlHTTP({
          graphiql: true,
          schema: schema,
          rootValue: root
        }))


*/