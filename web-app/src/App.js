import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    // Temporary to test out the api
    const formatedData = {
      fname: data.Name,
      lname:  data.Email
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatedData)
    };

    fetch("http://127.0.0.1:5000/api/people", requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
      .catch((error) => {
        console.log('Failed to send POST request:', error);
      })
  }
  console.log(errors);
  return (
    <section>
    <div className="title">BOOKLET.</div>
    <div className="text-form">Are you looking for a book? Get inspired.</div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("Name", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <select {...register("Choice")}>
        <option value="Action&Adventure">Action&Adventure</option>
        <option value="Fantasy"> Fantasy</option>
        <option value=" Classics"> Classics</option>
        <option value=" Detective&Mistery"> Detective&Mistery</option>
        <option value=" Historical Fiction"> Historical Fiction</option>
        <option value=" Romance"> Romance</option>
        <option value=" Science Fiction (Sci-Fi)"> Science Fiction (Sci-Fi)</option>
        <option value=" Suspense&Thrillers"> Suspense&Thrillers</option>
        <option value=" Biographies and Autobiographies"> Biographies and Autobiographies</option>
      </select>

      <input type="submit" value="Send"/>
    </form>

    <div className="footer">
      <p> &copy; Software Containerization 2022 [Group 17] </p>
    </div>

    </section>
  );
}
