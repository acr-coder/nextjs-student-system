import React, { useState, useEffect} from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useRouter } from 'next/router'

const login = () => {
  const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading] = useState(null)
    const { dispatch,user } = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
        setError(null)
      const response = await fetch("http://localhost:3000/api/auth/login", {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username,password})
        })
        const json = await response.json()

        if(!response.ok) {
          setIsLoading(false)
          setError(json.error)
      }
      if(response.ok){
        // save the user to localstorage
        localStorage.setItem('user', JSON.stringify(json))

        //update the auth context
        dispatch({type: 'LOGIN', payload: json})

        setIsLoading(false)
        router.push("/")
    }
    }
    
    useEffect(()=> {
      if(user){
        router.push("/")
      }
    },[user])

   if(user){
    return(
      <></>
    )
   } else if(!user){
     return (
    <div className="ala vh-100 vw-100 d-flex justify-content-center align-items-center bg-primary">
      <form onSubmit={handleSubmit} className="login-form w-75">
        <div className="mb-3 text-center">
          <label className="form-label fs-1 text-white">Login</label>
        </div>
        <div className="mb-3">
          <label  className="form-label text-white">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <label  className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 d-flex justify-content-center  ">
          {isLoading ? (
            <button className="btn btn-danger w-50" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
          ) : (
            <button type="submit" className="btn btn-danger w-50 ">
          Login
        </button>
          )}
          
        </div>
        <div className="mt-3 d-flex justify-content-center ">
          <label className="text-white">{error ? error : ''}</label>
        </div>
        
      </form>
    </div>
  );
   }
 
};

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

export default login;
