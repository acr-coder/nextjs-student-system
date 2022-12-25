import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/authContext";
import { format, compareAsc } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../components/Navbar";

const UserProfile = () => {
  const router = useRouter();
  const {id} = router.query
  const [userPro, setUserPro] = useState();
  const { dispatch, user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const getData = async () => {
      if(id){
        const res = await fetch(`https://srs-seven.vercel.app/api/auth/admin/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setUserPro(data.data);
      }
      
    };

    if (user) {
      getData();
    }

    const userExists = localStorage.getItem("user");

    if (!userExists) {
      router.push("/auth/login");
    }
  });

  return (
    <>
      <Navbar />

      <div className="container p-5">
        <div className="card-title">
          <h1 className="text-white" >User Profile</h1>
        </div>
        <div className="card bg-light">
          <div className="card-body">
            <div className="table-responsive ">
              {/* <ToastContainer autoClose={3000} theme="colored" /> */}
              <table className="table caption-top border-secondary  table-light table-hover ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Hesap Oluşma Tarihi</th>
                    <th scope="col">Girişler</th>
                    <th scope="col">Çıkışlar</th>
                  </tr>
                </thead>
                <tbody>
                  {userPro && (
                    <tr>
                      <th scope="row">
                        <input type="checkbox" name="" id="" />
                      </th>

                      <td>{userPro.fullname}</td>
                      <td>{userPro.username}</td>
                      <td>
                        {format(
                          new Date(`${userPro.createdAt}`),
                          "d.M.yyyy HH:mm:ss"
                        )}
                      </td>
                      <td>
                        {userPro &&
                          userPro.loginlogs.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {format(
                                  new Date(`${item}`),
                                  "d.M.yyyy HH:mm:ss"
                                )}
                              </td>
                            </tr>
                          ))}
                      </td>
                      <td>
                        {userPro &&
                          userPro.logoutlogs.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {format(
                                  new Date(`${item}`),
                                  "d.M.yyyy HH:mm:ss"
                                )}
                              </td>
                            </tr>
                          ))}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
