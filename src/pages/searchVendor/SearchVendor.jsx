import React, { useEffect } from "react";
import { TextField } from "@mui/material";
// import { createLoc } from '../../../Api';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const paginatedData = [
  {
    organization_name: "ABC Pvt Ltd",
    phone: "9876543210",
    email: "abc@example.com",
    person_name: "John Doe",
  },
  {
    organization_name: "XYZ Enterprises",
    phone: "8765432109",
    email: "xyz@example.com",
    person_name: "Jane Doe",
  },
  {
    organization_name: "PQR Solutions",
    phone: "7654321098",
    email: "pqr@example.com",
    person_name: "Alice Smith",
  },
];

function SearchVendor() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState(null);
  const [name, setName] = React.useState("");
  const [pan, setPan] = React.useState("");
  const [gst, setGst] = React.useState("");
  const [macId, setMacId] = React.useState("");

  const submit = async () => {
    if (!name) {
      Swal.fire({
        text: "Please provide Vendor name",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
    } else if (!pan) {
      Swal.fire({
        text: "Please provide PAN number",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
    } else if (!gst) {
      Swal.fire({
        text: "Please provide GSR number",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
    } else if (!macId) {
      Swal.fire({
        text: "Please provide Mac Id",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
    } else {
      let data = {
        vendor_name: name,
        pan_number: pan,
        gst_number: gst,
        mac_id: macId,
      };
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setUserInfo(userData);
    console.log(userData);
  }, []);

  return (
    <div className="padding">
      <h5 className="create-employee mb-3">Search Vendor</h5>

      {/* <div className="card forms-card">
        <div className="row">
          <div className="col-12 mb-3">
            <input
              className="w-100 form-control"
              value={name}
              id="vendor-name"
              placeholder="Vendor name"
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              value={pan}
              onChange={(ev) => {
                let regex = /[^a-z0-9_-]/gi;
                let val = ev.target.value.replace(regex, "");
                setPan(val.toLowerCase());
              }}
              id="outlined-basic"
              label="PAN Number"
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              value={gst}
              onChange={(ev) => {
                let regex = /[^a-z0-9_-]/gi;
                let val = ev.target.value.replace(regex, "");
                setGst(val.toLowerCase());
              }}
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              value={macId}
              onChange={(ev) => {
                let regex = /[^a-z0-9_-]/gi;
                let val = ev.target.value.replace(regex, "");
                setMacId(val.toLowerCase());
              }}
              id="outlined-basic"
              label="MAC ID"
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-dark px-4 me-4"
            onClick={() => {
              submit();
            }}
          >
            Associate
          </button>
          <button className="btn btn-danger px-4">Cancel</button>
          onClick={() => {navigate('/app/manage-stores')}}
        </div>
      </div> */}
      
      <div className="card forms-card">
        <div className="row ">
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Vendor Name</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">PAN Number</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label"> GST Number</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label"> MAC ID </label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button className="btn btn-dark px-4 me-4">Submit</button>
            <button className="btn btn-danger px-4">Cancel</button>
          </div>
        </div>
      </div>
      
      <div className="tableContainer activity-table mt-3">
        <table className="table">
          <thead>
            <tr>
              <th className="table-heading" scope="col">
                Vendor name
              </th>
              <th className="table-heading" scope="col">
                PAN Number
              </th>
              <th className="table-heading" scope="col">
                GST Number
              </th>
              <th className="table-heading" scope="col">
                Mac Id
              </th>
              {/* className='table-heading' <th scope="col">Account Code</th> */}
              {/* <th className="table-heading" scope="col">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="table-row-color">
                <td>{row.organization_name}</td>
                <td>{row.phone}</td>
                <td>{row.email}</td>
                <td>{row.person_name}</td>
                {/* <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="btn btn-add me-2">
                        <MdCheckBox />
                      </button>
                      <button className="btn btn-add me-2">
                        <MdEdit />
                      </button>
                      <button className="btn btn-delete me-2">
                        <MdDelete />
                      </button>
                    </div>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-light me-2"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="pagination">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-light ms-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default SearchVendor;
