import { gql } from "@apollo/client";

export const DELETE_SONG_QUERY = gql`
  mutation DeleteSongQuery($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;
