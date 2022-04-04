import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Popular = () => {
  // usestate, empty array is going to recibe random recipes in setPopular
  const [popular, setPopular] = useState([]);

  // make the api request to get recipies once the page is load
  useEffect(() => {
    getPopular();
  }, []);

  // Get popular recipies from api async function
  const getPopular = async () => {
    // store recipes into local storage, check for 'popular' pre saved in local storage
    const check = localStorage.getItem("popular");
    // Check if there is something storage in local storage, if not, save it
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      // Request to api, need apiKey and number of recipies i want to get
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      // Process api info to json()
      const data = await api.json();

      // generate localstorage 'popular'
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      // .stringify --- in local storage you can only save strings

      // Get random recipes from json data
      setPopular(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            paginations: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

// STYLED COMPOONENTS -----------------------------

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 14rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
