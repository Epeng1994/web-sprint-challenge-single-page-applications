import React from "react";
import {useEffect} from 'react'
import { BrowserRouter as Route, Switch, Link } from "react-router-dom";
import Home from './Home'
import PizzaForm from './PizzaForm'
import styled from 'styled-components'
import Confirmation from './Confirmation'


const Header = styled.div`
  display: flex;
  justify-content:space-between;
  margin: 2vw;
`

const PizzaPie = styled.img`
  height: 43.5vw;
  display:inline;
`

const Options = styled.div`
  margin-left:20px;
`

const MainImgBox = styled.div`
  position: relative;
`

const OrderBttn = styled.button`
  position: absolute;
  left:45%;
  top:80%;
  padding: 2vw;
`

const App = () => {
  useEffect(()=>{
    console.log('here')
  })
  return (
    <div>
      <Header>
        <div>
          Lambda Eats
        </div>
        <Options>
          <Link to='/'>
            Home
          </Link>
          <Link to='/confirmation'>
            Confirmation
          </Link>
        </Options>
      </Header>

        <MainImgBox>
          <PizzaPie src = '/Pizza.jpg' alt='Big pizza'/>
          <Link to ='/pizza'>
              <OrderBttn id='order-pizza'>Order now!</OrderBttn>
          </Link>
        </MainImgBox>

      

      <Switch>

        <Route exact path ='/'>
          <Home/>
        </Route>

        <Route path ='/pizza'>
          <PizzaForm/>
        </Route>

        <Route exact path='/confirmation'>
          <Confirmation/>
        </Route>

      </Switch>
      </div>
  );
}



export default App;
