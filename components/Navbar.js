import React from 'react'
import Link from 'next/link'
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router'

const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext)

    const router = useRouter()

    const handleOut = async (e) => {
      e.preventDefault()
       // remove user from storage
       console.log(user._id);
       const response = await fetch("http://localhost:3000/api/auth/logout", {
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user._id)
        })
        const json = await response.json()

       localStorage.removeItem('user')

       // dispatch logout action
       dispatch({type:'LOGOUT'})
       router.push("/auth/login")
    }
  return (
    <nav className="navbar navbar-expand-lg bg-secondary bg-opacity-25 ">
  <div className="container-fluid">
    <Link className="navbar-brand text-light" href="/">Student Record System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        
        <li className="nav-item">
          <Link className="nav-link text-light" href="/new-student">New Student</Link>
        </li>
        
        {user && user.isAdmin ? (
          <li className="nav-item">
          <Link href="/auth/admin" className="nav-link text-light">Admin Page</Link>
        </li>
        ) : null}
        
      </ul>
      <form className="d-flex" role="search">
      <span className="navbar-text text-warning me-4 fs-4">
      {user ? user.username : '' }
    </span>
        <button onClick={handleOut} className="btn btn-outline-warning" type="submit">Sign Out</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar