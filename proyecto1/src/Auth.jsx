import axios from 'axios'
import React from 'react'

function Auth() {

const handleAuth = () => {
    axios.get('http://localhost:8081/checkauth', {
        headers: {
            'access-token' : localStorage.getItem("token")
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err)); 
}

  return (
    <div>
        <h1>AUTH</h1>
        <button onClick={handleAuth} className='btn btn-primry'>CheckAuth</button>
    </div>
  )
}

export default Auth