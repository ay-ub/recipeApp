import React from 'react'
import { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

function Search() {
             const [input, setInput] = useState(''); 
            const navigate = useNavigate();
        const submitHandler = (e) => {
        e.preventDefault();
        navigate('searched/'+input);

        }


  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
           <FaSearch></FaSearch>
        <input onChange={(e) =>setInput(e.target.value)} type="text" value={input}/> 
         </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
        margin: 0 auto;
        margin-top:50px;
    div {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }
        svg{
        position: absolute;
        top: 40%;
        left: 1rem;
        transform: translateY(0,-50%);
        color:white;

        }
`
export default Search