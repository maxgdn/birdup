from gql import gql, Client, AIOHTTPTransport


class GQLClient:
    def __init__(self):
        # Select your transport with a defined url endpoint
        transport = AIOHTTPTransport(url="http://192.168.4.2:8080/graphql")
        # Create a GraphQL client using the defined transport
        self.client = Client(transport=transport, fetch_schema_from_transport=True)
    def capture(self):
        # Provide a GraphQL query
        query = gql(
        """
        mutation CapturePhoto {
            capture {
                id
            }
        }
        """
        )

        # Execute the query on the transport
        result = self.client.execute(query)
        print(result)
