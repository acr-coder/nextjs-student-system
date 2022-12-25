import React, { useState, useEffect } from "react";
import { format, compareAsc } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Pagination from "./Pagination";
import {useRef} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const StudentTable = () => {
  const [studentList, setStudentList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState([])
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(3);
  const [class5, setClass5] = useState(null)

  const tableRef = useRef(null);

    // Get current posts
    const indexOfLastStudents = currentPage * studentsPerPage;
    const indexOfFirstStudents = indexOfLastStudents - studentsPerPage;
    const currentStudents = studentList.slice(indexOfFirstStudents, indexOfLastStudents);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

  const notify = (msg) => toast.success(msg);

  const handleSelect = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
      
    } else if (e.target.checked === false) {
      setSelected(selected.filter((item) => item != e.target.value));
      
    }
  };

  const handleDelete = () => {
    try {
      fetch("https://srs-seven.vercel.app/api/students", {
        method: "DELETE",
        body: JSON.stringify({ objects: selected }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(
        notify(selected.length > 1 ? "Kayıtlar silindi" : "Kayıt Silindi")
      );
      setSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
    const getStudents = async () => {
       //setLoading(true);
      const response = await fetch("https://srs-seven.vercel.app/api/students");
      const json = await response.json();
      setStudentList(json.data);
      //setLoading(false);
    };

    getStudents();
    //console.log(selected);
  }, [selected]);

  if (studentList.length === 0 ) {
    return (
      <div
        className="h-100 d-flex justify-content-center "
        style={{ marginTop: "150px" }}
      >
        <h1 className="text-center text-white" >Kayıt Yok</h1>
        <div
          className="spinner-border text-warning "
          style={{ width: "15rem", height: "15rem" }}
          role="status"
        >
          
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-block d-sm-flex bg-secondary p-2 rounded">
      <div className="column  d-flex flex-column me-3 justify-content-between align-items-center ">
      <div className="card mb-1 " style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">LGS:{studentList.filter((student)=>student.sClass === "5").length + studentList.filter((student)=>student.sClass === "6").length + studentList.filter((student)=>student.sClass === "7").length + studentList.filter((student)=>student.sClass === "8").length} öğrenci</li>
              <li className="list-group-item">YKS:{studentList.filter((student)=>student.sClass === "9").length + studentList.filter((student)=>student.sClass === "10").length + studentList.filter((student)=>student.sClass === "11").length + studentList.filter((student)=>student.sClass === "12").length} öğrenci</li>
              
              
            </ul>
          </div>
          <div className="card  mb-1 " style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">5. Sınıf: {studentList.filter((student)=>student.sClass === "5").length}</li>
              <li className="list-group-item">6. Sınıf: {studentList.filter((student)=>student.sClass === "6").length}</li>
              <li className="list-group-item">7. Sınıf: {studentList.filter((student)=>student.sClass === "7").length}</li>
              <li className="list-group-item">8. Sınıf: {studentList.filter((student)=>student.sClass === "8").length}</li>
              
            </ul>
          </div>
          <div className="card  mb-1" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
              <li className="list-group-item"> 9. Sınıf: {studentList.filter((student)=>student.sClass === "9").length}</li>
              <li className="list-group-item">10. Sınıf: {studentList.filter((student)=>student.sClass === "10").length}</li>
              <li className="list-group-item">11. Sınıf: {studentList.filter((student)=>student.sClass === "11").length}</li>
              <li className="list-group-item">12. Sınıf: {studentList.filter((student)=>student.sClass === "12").length}</li>
              
            </ul>
          </div>
          
        </div>
    <div className="card  bg-light">
      <div className="card-body">

      
    
    <div className="table-responsive ">
      <ToastContainer autoClose={3000} theme="colored" />
      <table ref={tableRef} className="table caption-top  border-secondary  table-light ">
        <caption className="text-white">
          <div className="d-flex justify-content-start ">
            {selected.length > 0 ? (
              <i className="bi bi-trash my-icon" onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-trash text-danger "
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
              <Link href={'/students/'+selected} >
              <i className="bi bi-pencil-square my-icon">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-pencil-square text-success "
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
              
            ) : null }
            {selected.length === 0 ? (
              (
                <DownloadTableExcel
                      filename="students table"
                      sheet="students"
                      currentTableRef={tableRef.current}
                  >
  
                     <button>Excell</button>
  
                  </DownloadTableExcel>
              )
              
            ) : null }
            
          </div>
        </caption>
        <thead className="relative">
          
            <tr>
              <th scope="col">#</th>
              <th scope="col">Adı</th>
              <th scope="col">Soyadı</th>
              <th scope="col">Telefon</th>
              <th scope="col">Email</th>
              <th scope="col">Sınıf</th>
              <th scope="col">Adres</th>
              <th scope="col">Kayıt Tarihi</th>
              <th scope="col">Veli Adı</th>
              <th scope="col">Veli Soyadı</th>
              <th scope="col">Veli Telefon</th>
              <th scope="col">Veli Email</th>
              <th scope="col">Kayıt Personeli</th>
            </tr>
           
          
        </thead>
        <tbody>
          {currentStudents.map((student) => {
            return (
              
                <tr key={student._id}>
                  <th scope="row">
                    <input
                      type="checkbox"
                      value={student._id}
                      onChange={handleSelect}
                      name=""
                      id=""
                    />
                  </th>

                  <td>{student.sName}</td>
                  <td>{student.sSurname}</td>
                  <td>{student.sMobile}</td>
                  <td>{student.sEmail}</td>
                  <td>{student.sClass}</td>
                  <td>{student.sAddress}</td>
                  <td>
                    {format(
                      new Date(`${student.createdAt}`),
                      "d.M.yyyy HH:mm:ss"
                    )}
                  </td>
                  <td>{student.vName}</td>
                  <td>{student.vSurname}</td>
                  <td>{student.vMobile}</td>
                  <td>{student.vEmail}</td>
                  <td>{student.user ? student.user : null}</td>
                </tr>
                
              
            );
          })}
        </tbody>
      </table>
      <Pagination
        studentsPerPage={studentsPerPage}
        totalStudents={studentList.length}
        paginate={paginate}
      />
    </div>
    </div>
    </div>
    </div>
  );
};

export default StudentTable;
