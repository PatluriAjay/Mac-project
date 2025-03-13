import React, { useState } from "react";
import "./reset.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../Api";
import Swal from "sweetalert2";
import { RemoveRedEye } from "@mui/icons-material";
function ResetPassword() {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    account_code: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const submit = async () => {
    let formData = { ...userObj };
    if (!formData.oldPassword) {
      Swal.fire({
        text: "Old password required!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (!userObj.newPassword) {
      Swal.fire({
        text: "New password required!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (userObj.oldPassword === userObj.newPassword) {
      Swal.fire({
        text: "New password should not match with old password!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (!userObj.confirmPassword) {
      Swal.fire({
        text: "Confirm password required!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else if (userObj.confirmPassword !== userObj.newPassword) {
      Swal.fire({
        text: "New password should match with confirm password!",
        showConfirmButton: false,
        icon: "warning",
        timer: 3000,
      });
      return;
    } else {
      let userData = JSON.parse(localStorage.getItem("userData") || "{}");
      formData.account_code = userData.account_code;
      let resData = await changePassword(formData);
      if (resData.status === "S") {
        Swal.fire({
          text: "Password changed, Redirecting to Login!",
          showConfirmButton: false,
          icon: "success",
          timer: 3000,
        }).then(() => {
          localStorage.clear();
          navigate("/app/login");
        });
      } else if (resData.status === "E" && resData.result_code === 404) {
        Swal.fire({
          text: "User not found",
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      } else if (resData.status === "E" && resData.result_code === 401) {
        Swal.fire({
          text: "Invalid Old password",
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      } else if (resData.status === "E" && resData.result_code === 400) {
        Swal.fire({
          text: "New password and confirm password does not match",
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      }else if(resData.status === 'F' && resData.message === "Unauthorized - Missing token"){
        Swal.fire({
            text: "Please login with your credentials",
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            localStorage.clear();
            navigate('/app/login');
        })
      }else if(resData.status === 'F' && resData.message === "Unauthorized - Invalid token"){
          Swal.fire({
              text: "Please login with your credentials",
              icon: 'warning',
              showConfirmButton: false,
              timer: 3000
          }).then(() => {
              localStorage.clear();
              navigate('/app/login');
          })
      }else {
        Swal.fire({
          text: JSON.stringify(resData),
          showConfirmButton: false,
          icon: "warning",
          timer: 3000,
        });
        return;
      }
    }
  };

  return (
    <div className="resetContainer">
      <div className="row justify-content-center px-0 mx-0">
        <div className="col-12 px-0">
          <h5 className="create-employee mb-3">Reset Password</h5>
        </div>
      </div>
      <div className="row justify-content-center px-0 mx-0" style={{boxShadow:"0 0 2px 2px #e2e1e2", border:"none", borderRadius:"10px"}}>
        <div className="col-12 h-100 bg-white p-4 card">
          <div className="row mb-3">
            <div className="col-12 col-lg-4">
              <label className="form-label">Old Password</label>
            </div>
            <div className="col-12 col-lg-8">
              <div className="password-container">
              <input 
                  type={showPassword1 ? "text" : "password"} 
                  className="form-control password" 
                />
                <span className="toggle-icon" onClick={() => {
                      setShowPassword1(!showPassword1);
                    }}>
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-lg-4">
              <label className="form-label">New Password</label>
            </div>
            <div className="col-12 col-lg-8">
              <div className="password-container">
              <input 
                  type={showPassword2 ? "text" : "password"} 
                  className="form-control password" 
                />
                <span className="toggle-icon" onClick={() => {
                      setShowPassword2(!showPassword2);
                    }}>
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-lg-4">
              <label className="form-label">Confirm Password</label>
            </div>
            <div className="col-12 col-lg-8">
              <div className="password-container">
              <input 
                  type={showPassword3 ? "text" : "password"} 
                  className="form-control password" 
                />
                <span className="toggle-icon" onClick={() => {
                      setShowPassword3(!showPassword3);
                    }}>
                  {showPassword3 ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <button
              className="btn btn-dark px-4"
              onClick={() => {
                submit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
