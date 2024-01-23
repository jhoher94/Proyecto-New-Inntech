import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Read() {
    const {id} = useParams();
    const [usuario, setUsuario] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/read/'+ id)
        .then(res => {
             console.log(res)
             setUsuario(res.data);
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
         <div className='w-50 bg-white rounded p-3'>
            <div className='p-2'>
            <h2>Detalles Usuario</h2>
            <h2>{usuario.id}</h2>
            <h2>{usuario.nombre}</h2>
            <h2>{usuario.email}</h2>
            </div>
            <Link to="/" className='btn btn-primary me-2'>Atras</Link>
             <Link to={`/edit/${usuario.id}`} className='btn btn-info'>Editar</Link>
         </div>
    </div>
  )
}

export default Read