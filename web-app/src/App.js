import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {

  let  [meals, setMeals] = useState(null);

  useEffect(() => {
    //Temorary until we fix API issue
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => setMeals(data.message))
      .catch((error) => {
        console.log('Failed to retrieve meals.', error);
      })
  }, []);


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    // Temporary to test out the api
    const formatedData = {
      meal: data.Meal,
      qty:  data.Qty
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatedData)
    };

    fetch("http://127.0.0.1:5000/api/order", requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
      .catch((error) => {
        console.log('Failed to send POST request:', error);
      })
  }
  console.log(errors);
  return (
    <section className="App">
    <div className="title">Bistro Delivery</div>
    <div className="text-form">What is your order?</div>

    <form onSubmit={handleSubmit(onSubmit)}>

    <table>
      <tbody>
        <tr>
          <th>Meal No. </th>
          <th>Description </th>
          <th>Price</th>
          <th>Qty Avail.</th>
          <th>Order </th>
        </tr>

    		<tr>
    			<td>1</td>
    			<td>Spicy Cabbage Soup</td>
    			<td>12$ </td>
    			<td>3 </td>
    			<td>
          <select {...register("Choice_1")}>
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
    			<td>Calamari with Mushrooms</td>
    			<td>15$ </td>
    			<td>7 </td>
    			<td>
          <select {...register("Choice_2")}>
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
    			<td>Beef with Broccoli</td>
    			<td>24$</td>
    			<td>2 </td>
    			<td>
          <select {...register("Choice_3")}>
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

      <input type="submit" value="Edit order"/>
      <input type="submit" value="Send order"/>
    </form>

    <div className="footer">
      <p> &copy; Software Containerization 2022 [Group 17] </p>
    </div>

    </section>
  );
}
