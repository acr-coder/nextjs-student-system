import React, {useState, useEffect } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { format, compareAsc } from 'date-fns'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';


const UserTable = () => {
    const [allUsers, setallUsers] = useState([])
    const [selected, setSelected] = useState([]);
    const {dispatch,user } = useContext(AuthContext)

    const notify = (msg) => toast.success(msg);

    const handleSelect = (e) => {
      if (e.target.checked) {
        setSelected([...selected, e.target.value]);
      } else if (e.target.checked === false) {
        setSelected(selected.filter((item) => item != e.target.value));
      }
    };

    //console.log(allUsers);

    const handleDelete = async () => {
      try {
        const res = await fetch("https://srs-seven.vercel.app/api/auth/admin", {
          method: "DELETE",
          body: JSON.stringify({ objects: selected }),
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await res.json();
        console.log(json);
        if(res.ok){
          notify(selected.length > 1 ? "Kayıtlar silindi" : "Kayıt Silindi")
         setSelected([]); 
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=> {
        const getData = async ()=> {
        const res = await fetch(`https://srs-seven.vercel.app/api/auth/admin`,{
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
    
    },[user,selected])

    

    
    

    
  return (
    <div className="card bg-light">
      <div className="card-body">
        <div className="table-responsive">
        <ToastContainer autoClose={3000} theme="colored" />
          <table className="table caption-top border-secondary  table-light table-hover ">
          <caption className="text-white">
          <div className="d-flex justify-content-start ">
            {selected.length > 0 ? (
              <i className="bi bi-trash my-icon" onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-trash text-danger"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </i>
            ) : null}
            {selected.length === 1 ? (
              <Link href={'/auth/admin/'+selected} >
              <i className="bi bi-pencil-square my-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-pencil-square text-success"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </i>
              </Link>
            ) : null}
          </div>
        </caption>
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
        <th scope="row">
                    <input
                      type="checkbox"
                      value={user._id}
                      onChange={handleSelect}
                      name=""
                      id=""
                    />
                  </th>
     
      <td>{user.fullname}</td>
      <td>{user.username}</td>
      <td>{format(new Date(`${user.createdAt}`), 'd.M.yyyy HH:mm:ss')}</td>
      <td>{user.loginlogs[0] ? format(new Date(`${user.loginlogs[0]}`), 'd.M.yyyy HH:mm:ss') : "no entry"}</td>
      <td>{user.logoutlogs[0] ? format(new Date(`${user.logoutlogs[0]}`), 'd.M.yyyy HH:mm:ss') : "no entry"}</td>
    </tr> 
    ))}
    
    
    
  </tbody>
</table>
        </div>
        
      </div>
    </div>
    
  )
}



export default UserTable