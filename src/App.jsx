import Pages from "./pages/Pages"
import Category from "./components/Category"
import { BrowserRouter as Router } from "react-router-dom";
import Search from "./components/Search";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
function App() {

  return (
    
    <div className="App">
      <Router>
      <Nav> 
        <Logo to="/">RecipeZ</Logo>
        <GiKnifeFork/>
      </Nav>
        <Search/>
      <Category/>
      <Pages/>
      </Router>
    </div>
  )
}

const Logo = styled(Link)`
text-decoration: none;
font-size : 1.5rem  ;
font-weight:400;
font-family : Lobster Two , cursive;

`
const Nav = styled.div`
padding: 4rem 0rem ;
display : flex;
justify-content: flex-start;
align-items: center;
  svg {
    font-size: 2rem;
    color: #f27121;
  }

`


export default App
