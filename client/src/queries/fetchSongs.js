import { gql } from "@apollo/client";

export const SONG_QUERY = gql`
  query SongQuery {
    songs {
      title
      id
    }
  }
`;
