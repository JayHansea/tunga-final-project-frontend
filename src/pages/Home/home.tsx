import React from "react";
import { Card } from "~/components/Card";
import { Navbar } from "~/components/Navbar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <Card />
      </div>
    </>
  );
};

export default Homepage;
