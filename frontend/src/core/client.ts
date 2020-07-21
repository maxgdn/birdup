import { GraphQLClient } from 'graphql-request'

import Sighting from './domain/Sighting';
import Bird from './domain/Bird';

const endpoint = 'http://localhost/graphql';

const imageUrl = 'http://localhost/fetch';

const graphQLClient = new GraphQLClient(endpoint, {});

const failedReq = new Error('Request failed');

export const allSightings = async (): Promise<Sighting[]> => {
    const query =`
      {
        allSightings {
          id
          capturedDate
          birds {
            id
          }
        }
      }
    `;

    try {
        const data = await graphQLClient.request<any>(query);
        return data.allSightings;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const getSighting = async (id: string): Promise<Sighting> => {
    const query =`
        query getSighting($id: String!) {
            getSighting(sightingId: $id) {
                id
                capturedDate
                birds {
                    id
                }
            }
        }
    `;

    try {
        const data = await graphQLClient.request<any>(query, {id});
        console.log(data);
        return data.getSighting;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const capture = async (): Promise<string> => {
    const mutation =`
    mutation capture {
      capture {
        id
      }
    }
    `;

    try {
        const data = await graphQLClient.request<any>(mutation);
        return data.capture.id;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const addBird = async (sightingId: string, birdId: string): Promise<Bird[]> => {
    const mutation =`
      mutation AddBird($sightingId: String!, $birdId: String!) {
        addBird(sightingId: $sightingId, birdId: $birdId) {
            birds {
                id
            }
        }
      }
    `;

    try {
        const data = await graphQLClient.request<Bird[]>(mutation, {sightingId, birdId});
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const removeBird = async (sightingId: string, birdId: string): Promise<Sighting> => {
    const mutation =`
      mutation RemoveBird($sightingId: String!, $birdId: String!) {
        removeBird(sightingId: $sightingId, birdId: $birdId) {
          id
        }
      }
    `;

    try {
        const data = await graphQLClient.request<Sighting>(mutation, {sightingId, birdId});
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const allBirds = async (): Promise<Bird[]> => {
    const query =`
    {
        allBirds {
          id
          genusName
          name
          sightings {
            id
          }
        }
      }
    `;

    try {
        const data = await graphQLClient.request<Bird[]>(query);
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const getBird = async (id: string): Promise<Bird> => {
    const query =`
    query getBird($id: String!) {
        getBird(birdId: $id) {
          id
          genusName
          name
          sightings {
            id
          }
        }
      }
    `;

    try {
        const data = await graphQLClient.request<Bird>(query, {id});
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const getSightingsByBird = async (id: string): Promise<Sighting[]> => {
    const query =`
      query getSightingsByBird($id: String!) {
        getSightingsByBird(birdId: $id) {
          id
          capturedDate
        }
      }
    `;

    try {
        const data = await graphQLClient.request<Sighting[]>(query, {id});
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const createBird = async (genusName: string, name: string): Promise<Bird> => {
    const mutation =`
    mutation CreateBird($genusName: String!, $name: String!) {
        createBird(genusName: $genusName, name: $name) {
          id
          genusName
          name
          sightings {
            id
          }
        }
      }
    `;

    try {
        const data = await graphQLClient.request<Bird>(mutation, {genusName,name});
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const deleteBird = async (id: string): Promise<Bird> => {
    const mutation =`
        mutation DeleteBird($id: String!) {
            deleteBird(id: $id) {
            id
            }
        }
    `;

    try {
        const data = await graphQLClient.request<Bird>(mutation, {id});
        return data;
    } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        throw failedReq;
    }
}

export const fetchImage = async (id: string): Promise<string> => {
  const response = await fetch(imageUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  });

  const imgData: any = await response.json();
  return imgData.file;
}
