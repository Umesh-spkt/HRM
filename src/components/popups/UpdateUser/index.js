import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import "./index.css";

const UpdateUser = () => {
  let history = useHistory();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
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

  const [error, setError] = useState({
    nameError: "",
    addressError: "",
    emailError: "",
    phoneNumberError: "",
    dateOfBirthError: "",
    genderError: "",
  });

  const handleAdd = (e) => {
    let temp = { ...user };
    temp.educationDetails.push({
      board: "",
      institution: "",
      passedYear: "",
      percentage: "",
      grade: "",
    });
    setUser(temp);
  };

  const handleDelete = (e, i) => {
    let temp = { ...user };
    temp.educationDetails.splice(i, 1);
    setUser(temp);
  };

  const {
    name,
    email,
    address,
    phoneNumber,
    dateOfBirth,
    gender,
    educationDetails,
  } = user;

  const onEducationChange = (e, i) => {
    let temp = { ...user };
    temp.educationDetails[i][e.target.name] = e.target.value;
    setUser(temp);
  };
  const onInputChange = (e) => {
    // for properties except education details
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user.name.trim()) {
      setError({ nameError: "Username required" });
    } else if (!/^[A-Za-z]+/.test(user.name.trim())) {
      setError({ nameError: "Enter a valid name" });
    } else if (!user.email) {
      setError({ emailError: "Email is required" });
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError({ emailError: "Enter a valid email" });
    } else if (!user.gender) {
      setError({ genderError: "Choose your Gender" });
    } else if (!user.phoneNumber) {
      setError({ phoneNumberError: "Enter your number" });
    } else if (!user.dateOfBirth) {
      setError({ dateOfBirthError: "Enter your date of birth" });
    } else if (!user.address) {
      setError({ addressError: "Enter your address" });
    } else {
      await axios.post("http://173.249.45.237:8081/hrs/employee/save", user);
      history.push("/");
    }
  };

  const loadUser = async () => {
    const result = await axios.get(
      `http://173.249.45.237:8081/hrs/employee/${id}`
    );
    setUser(result.data.model);
  };

  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <Link className="btn btn-danger" to="/">
            Close
          </Link>
          <table className="table">
            <tbody>
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
                  ></input>
                  {error.nameError && (
                    <p className="errors">{error.nameError}</p>
                  )}
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
                  {error.addressError && (
                    <p className="errors">{error.addressError}</p>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <label for="dateOfBirth">Date Of Birth</label>
                </td>
                <td>
                  <input
                    className="field"
                    type="text"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    placeholder="Select Date"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                  {error.dateOfBirthError && (
                    <p className="errors">{error.dateOfBirthError}</p>
                  )}
                </td>
                <td>
                  <label for="gender">Gender</label>
                </td>
                <td>
                  <label className="radio-inline">
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
                  <label className="radio-inline">
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
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "other"}
                      value="other"
                      onChange={(e) => onInputChange(e)}
                    />
                    &nbsp;&nbsp; Other
                  </label>
                  {error.genderError && (
                    <p className="errors">{error.genderError}</p>
                  )}
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
                  {error.emailError && (
                    <p className="errors">{error.emailError}</p>
                  )}
                </td>
                <td>
                  <label for="phoneNumber">phoneNumber Number</label>
                </td>
                <td>
                  <input
                    className="field"
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Enter your Number"
                    onChange={(e) => onInputChange(e)}
                  ></input>
                  {error.phoneNumberError && (
                    <p className="errors">{error.phoneNumberError}</p>
                  )}
                </td>
              </tr>
            </tbody>
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
              {educationDetails.map((details, i) => (
                <tr>
                  <td>
                    <input
                      type="text"
                      name="board"
                      value={educationDetails[i].board}
                      onChange={(e) => onEducationChange(e, i)}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="institution"
                      value={educationDetails[i].institution}
                      onChange={(e) => onEducationChange(e, i)}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="passedYear"
                      value={educationDetails[i].passedYear}
                      onChange={(e) => onEducationChange(e, i)}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="percentage"
                      value={educationDetails[i].percentage}
                      onChange={(e) => onEducationChange(e, i)}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="grade"
                      value={educationDetails[i].grade}
                      onChange={(e) => onEducationChange(e, i)}
                    ></input>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, i)}
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
      </div>
    </React.Fragment>
  );
};
export default UpdateUser;
