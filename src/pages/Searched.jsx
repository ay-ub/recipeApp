import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

function Searched() {
    let params = useParams();
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSearched = async (name) => {
        const check = localStorage.getItem(name);

        if (check) {
            setSearchedRecipes(JSON.parse(check));
            setLoading(false);
        } else {
            try {
                const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d051999aa4f04cbf8bda18878c42746f&query=${name}`);
                const recipes = await data.json();
                localStorage.setItem(name, JSON.stringify(recipes.results));
                setSearchedRecipes(recipes.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        getSearched(params.search);
    }, [params.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid>
            {searchedRecipes.map((recipe) => (
               <Link to={'/recipe/' + recipe.id }>
                <Card key={recipe.id}>
                    <img src={recipe.image} alt="" />
                    <h4>{recipe.title}</h4>
                </Card>
                </Link>
            ))}
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched;