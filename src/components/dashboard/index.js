import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewUser from "../popups/ViewUser";
import AddUser from "../popups/AddUser";
import UpdateUser from "../popups/UpdateUser";

export default function Dashboard() {
  const [employees, setEmployee] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [AddModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

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
        <AddUser
          open={AddModalOpen}
          onClose={() => setAddModalOpen(false)}
        ></AddUser>
        <ViewUser
          open={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        ></ViewUser>

        <UpdateUser
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        ></UpdateUser>

        <div style={{ float: "right" }}>
          <h3>Search</h3>
        </div>
        <div style={{ float: "left" }}>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setAddModalOpen(true)}
          >
            Add Employee
          </button>
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
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={() => setViewModalOpen(true)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={() => setUpdateModalOpen(true)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
