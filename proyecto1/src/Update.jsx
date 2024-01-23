import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function Update() {
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
             console.log(res)
             setValues({...values, nombre:res.data[0].nombre, email:res.data[0].email});
        })
        .catch(err => console.log(err))
    }, []);
    const [values, setValues] = useState({
        nombre: '',
        email: '',
        password: '',
    })
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/update/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleUpdate}>
                <h2>Actualizar Usuario</h2>
                <div className='mb-2'>
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder='Ingrese Nombre' className='form-control' value={values.nombre}
                    onChange={e => setValues({...values, nombre:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Ingrese Email' className='form-control' value={values.email}
                    onChange={e => setValues({...values, email:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Ingrese Password' className='form-control' value={values.password}
                    onChange={e => setValues({...values, password:e.target.value})}/>
                </div>
                <button className='btn btn-success'>Actualizar</button>
            </form>
        </div>
    </div>
  )
}

export default Update