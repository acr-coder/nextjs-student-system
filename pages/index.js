import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import { AuthContext } from '../context/authContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
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
    <Navbar   />
  )
}
