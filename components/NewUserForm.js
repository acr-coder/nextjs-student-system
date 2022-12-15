import React, { useState } from "react";

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation
    if (!username || !password || !fullname) {
      setError("Tüm Alanları doldurunuz");
      return;
    }
    //POST form values
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        username: username,
        password: password,
        isAdmin: isAdmin,
      }),
    });
    //Await for data for any desirable next steps
    const data = await res.json();



    if (!res.ok) {
      setError(data.error);
    }
    alert(`${fullname} isimli kullanıcı eklendi`)

    setUsername("")
    setFullName("")
    setIsAdmin(false)
    setPassword("")
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-warning rounded">
      <form onSubmit={handleSubmit} className="signup-form w-75">
        <div className="mb-3 text-center">
          <label className="form-label fs-1 text-white">Add New User</label>
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setFullName(e.target.value)}
            value={fullname}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label text-white">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-3 form-check ">
          <label className="form-check-label text-primary">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            Admin
          </label>
        </div>
        <div className="mb-3 d-flex justify-content-center ">
          <button type="submit" className="btn btn-danger w-50 ">
            Add
          </button>
        </div>
        <div className="mt-3 d-flex justify-content-center ">
          <label className="text-white">{error ? error : ""}</label>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
