// import React, { useEffect, useState } from 'react'
// import "../createemployee/create.css"
// import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
// import { useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2";
// import { compressImg } from '../../../ImageCompressor';

// function EditEmployee() {
//     const navigate = useNavigate();
//     const [role, setRole] = React.useState(null)
//     const [empObj, setEmpObj] = React.useState({
//         'name': 'Arun',
//         'employee_number': '001',
//         'department': 'ER',
//         'designation': 'Marketing Head',
//         'phone_number': '7680891376',
//         'email_id': 'arun@gmail.com',
//         'store_name': '',
//         'store_code': '1',
//         'reporting_manager': 'Ajay',
//         'mat_id': '',
//         'organization_name': '',
//         'employee_type': 'Employee'
//     })

//     const submit = async () => {
        
//     }

//     const fileIp = React.useRef(null);
//     const [img, setImg] = React.useState('https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg');
//     const handleReset = () => {
//       if(fileIp.current) {
//           fileIp.current.value = "";
//           fileIp.current.type = "text";
//           fileIp.current.type = "file";
//       }
//     };
//     const handleFile = (event) => {
//       console.log(event);
//       setImg('https://placehold.co/250x250');
//       const file = event.target.files[0];
//       console.log('Before compression', file.size)
//       let splitfile = file.name;
//       let extension = splitfile.split('.').pop();
//       if(extension === 'png' || extension === 'PNG' || extension === 'jpg' || extension === 'JPG' || extension === 'jpeg' || extension === 'JPEG') {
//           console.log('valid file');
//           var reader = new FileReader();
//           if(event.target.files[0]){
//               reader.readAsDataURL(event.target.files[0]);
//               reader.onload = (e)=>{
//                   setImg(e.target.result);
//               }
//               compressImg(event.target.files[0]).then(img => {
//                   setEmpObj({...empObj, logo: img});
//                   console.log('After compression', img.size)
//               });
//           }
//       }else{
//           Swal.fire({
//               text: 'Invalid file format. Only .png, .jpg files are allowed',
//               icon: 'warning',
//               heightAuto: false
//           })
//           return
//       }
//     }
    
//     useEffect(() => {
//         (async () => {
//             let userData = JSON.parse(localStorage.getItem('userData') || '{}');
//             setRole(userData.role);
//         })()
//     },[navigate])
//     return (
//         <div className='employeeContainer'>
//             <h5 className='create-employee'>Edit Employee</h5>
//             <div className="card forms-card">
//                 <div className="row mb-3 align-items-center">
//                     <div className="col-12 col-lg-3 text-center">
//                         <h5 className="mb-3"><strong>Profile Pic</strong></h5>
//                         <img src={img} alt="" style={{maxHeight: '150px', maxWidth: '100%'}} />
//                         <br />
//                         <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
//                         <button className="btn btn-dark px-4 my-3" onClick={() => {fileIp.current.click();}}>Upload</button>
//                     </div>
//                         <div className="col-12 col-lg-9">
//                             <div className="row">
//                                 <div className="col-12 col-lg-6 mb-3">
//                                     <TextField className='w-100' id="outlined-basic" label="Name" variant="outlined" autoComplete="off" value={empObj.name} required 
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, name: ev.target.value})
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="col-12 col-lg-6 mb-3">
//                                     <TextField className='w-100' id="outlined-basic" label="Employee Number" value={empObj.employee_number || ''} variant="outlined" autoComplete="off" required 
//                                         onChange={(ev) => {
//                                             let val = ev.target.value.toLowerCase();
//                                             let regex = /[^a-zA-Z0-9_-]/gi;
//                                             setEmpObj({...empObj, employee_number: val.replace(regex, "")})
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="col-12 col-lg-6 mb-3">
//                                     <TextField className='w-100' id="outlined-basic" label="Department" value={empObj.department || ''} variant="outlined" autoComplete="off" required 
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, department: ev.target.value})
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="col-12 col-lg-6 mb-3">
//                                     <TextField className='w-100' id="outlined-basic" label="Designation" value={empObj.designation || ''} variant="outlined" autoComplete="off" required 
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, designation: ev.target.value})
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="col-12 col-lg-6 mb-3">
//                                     <TextField className='w-100' id="outlined-basic" label="Phone Number" variant="outlined" value={empObj.phone_number || ''} autoComplete="off" required
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, phone_number: ev.target.value})
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="col-12 col-lg-6 mb-3">
//                                     <TextField className='w-100' id="outlined-basic" label="Email" variant="outlined" value={empObj.email_id || ''} autoComplete="off" 
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, email_id: ev.target.value})
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         {+role === 2 && <>
//                             <div className="col-12 col-lg-4 mb-3">
//                                 <FormControl fullWidth>
//                                     <InputLabel id="demo-simple-select-label">Store</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         value={empObj.store_code}
//                                         label="Store"
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, store_code: ev.target.value})
//                                         }}
//                                     >
//                                         <MenuItem value={'1'}>Store 1</MenuItem>
//                                         <MenuItem value={'2'}>Store 2</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </div>
//                             <div className="col-12 col-lg-4 mb-3">
//                                 <TextField className='w-100' id="outlined-basic" label="Reporting Manager" variant="outlined" value={empObj.reporting_manager || ''} autoComplete="off" 
//                                     onChange={(ev) => {
//                                         setEmpObj({...empObj, reporting_manager: ev.target.value})
//                                     }}
//                                 />
//                             </div>
//                             <div className="col-12 col-lg-4 mb-3">
//                                 <FormControl fullWidth>
//                                     <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-label"
//                                         id="demo-simple-select"
//                                         value={empObj.employee_type}
//                                         label="Employee Type"
//                                         onChange={(ev) => {
//                                             setEmpObj({...empObj, employee_type: ev.target.value})
//                                         }}
//                                     >
//                                         <MenuItem value={'Employee'}>Employee</MenuItem>
//                                         <MenuItem value={'Contractor'}>Contractor</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </div>
//                         </>}
//                     </div>
//                 <div className="text-center">
//                     <button className='btn btn-dark px-4 me-4' onClick={() => {submit()}}>Update</button>
//                     <button className='btn btn-danger px-4' onClick={() => {navigate('/app/manage-employees')}}>Cancel</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EditEmployee

import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { compressImg } from "../../../ImageCompressor";
import Swal from "sweetalert2";

