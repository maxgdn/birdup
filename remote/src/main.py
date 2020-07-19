
# const id: string[] = ['0C:FC:83:2F:19:6D'];
# const hidDevice = '00001124-0000-1000-8000-00805f9b34fb';

from gql import gql, Client, AIOHTTPTransport

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="http://192.168.4.2:8080/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

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
result = client.execute(query)
print(result)