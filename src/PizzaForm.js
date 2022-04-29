import {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import Confirmation from './Confirmation'
import * as yup from 'yup'
import axios from 'axios'



function PizzaForm (){
    const emptyForm = {
        name: '',
        size: '',
        sauce: '',
        toppings: [],
        special: '',
    }

    const [currentOrder, setCurrentOrder]= useState(emptyForm)
    const [errors, setErrors] = useState({
        name: '',
        size: '',
        sauce: '',
        toppings: '',
        special: '',
    })


    const schema = yup.object().shape({
        name: yup.string().required('name must be at least 2 characters').min(2,'name must be at least 2 characters'),
        size: yup.string().oneOf(['small','medium','large'],'Please select a valid size'),
        sauce: yup.string().oneOf(['Original Red','Garlic Ranch','BBQ Sauce','Spinach Alfredo'],'Please choose a sauce'),
        toppings: yup.array(),
        special: yup.string(),
    })



    const validate = (name, value) =>{
        yup.reach(schema, name).validate(value)
            .then(()=>{
                setErrors({...errors,[name]:''})
            })
            .catch(err=>{
                setErrors({...errors,[name]:err.errors[0]})
            })

    }


    const onChange = (evt) =>{
        const {name, value} = evt.target
        let toppingList = currentOrder.toppings
        validate(name, value)

        if(name === 'toppings' && currentOrder.toppings.length < 4){
            toppingList.push(value)
            setCurrentOrder({...currentOrder, [name]:toppingList})
        }
        if(name !== 'toppings'){
            setCurrentOrder({...currentOrder, [name]:value})
        }
        console.log(errors)
    }


    const postOrder = ()=>{
        const newOrder = {
            name: currentOrder.name,
            size: currentOrder.size,
            sauce: currentOrder.sauce,
            toppings: currentOrder.toppings,
            special: currentOrder.special,
        }
        axios.post('https://reqres.in/api/orders',newOrder)
            .then(()=>{
                console.log('sent to server')
                setCurrentOrder(emptyForm)
            })
            .catch(()=>{
                console.log('oops')
            })
    }


    const onSubmit = (evt) =>{
        evt.preventDefault();
        postOrder()
    }

    return(
        <div>
            <form id='pizza-form' onSubmit={onSubmit}>Build Your Own Pizza
                <div>
                    <label/>Enter your name
                    <input type='text' id='name-input' name = 'name' onChange = {onChange} value ={currentOrder.name}/>
                    <div>{errors.name}</div>
                </div>
                <div>
                    <label/> Choice of Size
                    <select id = 'size-dropdown' name = 'size' onChange = {onChange}>
                        <option>--Option--</option>
                        <option value = 'small'>Small</option>
                        <option value = 'medium'>Medium</option>
                        <option value = 'large'>Large</option>
                    </select>
                    <div>{errors.size}</div>
                </div>
                <div>
                    <label to='sauce'/>Choice of sauce
                    <input type = 'radio' name = 'sauce' value ='Original Red' onChange = {onChange}/> Original Red 
                    <input type = 'radio' name = 'sauce' value ='Garlic Ranch' onChange = {onChange}/> Garlic Ranch
                    <input type = 'radio' name = 'sauce' value ='BBQ Sauce' onChange = {onChange}/> BBQ Sauce
                    <input type = 'radio' name = 'sauce' value ='Spinach Alfredo' onChange = {onChange}/> Spinach Alfredo
                    <div>{errors.sauce}</div>
                </div>
                <div>
                    <label to='toppings'/>Add Toppings
                    <input type='checkbox' name = 'toppings' value='Pepperoni' onChange = {onChange}/>Pepperoni
                    <input type='checkbox' name = 'toppings' value='Sausage' onChange = {onChange}/>Sausage
                    <input type='checkbox' name = 'toppings' value='Canadian Bacon' onChange = {onChange}/>Canadian Bacon
                    <input type='checkbox' name = 'toppings' value='Spicy Italian Sausage' onChange = {onChange}/>Spicy Italian Sausage
                    <input type='checkbox' name = 'toppings' value='Grilled Chicken' onChange = {onChange}/>Grilled Chicken
                    <input type='checkbox' name = 'toppings' value='Onions' onChange = {onChange}/>Onion
                    <input type='checkbox' name = 'toppings' value='Green Pepper' onChange = {onChange}/>Green Pepper
                    <input type='checkbox' name = 'toppings' value='Diced Tomatoes' onChange = {onChange}/>Diced Tomatoes
                    <input type='checkbox' name = 'toppings' value='Black Olives' onChange = {onChange}/>Black Olives
                    <input type='checkbox' name = 'toppings' value='Roasted Garlic' onChange = {onChange}/>Roasted Garlic
                    <input type='checkbox' name = 'toppings' value='Artichoke Hearts' onChange = {onChange}/>Artichoke Hearts
                    <input type='checkbox' name = 'toppings' value='Three Cheeses' onChange = {onChange}/>Three Cheeses
                    <input type='checkbox' name = 'toppings' value='Pineapple' onChange = {onChange}/>Pineapple
                    <input type='checkbox' name = 'toppings' value='Extra Cheese' onChange = {onChange}/>Extra Cheese
                    <div>{errors.toppings}</div>
                </div>
                <div>
                    <label to='substitute'/>
                    <input/>
                </div>
                <div>
                    <label to='special-text'/>Special Instructions
                    <input id ='special-text' name = 'special' type='text' onChange = {onChange} value ={currentOrder.special}/>
                    <div>{errors.special}</div>
                </div>
         
                    <button type='submit' id='order-button'>Add to Order</button>
        
                <Route path='/pizza/confirmation'>
                    <Confirmation/>
                </Route>
            </form>


        </div>
    )
}

export default PizzaForm