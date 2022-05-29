import { gql } from "@apollo/client";

export const SONG_BY_ID_QUERY = gql`
  query getSongById($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
