import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./style/app.css";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import background from "./assets/bg.png";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const bgStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
  };

  return (
    <ApolloProvider client={client}>
      <div
        className="flex-column justify-flex-start min-100-vh"
        style={bgStyle}
      >
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
