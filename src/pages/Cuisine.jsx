import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {  Link ,useParams } from 'react-router-dom';



function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const check = localStorage.getItem(name);

        if (check) {
            setCuisine(JSON.parse(check));
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d051999aa4f04cbf8bda18878c42746f&cuisine=${name}`);
            const recipes = await data.json();
            localStorage.setItem(name, JSON.stringify(recipes.results));
            setCuisine(recipes.results);
        }
    };

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type]);

    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {cuisine.map((recipe) => (
                   <Link to={'/recipe/'+recipe.id}>
                <Card key={recipe.id}>
                 
                    <img src={recipe.image} alt="" />
                    <h4>{recipe.title}</h4>
                   
                </Card>
                 </Link>
            ))}
        </Grid>
    );
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
    margin: 2rem 0rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine;