import React, { useEffect, useState } from "react";
import firebase from "../../firebaseConfig/firebase.config";
import NavBar from "../../Navbar/navbar";

export default function Users() {
  const [jobs, SetJobs] = useState([]);
  const [JobsTable, setJobsTable] = useState([]);
  const [job, SetJob] = useState({
    joptitle: "",
    namecompany: "",
    joptype: "",
    PhoneCompany: "",
    contract: "",
    employees: "",
    jobDesc: "",
    jopaddress: "",
  });

  const fetchBlogs = async () => {
    const response = firebase.firestore().collection("jobs");
    const data = await response.get();
    data.docs.forEach((item) => {
      SetJobs([...jobs, jobs.push(item.data())]);
      console.log(item.id);
    });
    setJobsTable(jobs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const Delete = (e) => {
    firebase.firestore().collection("jobs").doc(e).delete();
    // fetchBlogs();
    // firebase
    //   .firestore()
    //   .collection("jobs")
    //   .doc(e)
    //   .delete()
    //   .then(function () {
    //     alert("Document successfully deleted!");
    //   })
    //   .catch(function (error) {
    //     console.error("Error removing document: ", error);
    //   });
    console.log(e);
  };

  const FillData = (e) => {
    SetJob(e);
  };
  const ClearUpdateData = (e) => {
    if (e.ID === "") {
      firebase.firestore().collection("jobs").doc(e).update(e);
      alert("Document successfully Updated!");
      console.log(e);
    } else {
      alert("Error Updated document: ");
      console.log(e);
    }
    clear();
  };

  const clear = () => {
    SetJob({
      ID: "",
      joptitle: "",
      namecompany: "",
      joptype: "",
      PhoneCompany: "",
      contract: "",
      employees: "",
      jobDesc: "",
      jopaddress: "",
    });
  };

  // firebase.firestore().collection("jobs").doc(e.ID).update(e);
  // console.log(e.ID);
  // SetJob({
  //   ID: "",
  //   joptitle: "",
  //   namecompany: "",
  //   joptype: "",
  //   PhoneCompany: "",
  //   contract: "",
  //   employees: "",
  //   jobDesc: "",
  //   jopaddress: "",
  // });
  // // fetchBlogs();
  // console.log(job.joptitle);

  const handleInputChange = (e) => {
    if (e.target.name === "joptitle") {
      SetJob({
        ...job,
        joptitle: e.target.value,
      });
    } else if (e.target.name === "namecompany") {
      SetJob({
        ...job,
        namecompany: e.target.value,
      });
    } else if (e.target.name === "joptype") {
      SetJob({
        ...job,
        joptype: e.target.value,
      });
    } else if (e.target.name === "PhoneCompany") {
      SetJob({
        ...job,
        PhoneCompany: e.target.value,
      });
    } else if (e.target.name === "contract") {
      SetJob({
        ...job,
        contract: e.target.value,
      });
    } else if (e.target.name === "employees") {
      SetJob({
        ...job,
        employees: e.target.value,
      });
    } else if (e.target.name === "jobDesc") {
      SetJob({
        ...job,
        jobDesc: e.target.value,
      });
    } else if (e.target.name === "jopaddress") {
      SetJob({
        ...job,
        jopaddress: e.target.value,
      });
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <br />
      <h2> Jobs </h2>
      <br />
      <div
        class
        Name="col-md-6 col-sm-12"
        style={{ width: "600px", marginLeft: "29%" }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              name="id"
              readOnly
              value={job.ID}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <small className="text-danger">{userErrors.name}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              joptitle
            </label>
            <input
              type="text"
              className="form-control"
              name="joptitle"
              value={job.joptitle}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <small className="text-danger">{userErrors.name}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name Company
            </label>
            <input
              type="text"
              className="form-control"
              name="namecompany"
              value={job.namecompany}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              joptype
            </label>
            <input
              type="text"
              className="form-control"
              name="joptype"
              value={job.joptype}
              onChange={(e) => handleInputChange(e)}
            />
            {/* <small className="text-danger">{userErrors.userName}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              PhoneCompany
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="PhoneCompany"
              value={job.PhoneCompany}
            />
            {/* <small className="text-danger">{userErrors.password}</small> */}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              contract
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="contract"
              value={job.contract}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Number Of employees
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="employees"
              value={job.employees}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              jobDesc
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="jobDesc"
              value={job.jobDesc}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              jopaddress
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="jopaddress"
              value={job.jopaddress}
            />
          </div>
        </form>
        <br />
        <br />
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">joptitle</th>
            <th scope="col">jopaddress</th>
            <th scope="col">PhoneCompany</th>
          </tr>
        </thead>
        <tbody>
          {JobsTable.map((listValue, index) => {
            return (
              <tr key={index}>
                <th>{listValue.ID}</th>
                <td>{listValue.joptitle}</td>
                <td>{listValue.jopaddress}</td>
                <td>{listValue.PhoneCompany}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning mx-2"
                    onClick={() => FillData(listValue)}
                  >
                    Fill Data
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning mx-2"
                    onClick={() => ClearUpdateData(listValue)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => Delete(listValue.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
