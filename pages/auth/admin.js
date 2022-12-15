import React from 'react'
import Navbar from "../../components/Navbar"
import NewUser from '../../components/NewUserForm'
import UserTable from '../../components/UserTable'
import { AuthContext } from '../../context/authContext'
import { useContext,useEffect } from 'react'
import { useRouter } from 'next/router'

const admin = () => {
  const { dispatch, user } = useContext(AuthContext)
  

    const router = useRouter()
    
    useEffect(()=> {
      if(user && !user.isAdmin){
        router.push("/auth/login")
      }
    },[user])

   if(user && !user.isAdmin){
    return(
      <></>
    )
   } 
   if(user && user.isAdmin) {
    return (
    <>
    <Navbar  />
    <div class="row">
    <div class="col-md-8 p-5"><UserTable /></div>
    <div class="col-md-4 p-5"><NewUser/></div>
  </div>
    </>
  )
   }
  
}

export default admin