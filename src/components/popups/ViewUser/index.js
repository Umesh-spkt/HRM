import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewUser = () => {
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">{user.name}</h1>
      <hr />
      <ul className="list-group w-40">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Address: {user.address}</li>
        <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Phone: {user.phone}</li>
        <li className="list-group-item">Date Of birth: {user.dateOfBirth}</li>
        <li className="list-group-item">Gender: {user.gender}</li>
      </ul>
    </div>
  );
};

export default ViewUser;
