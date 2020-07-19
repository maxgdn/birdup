import { GraphQLClient } from 'graphql-request';

const endpoint = "http://192.168.4.2:8080/graphql";

const graphQLClient = new GraphQLClient(endpoint, {
  })

const captureQuery = `{
    mutation {
        capture {
            id
        }
    }
}`;

const capture = async () => {
    return await graphQLClient.request(captureQuery);
}; 

export {capture};


