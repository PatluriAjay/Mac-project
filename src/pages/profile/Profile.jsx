import React, {useEffect} from 'react'
import {TextField} from "@mui/material"
import {LocalizationProvider} from "@mui/x-date-pickers"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getAccount, updateAccount } from '../../Api';
import { useNavigate } from 'react-router-dom';
import { compressImg } from "../../ImageCompressor";
import Swal from "sweetalert2";

function Profile() {
    const navigate = useNavigate();
    const fileIp = React.useRef(null);
    const [img, setImg] = React.useState('');
    const [imgFile, setImgFile] = React.useState(null);
    const [empObj, setEmpObj] = React.useState({
        business_name: "",
        account_type: "",
        email: "",
        notification_email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        account_code: "",
        pic_name: "",
        pic_phone: "",
        pic_email: "",
        validity_start_date: "",
        validity_end_date: "",
        no_of_employees: "",
        no_of_locations: "",
        plan_name: "",
        logo: ""
    })

    const handleReset = () => {
        if(fileIp.current) {
            fileIp.current.value = "";
            fileIp.current.type = "text";
            fileIp.current.type = "file";
        }
    };

    const handleFile = (event) => {
        console.log(event);
        setImg('https://placehold.co/250x100');
        const file = event.target.files[0];
        // console.log('Before compression', file.size)
        let splitfile = file.name;
        let extension = splitfile.split('.').pop();
        if(extension === 'png' || extension === 'PNG' || extension === 'jpg' || extension === 'JPG' || extension === 'jpeg' || extension === 'JPEG') {
            console.log('valid file');
            var reader = new FileReader();
            if(event.target.files[0]){
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (e)=>{
                    setImg(e.target.result);
                }
                compressImg(event.target.files[0]).then(img => {
                    setImgFile(img);
                    // console.log('After compression', img.size)
                });
            }
        }else{
            Swal.fire({
                text: 'Invalid file format. Only .png, .jpg files are allowed',
                icon: 'warning',
                heightAuto: false
            })
            return
        }
    }

    
    const [userRole, setUserRole] = React.useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        setUserRole(userData.role); // Extract the role from userData
    }, []);

    const submit = async () => {
        console.log(empObj);
        let emalval = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
        if(!emalval.test(empObj.notification_email)){
            Swal.fire({
                text: 'Please enter valid Notification Email',
                icon: 'warning',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            });
        }else if(!empObj.pic_name){
            Swal.fire({
                text: 'Pic Name is required!',
                icon: 'warning',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            });
        }else{
            let formData = new FormData();
            for(let val of Object.keys(empObj)){
                if(val === "logo" && !imgFile){
                }else if(val === "logo" && imgFile){
                    formData.append(val, imgFile);
                }else if(val === "email"){
                    formData.append(val, empObj[val].toLowerCase());
                }else{
                    formData.append(val, empObj[val]);
                }
            }
            let apiData = await updateAccount(formData);
            console.log(apiData);
            if(apiData.status === "S"){
                Swal.fire({
                    text: 'Profile updated successfully',
                    icon: 'success',
                    heightAuto: false,
                    showConfirmButton: false,
                    timer: 3000
                }).then(() => {
                    window.location.reload();
                })
            }
        }
    }

    useEffect(() => {
      (async () => {
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        let account_code = userData.account_code;
        let apiData = await getAccount(account_code);
        console.log(apiData);
        if(apiData.status === "S"){
            if(!apiData.result_info.logo){
                setImg('https://placehold.co/250x100');
            }
            setEmpObj(apiData.result_info);
        }else{
            setImg('https://placehold.co/250x100');
            if(apiData.status === 'F' && apiData.message === "Unauthorized - Missing token"){
                Swal.fire({
                    text: "Please login with your credentials",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 3000
                }).then(() => {
                    localStorage.clear();
                    navigate('/app/login');
                })
            }
            if(apiData.status === 'F' && apiData.message === "Unauthorized - Invalid token"){
                Swal.fire({
                    text: "Please login with your credentials",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 3000
                }).then(() => {
                    localStorage.clear();
                    navigate('/app/login');
                })
            }
        }
      })()
    }, [navigate])

    const [companyType, setCompanyType] = React.useState('');
    const handleCompanyTypeChange = (e) => {
        setCompanyType(e.target.value);
      };
      
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Profile</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 text-center">
                        {/* <h5 className="mb-3"><strong>Logo</strong></h5> */}
                        {!imgFile && <img src={empObj.logo ? 'https://attendlog.com/api/files/account_logos/'+empObj.logo: img} alt="" style={{maxHeight: '100px', maxWidth: '100%'}} />}
                        {imgFile && <img src={img} alt="" style={{maxHeight: '100px', maxWidth: '100%'}} />}
                        <br />
                        <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                        <button className="btn btn-dark px-4 my-3" onClick={() => {fileIp.current.click();}}>Upload</button>
                    </div>
                    <div className="row">
                        {userRole === 3 && (
                            <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                              <div className="col-12 col-lg-4">
                                <label className="form-label">Type</label>
                              </div>
                              <div className="col-12 col-lg-8">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={companyType}
                                    onChange={handleCompanyTypeChange}
                                >
                                  <option value="">Select Company</option>
                                  <option value="Company">Company</option>
                                  <option value="Individual">Individual</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Company Name</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.business_name || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, business_name: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Main PIC Name</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.business_name || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, business_name: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Email</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.notification_email || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, notification_email: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Mobile Number</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.phone || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, phone: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Validity Start Date</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="date" 
                                    className="form-control" 
                                    value={empObj.validity_start_date || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, validity_start_date: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">Validity End Date</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="date" 
                                    className="form-control" 
                                    value={empObj.validity_end_date || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, validity_end_date: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        {!(companyType === 'Individual') && (
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">GST</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.no_of_employees || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, no_of_employees: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        )}
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">PAN</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.no_of_locations || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, no_of_locations: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">City</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.no_of_locations || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, no_of_locations: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row align-items-center">
                                <div className="col-12 col-lg-4">
                                    <label className="form-label">State</label>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    value={empObj.no_of_locations || ''}
                                    onChange={(ev) => {
                                        setEmpObj({...empObj, no_of_locations: ev.target.value})
                                    }}
                                    />
                                </div>
                            </div>     
                        </div>
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-12 col-lg-2">
                                    <label className="form-label">Address</label>
                                </div>
                                <div className="col-12 col-lg-10">
                                    <textarea className="form-control" placeholder="" rows={1} />
                                </div>
                            </div>     
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                  <button className='btn btn-dark' onClick={() => {submit()}}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
