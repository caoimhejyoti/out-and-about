import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./style/app.css";

import Home from "./components/Home";
import Dashboard from "./components/pages/Dashboard";
import Friend from "./components/pages/Friend";
import Profile from "./components/pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import background from "./assets/bg.png";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const bgStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
  };

  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Dashboard") {
      return <Dashboard />;
    }
    if (currentPage === "Friends") {
      return <Friend />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    return <Profile />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <div
        className="flex-column justify-flex-start min-100-vh"
        style={bgStyle}
      >
        <Header currentPage={currentPage} handlePageChange={handlePageChange} />
        <div className="container">{renderPage()}</div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}
