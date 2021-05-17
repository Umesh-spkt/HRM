import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setEmployee(result.data.reverse());
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadEmployees();
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container">
      <div className="py-4">
        <div style={{ float: "right" }}>
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div style={{ float: "left" }}>
          <Link className="btn btn-outline-dark" to="/users/add">
            Add User
          </Link>
          <h1>Employees</h1>
        </div>
        <table className="table border shadow">
          <thead className="table-light">
            <tr>
              <th column="name" order="desc" scope="col">
                Name
              </th>
              <th column="address" order="desc" scope="col">
                Address
              </th>
              <th column="dateOfBirth" order="desc" scope="col">
                Date Of Birth
              </th>
              <th column="email" order="desc" scope="col">
                Email
              </th>
              <th column="phoneNumber" order="desc" scope="col">
                Phone Number
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) => {
                if (searchTerm == "") {
                  return employee;
                } else if (
                  employee.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  employee.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  employee.email.includes(searchTerm.toLowerCase())
                ) {
                  return employee;
                }
              })
              .map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.address}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Link
                      class="btn btn-primary mr-2"
                      to={`/users/${employee.id}`}
                    >
                      View
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/users/edit/${employee.id}`}
                    >
                      Update
                    </Link>
                    <Link
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