function EditEmployee() {
  const navigate = useNavigate();
  const fileIp = React.useRef(null);
  const [img, setImg] = React.useState("https://placehold.co/250x100");
    const [empObj, setEmpObj] = React.useState({
        'name': 'Arun',
        'employee_number': '001',
        'department': 'ER',
        'designation': 'Marketing Head',
        'phone_number': '7680891376',
        'email_id': 'arun@gmail.com',
        'store_name': '',
        'store_code': '1',
        'reporting_manager': 'Ajay',
        'mat_id': '',
        'organization_name': '',
        'employee_type': 'Employee'
    })
    const handleStoreChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const storeCode = e.target.value;
        const storeName = selectedOption.text !== 'Select Store' ? selectedOption.text : '';
        
        setEmpObj({
          ...empObj,
          'store_name': storeName,
          'store_code': storeCode || '1'
        });
      };
    const handleEmployeeChange = (e) => {
        const employeeOption = e.target.options[e.target.selectedIndex];
        const employeeType = e.target.value;
        const employeeTypeName = employeeOption.text !== 'Select Employee' ? employeeOption.text : '';
        
        setEmpObj({
          ...empObj,
          'employee_type': employeeTypeName,
        });
      };
  const [checked, setChecked] = React.useState(false);

  const handleReset = () => {
    if (fileIp.current) {
      fileIp.current.value = "";
      fileIp.current.type = "text";
      fileIp.current.type = "file";
    }
  };

  const handleFile = (event) => {
    console.log(event);
    setImg("https://placehold.co/250x100");
    const file = event.target.files[0];
    console.log("Before compression", file.size);
    let splitfile = file.name;
    let extension = splitfile.split(".").pop();
    if (
      extension === "png" ||
      extension === "PNG" ||
      extension === "jpg" ||
      extension === "JPG" ||
      extension === "jpeg" ||
      extension === "JPEG"
    ) {
      console.log("valid file");
      var reader = new FileReader();
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
          setImg(e.target.result);
        };
        compressImg(event.target.files[0]).then((img) => {
          setEmpObj({ ...empObj, logo: img });
          console.log("After compression", img.size);
        });
      }
    } else {
      Swal.fire({
        text: "Invalid file format. Only .png, .jpg files are allowed",
        icon: "warning",
        heightAuto: false,
      });
      return;
    }
  };
  const options = [
    "Create & Manage Employees",
    "Create & Manage Store Types",
    "Create & Manage Stores",
    "Create & Manage Activities",
    "Create & Manage Tasks",
    "Create & Manage Items",
    "Create & Manage RFQ",
  ];

  const [checkedItems, setCheckedItems] = React.useState(
    new Array(options.length).fill(false)
  );

  const handleChange = (index) => {
    setCheckedItems((prev) => {
      const updatedChecks = [...prev];
      updatedChecks[index] = !updatedChecks[index];
      return updatedChecks;
    });
  };
  return (
    <div className="employeeContainer">
      <h5 className="create-employee">Edit Employee</h5>
      <div className="card forms-card">
        <div className="row mb-3">
          {/* <div className="col-12 text-center">
            <h5 className="mb-3 subheading">
              <strong>Logo</strong>
            </h5>
            <img
              src={img}
              alt=""
              style={{ maxHeight: "100px", maxWidth: "100%" }}
            />
            <br />
            <input
              type="file"
              accept=".png, .jpg, .jpeg, .webp"
              hidden
              ref={fileIp}
              onClick={handleReset}
              onChange={(ev) => {
                handleFile(ev);
              }}
            />
            <button
              className="btn btn-dark px-4 my-3"
              onClick={() => {
                fileIp.current.click();
              }}
            >
              Upload
            </button>
          </div> */}
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Name</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" value={empObj.name || ""} onChange={(ev) => {
                    setEmpObj({...empObj, name: ev.target.value})
                }} />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Employee Number</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" value={empObj.employee_number || ""} onChange={(ev) => {
                    setEmpObj({...empObj, employee_number: ev.target.value})
                }} />
              </div>
            </div>
          </div>

          {/* email */}
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Mobile Number</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" value={empObj.phone_number || ""} onChange={(ev) => {
                    setEmpObj({...empObj, phone_number: ev.target.value})
                }} />
              </div>
            </div>
          </div>
          {/* phone */}
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Designation</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" value={empObj.designation || ""} onChange={(ev) => {
                    setEmpObj({...empObj, designation: ev.target.value})
                }} />
              </div>
            </div>
          </div>
          {/* GST */}
          {/* <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Email</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" value={empObj.email_id || ""} onChange={(ev) => {
                    setEmpObj({...empObj, email_id: ev.target.value})
                }} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label"> Store</label>
              </div>
              <div className="col-12 col-lg-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={empObj.store_code}
                  onChange={handleStoreChange}
                >
                  <option value="">Select Store</option>
                  <option value="1">Store 001</option>
                  <option value="2">Store 002</option>
                </select>
              </div>
            </div>
          </div> */}

          
          
          {/* <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Reporting Manager</label>
              </div>
              <div className="col-12 col-lg-8">
                <input type="text" className="form-control" placeholder="" value={empObj.reporting_manager || ""} onChange={(ev) => {
                    setEmpObj({...empObj, reporting_manager: ev.target.value})
                }} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Employee Type</label>
              </div>
              <div className="col-12 col-lg-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={empObj.employee_type}
                  onChange={handleEmployeeChange}
                >
                  <option value="">Select Employee</option>
                  <option value="Employee">Employee</option>
                  <option value="Contractor">Contractor</option>
                </select>
              </div>
            </div>
          </div> */}
        </div>
        <div className="text-center">
          <button className="btn btn-dark px-4 me-4" onClick={() => {}}>
            Update
          </button>
          <button
            className="btn btn-danger px-4"
            onClick={() => {
              navigate("/app/manage-employees");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;