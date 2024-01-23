import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        nombre:'',
        email:'',
        password:'',
    })
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/usuario', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Agregar Usuario</h2>
                <div className='mb-2'>
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder='Ingrese Nombre' className='form-control' 
                    onChange={e => setValues({...values, nombre:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Ingrese Email' className='form-control' 
                    onChange={e => setValues({...values, email:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Ingrese Password' className='form-control' 
                    onChange={e => setValues({...values, password:e.target.value})}/>
                </div>
                <button className='btn btn-success'>Crear</button>
            </form>
        </div>
    </div>
  )
}

export default Create