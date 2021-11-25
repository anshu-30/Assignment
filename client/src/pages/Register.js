import { useState } from 'react'
import {useNavigate} from 'react-router-dom';


function Register() {
  const history  = useNavigate();
  const [firstname,setfirstname] = useState('')
  const [lastname,setlastname] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [date,setdate] = useState('')
  const [phone,setphone] = useState('')

  async function registerUser(e){
    e.preventDefault();
    //connecting to backend.
    const response = await fetch('http://localhost:1337/api/register', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        firstname,
        lastname,
        email,
        password,
        date,
        phone,
      }),
    })
    const data = await response.json()
    if(data.status === 'ok'){
      window.location.href = '/login'
    }
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input value={firstname}
          onChange={(e) => setfirstname(e.target.value)}
          type="text" 
          placeholder="First Name" 
        />
        <br />
        <input value={lastname}
          onChange={(e) => setlastname(e.target.value)}
          type="text" 
          placeholder="Last Name" 
        />
        <br />
        <input value={email}
          onChange={(e) => setemail(e.target.value)}
          type="email" 
          placeholder="Email id"
        />
        <br />
        <input value={password}
          onChange={(e) => setpassword(e.target.value)}
          type="password" 
          placeholder="Password"  
        />
        <br />
        <input value={date}
          onChange={(e) => setdate(e.target.value)}
          type="date" 
          placeholder="Date of birth" 
        />
        <br />
        <input value={phone}
          onChange={(e) => setphone(e.target.value)}
          type="number" 
          placeholder="Phone number" 
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
