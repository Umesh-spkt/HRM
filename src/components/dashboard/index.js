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

  return (
    <div className="container">
      <div className="py-4">
        <div style={{ float: "right" }}>
          <h3>Search</h3>
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
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
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
