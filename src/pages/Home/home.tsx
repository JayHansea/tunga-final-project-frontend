import React from "react";
import { Card } from "~/components/Card";
import { Navbar } from "~/components/Navbar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pb-8 px-4 lg:px-0">
        <Card />
      </div>
    </>
  );
};

export default Homepage;
