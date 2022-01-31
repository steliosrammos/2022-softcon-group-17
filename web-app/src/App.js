import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/meals')
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch((error) => {
        console.log('Failed to retrieve meals.', error);
      })
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch((error) => {
        console.log('Failed to retrieve orders.', error);
      })
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    const mealsArray = [];
    let totalPrice = 0;

    const priceMap = new Map();
    for (let i = 0; i < meals.length; i++){
      priceMap.set(meals[i].id, meals[i].price);
    }

    for (const [key,value] of Object.entries(data)){
      var dict = {"id": parseInt(key), "quantity": parseInt(value)};
      mealsArray.push(dict);
      totalPrice += priceMap.get(parseInt(key)) * value;
    }

    const formatedData = {
      meals: mealsArray,
      total:  totalPrice
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatedData)
    };

    fetch("http://127.0.0.1:5000/api/orders", requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
      .catch((error) => {
        console.log('Failed to send POST request:', error);
      })
  }

  const [[showId, setShowId], [showMeals, setShowMeals], [showTotal, setShowTotal]] = [useState(), useState(), useState()];
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm();
  const onSubmitVerify = (verifyData) => {
    var orderNo = verifyData.orderNo;
    var displayTotal, displayId, displayMeals, mealString = '', orderFound = false;
    for (let order of orders){
      if (order.id == orderNo){
          orderFound = true;
          displayId = order.id;
          displayTotal = order.total;
          displayMeals = order.meals;
          for (let meal of displayMeals){
            if (meal.quantity > 0)
              mealString += '[Meal' + meal.meal_id + ' = ' + meal.quantity + '] ';
            }
        }
      }

    if (!orderFound)
      mealString = "Order not found!"

    setShowId(displayId);
    setShowTotal(displayTotal);
    setShowMeals(mealString);
  }


  console.log(errors);
  return (
    <section className="App">

    <div className="title">Bistro Delivery</div>
    <div className="text-form">What is your order?</div>

    <form key={1} onSubmit={handleSubmit(onSubmit)}>

    {meals.length > 0 ?
    <table>
      <tbody>
        <tr>
          <th>Meal No. </th>
          <th>Description </th>
          <th>Price($)</th>
          <th>Order </th>
        </tr>

    		<tr>
    			<td>1</td>
    			<td><div key={meals[0].id}> {meals[0].name} </div></td>
    			<td><div key={meals[0].id}> {meals[0].price} </div></td>
    			<td>
          <select {...register("1")}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          </td>
    		</tr>
    		<tr>
    			<td>2</td>
          <td><div key={meals[1].id}> {meals[1].name} </div></td>
    			<td><div key={meals[1].id}> {meals[1].price} </div></td>
    			<td>
          <select {...register("2")}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          </td>
    		</tr>
    		<tr>
    			<td>3</td>
          <td><div key={meals[2].id}> {meals[2].name} </div></td>
    			<td><div key={meals[2].id}> {meals[2].price} </div></td>
    			<td>
          <select {...register("3")}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          </td>
    		</tr>
      </tbody>
    </table>
    :<p>Loading</p>
  }
      <input type="submit" value="Send order"/>

    </form>

    <form key={2} onSubmit={handleSubmit2(onSubmitVerify)}>
      <input type="text" placeholder="Order ID" {...register2("orderNo", {required: true, maxLength: 100})} />
      <input type="submit" value="Check order"/>
      <table>
        <tbody>
          <tr>
            <th> Order No. </th>
            <th> Meals&Quantity</th>
            <th> Total Price($)</th>
          </tr>
          <tr>
            <td>{showId}</td>
            <td>{showMeals}</td>
            <td>{showTotal}</td>
          </tr>
        </tbody>
      </table>
    </form>


    <div className="footer">
      <p> &copy; Software Containerization 2022 [Group 17] </p>
    </div>

    </section>
  );
}
