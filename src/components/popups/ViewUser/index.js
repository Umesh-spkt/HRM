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
    educationDetails: [
      {
        board: "",
        institution: "",
        passedYear: "",
        percentage: "",
        grade: "",
      },
    ],
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = axios.post(
      "http://173.249.45.237:8081/hrs/employee/save",
      user
    );

    setUser(res.data.model);
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
        <li className="list-group-item">Phone: {user.phoneNumber}</li>
        <li className="list-group-item">Date Of birth: {user.dateOfBirth}</li>
        <li className="list-group-item">Gender: {user.gender}</li>
      </ul>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <h1 className="display-4">Education Details</h1>&nbsp;&nbsp;
      <ul>
        {user.educationDetails.map((detail, i) => (
          <div>
            <h3>{user.educationDetails[i].institution}</h3>
            <li className="list-group-item">
              Baord: {user.educationDetails[i].board}
            </li>
            <li className="list-group-item">
              Passed Year: {user.educationDetails[i].passedYear}
            </li>
            <li className="list-group-item">
              Percentage: {user.educationDetails[i].percentage}
            </li>
            <li className="list-group-item">
              Grade: {user.educationDetails[i].grade}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ViewUser;
