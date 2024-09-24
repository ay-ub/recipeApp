import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { div } from "framer-motion/client";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
      getVeggie();
  }, []);

  const getVeggie = async () => {
      const check = localStorage.getItem("veggie");

      if (check) {
          setVeggie(JSON.parse(check));
      } else {
          try {
              const api = await fetch(
                  `https://api.spoonacular.com/recipes/random?apiKey=7d642f5d7c774867b7ea79a7008d6c17&number=9&vegetarian`
              );
              const data = await api.json();
              
              if (data.recipes) {
                  localStorage.setItem("veggie", JSON.stringify(data.recipes)); // key  + value 
                  setVeggie(data.recipes);
                  console.log(data.recipes);
              } else {
                  console.error("No recipes found in the response:", data);
              }
          } catch (error) {
              console.error("Error fetching popular recipes:", error);
          }
      }
  };
  return (
 <div>
    <Wrapper>
    <h3>Our Vegeterian Picks</h3>
    <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "1rem"
    }}>
        {veggie.map((recipe) => (
            <SplideSlide key={recipe.id}>
                <Card>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient/>
                </Card>
            </SplideSlide>
        ))}
    </Splide>
</Wrapper>
</div>
  )
}
const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    text-align: center;
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
        bottom: 0;
        transform: translateX(-50%); 
        color: white;
        width: 100%;
        text-align: center;
        font-weight: bold;
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
    background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)); /* Stronger gradient */
`;

export default Veggie