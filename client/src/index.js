import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import history from "./helpers/history";
import SongDetails from "./components/SongDetails";
import "./style/style.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<SongList />} />
          <Route path="/songs/:id" element={<SongDetails />} />
          <Route path="/songs/new" element={<SongCreate />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(<Root />);
