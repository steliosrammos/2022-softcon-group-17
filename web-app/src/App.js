import API_URL from './constants';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    console.log(`API_URL: ${API_URL}`);
    fetch(`${API_URL}/api/meals`)
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch((error) => {
        console.log('Failed to retrieve meals.', error);
      })
  }, []);

  const [changeMade, setChangeMade] = useState(0);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/orders`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch((error) => {
        console.log('Failed to retrieve orders.', error);
      })
  }, [changeMade]);

//submit
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

    fetch(`${API_URL}/api/orders`, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log("POST Success!");
        console.log(res);
      })
      .catch((error) => {
        console.log('Failed to send POST request:', error);
      })
    setChangeMade(changeMade+1);
  }

//check
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

  //edit
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm();
  const onEdit = (data) => {
    let mealsArrayUpdate = [];
    let totalPrice = 0;

    const priceMap = new Map();
    for (let i = 0; i < meals.length; i++){
      priceMap.set(meals[i].id, meals[i].price);
    }

    let updatedOrder = data.orderNo;
    delete data.orderNo;

    for (const [key,value] of Object.entries(data)){
      var dict = {"id": parseInt(key), "quantity": parseInt(value)};
      mealsArrayUpdate.push(dict);
      totalPrice += priceMap.get(parseInt(key)) * value;
    }

    const formatedData = {
      meals: mealsArrayUpdate,
      total: totalPrice
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatedData)
    };

    fetch(`${API_URL}/api/orders/${updatedOrder}`, requestOptions)
      .then(response => {
        if (response.status === 204){
          console.log("PUT Success!")
      }
      })
      .catch((error3) => {
        console.log('Failed to send PUT request:', error3);
      })

    setChangeMade(changeMade+1);
  }

  return (
    <section className="App">

    <div className="title">Bistro Delivery</div>
    <hr />

    <div className="grid-container">
      <div className="grid-child">
        <div className="text-form">Submit an order</div>
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
      </div>

    <div className="grid-child">
      <div className="text-form">Edit your order</div>
      <form className="edit" key={3} onSubmit={handleSubmit3(onEdit)}>
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
            <select {...register3("1")}>
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
            <select {...register3("2")}>
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
            <select {...register3("3")}>
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
        <input type="text" placeholder="Order ID" {...register3("orderNo", {required: true, maxLength: 100})} />
        <input type="submit" value="Edit order"/>

      </form>
    </div>
  </div>

    <div className="grid-child">
      <div className="text-form">Check your order</div>
      <form key={2} onSubmit={handleSubmit2(onSubmitVerify)}>
        <input type="text" placeholder="Order ID" {...register2("orderNo", {required: true, maxLength: 100})} />
        <input type="submit" value="Check order"/>
        {showMeals ?
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
        :<p></p>
      }
      </form>
    </div>

    <div className="footer">
      <p> &copy; Software Containerization 2022 [Group 17] </p>
    </div>

    </section>
  );
}
