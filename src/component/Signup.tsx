import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props: any) => {
  let navigate = useNavigate();
  const initUser = { id: null, name: "", email: "", password: "" };
  const [user, setUser] = useState(initUser);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
  let users: { id: Number; name: string; email: string; password: string }[] =
    [];
  if (allUsers !== null) {
    users = allUsers;
  }
  let velid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleLogin = () => {
    navigate("/login");
  };

  const handleData = (e: { target: { name: any; value: any } }) => {
    let nameFeild = e.target.name;
    if (nameFeild == "name" && e.target.value.trim().length > 0) {
      setName(false);
    }
    if (nameFeild == "email" && e.target.value.trim().length > 0) {
      setEmail(false);
    }
    if (nameFeild == "password" && e.target.value.trim().length > 0) {
      setPassword(false);
    }
    const { name, value } = e.target;
    user.id = users.length + 1;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (user.name.trim().length < 1) {
      setName(true);
    }
    if (user.email.trim().length < 1 || !user.email.match(velid)) {
      setEmail(true);
    }
    if (user.password.trim().length < 1) {
      setPassword(true);
    }
    if (user.name && user.email && user.password && user.email.match(velid)) {
      let dublicate = users.find((u) => u.email === user.email);
      if (dublicate === undefined) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/login");
      } else {
        alert("Email has alredy taken try other email");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="header">Sign up</h1>
        <form style={{ display: "grid" }}>
          <label className="lable">Your Name</label>
          <br />
          <input
            type="text"
            placeholder="your name"
            name="name"
            value={user.name}
            className="form-input"
            onChange={handleData}
          />
          {name ? (
            <label className="validate" id="name-validate">
              Enter name first
            </label>
          ) : (
            <></>
          )}
          <br />
          <label className="lable">Email</label>
          <br />
          <input
            type="email"
            placeholder="your email"
            name="email"
            value={user.email}
            className="form-input"
            onChange={handleData}
          />
          {email ? (
            <label className="validate" id="email-validate">
              Enter valid email
            </label>
          ) : (
            <></>
          )}
          <br />
          <label className="lable">Password</label>
          <br />
          <input
            type="password"
            placeholder="your password"
            name="password"
            value={user.password}
            className="form-input"
            onChange={handleData}
          />
          {password ? (
            <label className="validate" id="password-validate">
              Enter password first
            </label>
          ) : (
            <></>
          )}{" "}
          <br />
          <button type="submit" className="btn-primary" onClick={handleSignup}>
            Signup
          </button>
        </form>
        <br />
        <div style={{ display: "flex" }}>
          <p style={{ fontSize: 18, color: "white" }}>
            Already have a account :-{" "}
          </p>
          <button className="a_1" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
