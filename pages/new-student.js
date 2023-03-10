import React, {useState, useContext} from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { AuthContext } from "../context/authContext";



const NewStudent = () => {
  const { dispatch, user } = useContext(AuthContext)

    const router = useRouter()
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
    user:user ? user.username : ""
  });
  const [error,setError] = useState('')

  const notify = (msg) => toast.success(msg);

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
        fetch("https://srs-seven.vercel.app/api/students", {
          method: "POST",
          body: JSON.stringify(newStudent),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(notify("Öğrenci Eklendi"));
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
          user:""
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
        <div className="h3 text-center text-primary">Kayıt Formu</div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Adı</label>
              <input type="text" value={newStudent.sName} onChange={handleChange} className="form-control" name="sName" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Soyadı</label>
              <input type="text" value={newStudent.sSurname} onChange={handleChange} className="form-control" name="sSurname" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>E-posta Adresi</label>
              <input type="text" value={newStudent.sEmail} onChange={handleChange} className="form-control" name="sEmail" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Telefonu</label>
              <input type="text" value={newStudent.sMobile} onChange={handleChange} className="form-control" name="sMobile" required />
            </div>
          </div>
          <div className="row">
            
            <div className="col-md-3 mt-md-1 mt-3">
            <label>Sınıfı</label>
              <select className="form-select" value={newStudent.sClass} onChange={handleChange} name="sClass" aria-label="Default select example">
               
                <option value="5">5.Sınıf</option>
                <option value="6">6.Sınıf</option>
                <option value="7">7.Sınıf</option>
                <option value="8">8.Sınıf</option>
                <option value="9">9.Sınıf</option>
                <option value="10">10.Sınıf</option>
                <option value="11">11.Sınıf</option>
                <option value="12">12.Sınıf</option>
                <option value="mezun">Mezun</option>
              </select>
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Adresi</label>
              <input type="textarea" value={newStudent.sAddress} onChange={handleChange} className="form-control" name="sAddress" required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Veli Adı</label>
              <input type="text" value={newStudent.vName} onChange={handleChange} className="form-control" name="vName" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Veli Soyadı</label>
              <input type="text" value={newStudent.vSurname} onChange={handleChange} className="form-control" name="vSurname" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Veli E-posta Adresi</label>
              <input type="text" value={newStudent.vEmail} onChange={handleChange} className="form-control" name="vEmail" required />
            </div>
            <div className="col-md-3 mt-md-1 mt-3">
              <label>Veli Telefonu</label>
              <input type="text" value={newStudent.vMobile} onChange={handleChange} className="form-control" name="vMobile" required />
            </div>
          </div>

          
          
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
      
    </>
  );
};

export default NewStudent;
