import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await axios.get("http://173.249.45.237:8081/hrs/employee");
    setEmployee(res.data.list.reverse());
  };
  const getDate = (date) => {
    return (date = new Date().toDateString());
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://173.249.45.237:8081/hrs/employee/${id}`);
    loadEmployees();
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ padding: 30, width: "100%" }}>
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
        <table className="table border shadow" width="100%">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
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
                  <td>{getDate(employee.dateOfBirth)}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>
                    <Link
                      className="btn btn-primary mr-2"
                      to={`/users/${employee.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mr-2"
                      to={`/users/edit/${employee.id}`}
                    >
                      Update
                    </Link>
                    <input
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(employee.id)}
                      value=" Delete"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
