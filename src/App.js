import React from "react";
import { BrowserRouter as Route, Switch, Link } from "react-router-dom";
import Home from './Home'
import PizzaForm from './PizzaForm'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content:space-between;
  margin: 2vw;
`





const App = () => {
  return (
    <div>
      <Header>
        Lambda Eats
        <div>
          <Link to='/'>
             Home
          </Link>
          <div>Help</div>          
        </div>
         
      </Header>
        <div>
          <img src = '/Pizza.jpg' alt='Big pizza'/>
          <Link to ='/pizza'>
              <button id='order-pizza'>Pizza?</button>
          </Link>
        </div>

      

      <Switch>
        <Route exact path ='/'>
          <Home/>
        </Route>
        <Route path ='/pizza'>
          <PizzaForm/>
        </Route>
      </Switch>
      </div>
  );
}



export default App;
