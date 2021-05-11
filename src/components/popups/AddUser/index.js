import React, { useState } from "react";
import { getEducation } from "./educationDetails";
import ReactModal from "react-modal";
import axios from "axios";

const AddUser = ({ open, onClose }) => {
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [education, setEducation] = useState(getEducation());

  const handleAdd = (e) => {
    const Aeducation = [
      ...education,
      {
        _id: Math.random(),
        Board: <input type="text"></input>,
        Institution: <input type="text"></input>,
        passedYear: <input type="number"></input>,
        percentage: <input type="text"></input>,
        grade: <input type="text"></input>,
      },
    ];
    setEducation(Aeducation);
  };

  const handleDelete = (detail) => {
    const Deducation = education.filter((d) => d._id !== detail._id);
    setEducation(Deducation);
  };

  const { name, email, address, phone, dateOfBirth } = user;
  const onInputChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    await axios.post("http://localhost:3003/users", user);
  };
  return (
    <ReactModal isOpen={open}>
      <button onClick={onClose}>close</button>
      <div>
        <React.Fragment>
          <form onSubmit={(e) => onSubmit(e)}>
            <table className="table">
              <tr>
                <td>
                  <label for="name">Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter your Name"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </td>
                <td>
                  <label for="address">Address</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Enter your Address"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="dateOfBirth">Date Of Birth</label>
                </td>
                <td>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    placeholder="Select Date"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </td>
                <td>
                  <label for="Gender">Gender</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Enter your Address"
                  ></input>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="email">Email</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter your Email"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </td>
                <td>
                  <label for="phoneNumber">Phone Number</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="phone"
                    value={phone}
                    placeholder="Enter your Number"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </td>
              </tr>
            </table>

            <h3>Education Details</h3>
            <button
              onClick={(e) => handleAdd()}
              className="btn btn-primary btn-sm"
            >
              Add
            </button>

            <table className="table">
              <thead>
                <tr>
                  <th>Board</th>
                  <th>Institution</th>
                  <th>Passed Year</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {education.map((details) => (
                  <tr key={details._id}>
                    <td>{details.Board}</td>
                    <td>{details.Institution}</td>
                    <td>{details.passedYear}</td>
                    <td>{details.percentage}</td>
                    <td>{details.grade}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(details)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Education details ends here */}
            </table>
            <input type="submit" value="submit"></input>
          </form>
        </React.Fragment>
      </div>
    </ReactModal>
  );
};
export default AddUser;
