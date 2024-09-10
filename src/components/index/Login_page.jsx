import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Login_page = () => {
// set useState
  const [login_obj, setlogin_obj] = useState({ user_name: "", password: "" });
  const [userError, setuserError] = useState({ opacity: 0, tranform: '-100px', content: '' });
  const [spinner, setspinner] = useState(false)
//  create navigate
  const navigate = useNavigate()
// Main Login Fuction server intergrated
  async function User_Login() {
    const user_name = login_obj.user_name.trim();
    const password = login_obj.password.trim();
    // check fill data
    if (user_name === "" || password === "") {
      console.log('Invailed Username or Password.........')
    // show error message
      setuserError({ opacity: 1, tranform: 0, content: 'Invailed Username or Password' });
    //  close error message
      setTimeout(() => {
        setuserError({ opacity: 0, tranform: '-100px' });
      }, 2000);
    } 
    else {
      try {
        setspinner(true)
        console.log('successfully  send Your data to server....... ')
        console.log('Wait for server response.........')
        // send server data
        const response = await fetch(process.env.REACT_APP_API_URL + "/login_view", {
          method: "POST",
          body: JSON.stringify({
            user_name: user_name,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        })
        // render function
        if (response.ok) {
          const data = await response.json()
          switch (data.role) {
            case 'company':
              setspinner(false)
              navigate('/company-home')
              break
            case 'customer':
              setspinner(false)
              navigate('/customer-home')
              break
            case 'branch':
              setspinner(false)
              navigate('/branch-home')
              break
            case 'agent':
              setspinner(false)
              navigate('/agent')
              break
            default:
              setspinner(false)
              console.log('Role is Not Found..........')
          }
        }
        else {
        // server error message show 
          setspinner(false)
          response.json().then(res => setuserError({
            opacity: 1, tranform: 0
            , content: res.error
          }))
          // server error message hidden 
          setTimeout(() => {
            setuserError({ opacity: 0, tranform: '-100px' });
          }, 2000);
        }
      }
      // server is not running
      catch (e) {
        console.log(e)
        console.log('server is not response')
      }
    }
  }
  return (
    <>
      <div className="container ">
        <div className="col-12   d-flex justify-content-center align-items-center">
          <div className="row shadow-lg p-5 mt-5 bg-body  d-flex justify-content-center align-items-center ">
            <div className="p-3 col-10  bg-primary rounded">
              <h1 className="text-center">Login</h1>
            </div>
            {/* show error message */}
            <div style={{ opacity: userError.opacity, transform: ` translateY(${userError.tranform})` }} className=" bg-danger text-white alert text-md-center col-md-7 col-10 mt-3 alert-danger" role="alert">
              <h4 className="text-center">{userError.content}</h4>
            </div>
            {/* show spinner */}
            {spinner &&
              <div className=" d-flex col-10 spinner-border  text-info" role="status">
                <span className="visually-hidden ">Loading...</span>
              </div>}
            <div className="mb-3  d-flex justify-content-center align-items-center  row ">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Username :
              </label>
              <div className="col-10  col-md-7 ">
                <input
                  type=""
                  className="form-control "
                  id="staticEmail"
                  placeholder="Enter username"
                  value={login_obj.user_name}
                  onChange={(e) => {
                    setlogin_obj({ ...login_obj, user_name: e.target.value })
                  }}
                />
              </div>
            </div>
            <div className="mb-3 mt-3 d-flex justify-content-center align-items-center row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Password :
              </label>
              <div className="col-10 col-md-7">
                <input
                  type="password"
                  className="form-control "
                  id="inputPassword"
                  placeholder="Enter Password"
                  value={login_obj.password}
                  onChange={(e) =>
                    setlogin_obj({ ...login_obj, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={User_Login}
                className="btn btn-primary p-2 col-4 col-md-1  mt-3"
              >
                Submit
              </button>
            </div>
            <div className=" col-10 mt-4 d-flex justify-content-around p-3">
              <Link to={"/register"} className="  btn text-primary">
                Register
              </Link>
              <Link to={"/forget"} className="btn text-primary">
                Forget Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
