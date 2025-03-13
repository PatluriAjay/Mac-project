import React, { useEffect } from "react";
import { TextField } from "@mui/material";
// import { createLoc } from '../../../Api';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AssignVendors() {
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
      <h5 className="create-employee mb-3">Assign Vendor</h5>
      {/* <div className="card forms-card">
        <div className="row">
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              value={name}
              id="outlined-basic"
              label="Vendor name"
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              variant="outlined"
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
            <button className="btn btn-dark px-4 me-4">Associate</button>
            <button className="btn btn-danger px-4">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignVendors;
