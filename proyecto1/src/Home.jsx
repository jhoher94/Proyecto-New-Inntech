import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
        Location.reload();
    })
        .catch(err => console.log(err));
}

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Lista Usuarios</h2>
                <div className='d-flex justify-content-end'>
                    <Link to= "/create" className='btn btn-success'>Create +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((usuario, index) => {
                            return <tr key={index}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <Link to={`/read/${usuario.id}`} className='btn btn-sm btn-info'>read</Link>
                                    <Link to={`/edit/${usuario.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={() => handleDelete(usuario.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>    
                </table>
            </div>
        </div>
  )
}

export default Home