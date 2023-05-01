import React, { useState } from "react";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./style/app.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Friend from "./pages/Friend";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import background from "./assets/bg.png";

// const client = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

export default function App() {
  const bgStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
  };

  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Dashboard />;
    }
    if (currentPage === "Friends") {
      return <Friend />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    return <Home />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex-column justify-flex-start min-100-vh" style={bgStyle}>
      {/* <div> */}
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </div>
  );
}
