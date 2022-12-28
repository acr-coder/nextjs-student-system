import React, {useState, useEffect} from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const StudentEdit = () => {
  const router = useRouter()
  const { id } = router.query
  const [newStudent, setNewStudent] = useState({
    sName: "",
    sSurname: "",
    sMobile: "",
    sEmail: "",
    sAddress: "",
    sClass: "",
    vName: "",
    vSurname: "",
    vMobile: "",
    vEmail: "",
  });
  const [error,setError] = useState('')

  const notify = (msg) => toast.success(msg);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://srs-seven.vercel.app/api/students/${id}`);
      const data = await res.json();
      //console.log(data.data);
      setNewStudent({
        sName:data.data.sName,
        sSurname:data.data.sSurname,
        sMobile:data.data.sMobile,
        sEmail:data.data.sEmail,        
        sClass:data.data.sClass,        
        sAddress:data.data.sAddress,
        vName:data.data.vName,
        vSurname:data.data.vSurname,
        vEmail:data.data.vEmail,
        vMobile:data.data.vMobile,
      })
      
    };
    getData();
    
  },[]);

  const handleChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
    setError('')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !newStudent.sName &&
      !newStudent.sSurname &&
      !newStudent.sEmail &&
      !newStudent.sAddress &&
      !newStudent.sClass &&
      !newStudent.vName &&
      !newStudent.vSurname &&
      !newStudent.vEmail &&
      !newStudent.vMobile &&
      !newStudent.sMobile
    ) {
      setError("Lütfen tüm alanları doldurunuz")
      
    } else {
      try {
        fetch("https://srs-seven.vercel.app/api/students/"+id, {
          method: "PUT",
          body: JSON.stringify(newStudent),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(notify("Kayıt Güncellendi")).then(router.push("/"));

        setNewStudent({
          sName: "",
          sSurname: "",
          sMobile: "",
          sEmail: "",
          sAddress: "",
          sClass: "",
          vName: "",
          vSurname: "",
          vMobile: "",
          vEmail: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
    <ToastContainer autoClose={3000} theme="colored" />
      <Navbar />
      <div className="container rounded bg-white mt-5 p-5">
        <div className="h3 text-center text-primary">Update Record</div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Name</label>
              <input type="text" value={newStudent.sName} onChange={handleChange} className="form-control" name="sName" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Lastname</label>
              <input type="text" value={newStudent.sSurname} onChange={handleChange} className="form-control" name="sSurname" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Email</label>
              <input type="text" value={newStudent.sEmail} onChange={handleChange} className="form-control" name="sEmail" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Phone</label>
              <input type="text" value={newStudent.sMobile} onChange={handleChange} className="form-control" name="sMobile" required />
            </div>
          </div>
          <div className="row">
            
            <div className="col-md-3 mt-md-1 mt-3">
            <label>Class</label>
              <select className="form-select" value={newStudent.sClass} onChange={handleChange} name="sClass" aria-label="Default select example">
               
              <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Address</label>
              <input type="textarea" value={newStudent.sAddress} onChange={handleChange} className="form-control" name="sAddress" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Parent Name</label>
              <input type="text" value={newStudent.vName} onChange={handleChange} className="form-control" name="vName" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Parent Lastname</label>
              <input type="text" value={newStudent.vSurname} onChange={handleChange} className="form-control" name="vSurname" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Parent Email</label>
              <input type="text" value={newStudent.vEmail} onChange={handleChange} className="form-control" name="vEmail" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Parent Phone</label>
              <input type="text" value={newStudent.vMobile} onChange={handleChange} className="form-control" name="vMobile" required />
            </div>
          </div>

          
          
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
      
    </>
  );
};

export default StudentEdit;
