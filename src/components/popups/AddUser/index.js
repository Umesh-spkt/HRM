import React, { useState } from "react";
import "./index.css";
import { getEducation } from "./educationDetails";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();

  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
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

  const { name, email, address, phone, dateOfBirth, gender } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3003/users", user);
    history.push("/");
  };
  return (
    <React.Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <table className="table">
          <tr>
            <td>
              <label for="name">Name</label>
            </td>
            <td>
              <input
                className="field"
                type="text"
                name="name"
                value={name}
                placeholder="Enter your Name"
                onChange={(e) => onInputChange(e)}
                required
              ></input>
            </td>
            <td>
              <label for="address">Address</label>
            </td>
            <td>
              <input
                className="field"
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
                className="field"
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                placeholder="Select Date"
                onChange={(e) => onInputChange(e)}
              ></input>
            </td>
            <td>
              <label for="gender">Gender</label>
            </td>
            <td>
              <label class="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  value="male"
                  onChange={(e) => onInputChange(e)}
                />
                &nbsp; Male
              </label>
              &nbsp;&nbsp;
              <label class="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  value="female"
                  onChange={(e) => onInputChange(e)}
                />
                &nbsp; Female
              </label>
              &nbsp;&nbsp;
              <label class="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "other"}
                  value="other"
                  onChange={(e) => onInputChange(e)}
                />
                &nbsp;&nbsp; Other
              </label>
              &nbsp;&nbsp;
            </td>
          </tr>

          <tr>
            <td>
              <label for="email">Email</label>
            </td>
            <td>
              <input
                className="field"
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
                className="field"
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
          type="button"
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
        </table>
        <input type="submit" value="submit"></input>
      </form>
    </React.Fragment>
  );
};
export default AddUser;
