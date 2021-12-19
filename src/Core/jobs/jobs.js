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
    About: "",
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
  const submitLogin = () => {
    firebase.firestore().collection("jobs").add(job);
    clear();
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
      firebase.firestore().collection("jobs").doc(e.ID).update(job);
      console.log(e);
    }
    clear();
  };

  const clear = () => {
    SetJob({
      About: "",
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
    } else if (e.target.name === "About") {
      SetJob({
        ...job,
        About: e.target.value,
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
              job title
            </label>
            <input
              placeholder="Front end / backend/ fullstack/ mobil ......."
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
              placeholder="Name"
              type="text"
              className="form-control"
              name="namecompany"
              value={job.namecompany}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              job type
            </label>
            <input
              placeholder="Full Time /part / Remote..... "
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
              Phone Company
            </label>
            <input
              placeholder="+0129(-23)83478"
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
              placeholder="Senior / junoir ......."
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
              placeholder=" ex: From 1000 t0 3000"
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="employees"
              value={job.employees}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              job Descriptions
            </label>
            <input
              placeholder="job description"
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="jobDesc"
              value={job.jobDesc}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              job address
            </label>
            <input
              placeholder="country / City"
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="jopaddress"
              value={job.jopaddress}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              About Job
            </label>
            <input
              placeholder="All Details"
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e)}
              name="About"
              value={job.About}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => submitLogin(e)}
          >
            Save New
          </button>
        </form>
        <br />
        <br />
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">job title</th>
            <th scope="col">job address</th>
            <th scope="col">Phone Company</th>
          </tr>
        </thead>
        <tbody>
          {JobsTable.map((listValue, index) => {
            return (
              <tr key={index}>
                <th>{index}</th>
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
                    Update
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
