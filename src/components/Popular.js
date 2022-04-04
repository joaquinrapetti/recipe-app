import React, { useEffect, useState } from "react";

const Popular = () => {
  // usestate, empty array is going to recibe random recipes in setPopular
  const [popular, setPopular] = useState([]);

  // make the api request to get recipies once the page is load
  useEffect(() => {
    getPopular();
  }, []);

  // Get popular recipies from api
  const getPopular = async () => {
    // Request to api, need apiKey and number of recipies i want to get
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    // Process api info to json()
    const data = await api.json();
    // Get random recipes from json data
    setPopular(data.recipes);
  };

  return (
    <div>
      {popular.map((recipe) => {
        return <div key={recipe.id}>{recipe.title}</div>;
      })}
    </div>
  );
};

export default Popular;
