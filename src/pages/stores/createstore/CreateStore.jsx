import React, { useEffect } from "react";
import "./create.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import { createLoc } from '../../../Api';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateStore() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState(null);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");

  const submit = async () => {
    if (!name) {
      Swal.fire({
        text: "Please provide store name",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
    } else if (!code) {
      Swal.fire({
        text: "Please provide store code",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
    } else {
      let data = {
        store_name: name,
        store_code: code,
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
      <h5 className="create-employee mb-3">Create Store</h5>
      <div className="card forms-card">
        <div className="row">
         
          <div className="col-12  mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Store code</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-12  mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Store Name</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-12  mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Description</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
          </div>
{/* 
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              value={code}
              onChange={(ev) => {
                let regex = /[^a-z0-9_-]/gi;
                let val = ev.target.value.replace(regex, "");
                setCode(val.toLowerCase());
              }}
              id="outlined-basic"
              label="Store Code"
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              value={name}
              id="outlined-basic"
              label="Name"
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 col-lg-4 mb-3 d-none">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Store Format
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Store Format"
              >
                <MenuItem value={"Format 1"}>Format 1</MenuItem>
                <MenuItem value={"Format 2"}>Format 2</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-12 col-lg-4 mb-3 d-none">
            <TextField
              className="w-100"
              id="outlined-basic"
              label="State"
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 col-lg-4 mb-3 d-none">
            <TextField
              className="w-100"
              id="outlined-basic"
              label="City"
              variant="outlined"
              autoComplete="off"
              required
            />
          </div>
          <div className="col-12 mb-3">
            <TextField
              className="w-100"
              rows={3}
              multiline
              id="outlined-basic"
              label="Description"
              variant="outlined"
              autoComplete="off"
            />
          </div> */}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-dark px-4 me-4"
            onClick={() => {
              submit();
            }}
          >
            Create
          </button>
          <button
            className="btn btn-danger px-4"
            onClick={() => {
              navigate("/app/manage-stores");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStore;
