import React, { useState } from "react";
import FlashSales from "./FlashSales";

const ParentComponent = () => {
  const [favorites, setFavorites] = useState({});

  const handleSetFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  return <FlashSales favorites={favorites} setFavorites={handleSetFavorites} />;
};

export default ParentComponent;
