import React, { useState, useEffect } from "react";
import { format, compareAsc } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Pagination from "./Pagination";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Navbar from "./Navbar";

const StudentTable = () => {
  const [studentList, setStudentList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(3);
  const [parentInfo, setParentInfo] = useState(false);
  const [search,setSearch] = useState("")

  const tableRef = useRef(null);

  // Get current students
  const indexOfLastStudents = currentPage * studentsPerPage;
  const indexOfFirstStudents = indexOfLastStudents - studentsPerPage;
  const currentStudents = search ? studentList.filter((student)=>student.sName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || student.sSurname.toLocaleLowerCase().includes(search.toLocaleLowerCase())).slice(
    indexOfFirstStudents,
    indexOfLastStudents
  ) : studentList.slice(
    indexOfFirstStudents,
    indexOfLastStudents
  );

  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  if (studentList.length === 0) {
    return (
      <div
        className="h-100 d-flex justify-content-center "
        style={{ marginTop: "150px" }}
      >
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
    <div className="container d-block  bg-secondary p-2 rounded">
      
      
      <div className="card  bg-light">
      <nav class="navbar navbar-expand-lg bg-light rounded">
  <div className="container-fluid">
    <a className="navbar-brand disabled"  >Students</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent2">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="form-check form-switch nav-item mt-1">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={parentInfo} onChange={()=> setParentInfo(!parentInfo)} />
  <label className="form-check-label" for="flexSwitchCheckChecked">View Parent Info</label>
</li>
        
        
        
        
      </ul>
      <div className="d-flex" >
      
      <select
                    className="form-select me-1" style={{width:"fit-content"}}
                    aria-label="Default select example"
                    value={studentsPerPage}
                    onChange={(e)=> setStudentsPerPage(e.target.value)}
                  >
                    <option selected>Students Per Page</option>
                    <option value="1">One row per page</option>
                    <option value="2">Two rows per page</option>
                    <option value="3">Three rows per page</option>
                  </select>
        <input onInput={(e)=> setSearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <DownloadTableExcel
                      filename="students table"
                      sheet="students"
                      currentTableRef={tableRef.current}
                    ><button className="btn btn-outline-success" >
                      <i className="bi bi-download">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg>
                      </i>
                      
                    </button>
                      
                    </DownloadTableExcel>
      </div>
    </div>
  </div>
</nav>
        <div className="card-body">
          <div className="table-responsive ">
            <ToastContainer autoClose={3000} theme="colored" />
            <table
              ref={tableRef}
              className="table caption-top  border-secondary  table-light "
            >
              
              <thead className="relative">
                <tr>
                  <th scope="col" >
                    <div className="d-flex">
                      
                    <i className={selected.length > 0 ? "bi bi-trash my-icon " : "not_show"} onClick={handleDelete}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
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
                  
                   
                    <Link href={"/students/" + selected} className={selected.length === 0 | selected.length > 1 ? "not_show" : ""} >
                      <i className="bi bi-pencil-square my-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
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
                  
                    </div>
                  
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Class</th>
                  <th scope="col">Address</th>
                  <th scope="col">Record Date</th>
                  {parentInfo && <th scope="col">Parent Name</th>}
                  {parentInfo && <th scope="col">Parent Lastname</th>}
                  {parentInfo && <th scope="col">Parent Email</th>}
                  {parentInfo && <th scope="col">Parent Phone</th>}
                  {parentInfo && <th scope="col">Registration Personel</th>}
                  
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
                      {parentInfo && <td>{student.vName}</td>}
                      {parentInfo && <td>{student.vSurname}</td>}
                      {parentInfo && <td>{student.vMobile}</td>}
                      {parentInfo && <td>{student.vEmail}</td>}
                      {parentInfo && <td>{student.user ? student.user : null}</td>} 
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
