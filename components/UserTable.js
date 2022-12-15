import React, {useState, useEffect } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { format, compareAsc } from 'date-fns'
import moment from 'moment';

const UserTable = () => {
    const [allUsers, setallUsers] = useState([])
    const {dispatch,user } = useContext(AuthContext)

    console.log(allUsers);

    useEffect(()=> {
        const getData = async ()=> {
        const res = await fetch(`http://localhost:3000/api/auth/admin`,{
            method:'GET',       
            headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
        })
        const data = await res.json()
        setallUsers(data.data)
        console.log(data);
    }
    if(user && user.isAdmin){
      getData()  
    }
    
    },[user])

    

    
    

    
  return (
    <table className="table table-dark table-hover ">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Hesap Oluşma Tarihi</th>
      <th scope="col">Son Giriş</th>
      <th scope="col">Son Çıkış</th>
    </tr>
  </thead>
  <tbody>
    {allUsers.map((user)=> (
       <tr key={user._id} >
      <td>check</td>
      <td>{user.fullname}</td>
      <td>{user.username}</td>
      <td>{format(new Date(`${user.createdAt}`), 'd.M.yyyy HH:mm:ss')}</td>
      <td>{user.loginlogs[0] ? format(new Date(`${user.loginlogs[0]}`), 'd.M.yyyy HH:mm:ss') : "no entry"}</td>
      <td>{user.logoutlogs[0] ? format(new Date(`${user.logoutlogs[0]}`), 'd.M.yyyy HH:mm:ss') : "no entry"}</td>
    </tr> 
    ))}
    
    
    
  </tbody>
</table>
  )
}



export default UserTable