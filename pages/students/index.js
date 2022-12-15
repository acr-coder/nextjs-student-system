import React, {useEffect} from 'react'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import { useRouter } from 'next/router'

const Students = () => {
  const { dispatch, user } = useContext(AuthContext)
  

    const router = useRouter()
    
    useEffect(()=> {
      if(!user){
        router.push("/auth/login")
      }
    },[user])

   if(!user){
    return(
      <></>
    )
   } 
  return (
    <>
    <Navbar  />
    <div>Students</div>
    </>
  )
}

export default Students