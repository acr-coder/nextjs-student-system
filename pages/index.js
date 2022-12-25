import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import StudentTable from "../components/StudentTable";

export default function Home() {
  
  const { dispatch, user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    const userExists = localStorage.getItem('user')
    
    if (!userExists) {
      router.push("/auth/login");
    }
  }, [user]);

  if (!user) {
    return <></>;
  }
  return (
    <>
    <Head>
      <title>SRS/Anasayfa</title>
    </Head>
      <Navbar />
      
        
        
          

          <StudentTable />
        
        
      
    </>
  );
}
