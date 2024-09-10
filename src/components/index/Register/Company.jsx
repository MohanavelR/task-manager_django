import React,{useEffect, useState} from 'react';

const Company = () => {
const [user,setUser]=useState([])
const [spinner, setspinner] = useState(false)
  const [userError, setuserError] = useState({opacity:0,tranform:'-100px',content:'',color:'bg-danger'});
  const [formData, setFormData] = useState({
    company_name: '',
    user_name: '',
    email: '',
    phone: '',
    password:'',
    role: 'company'

});


 async function Post_Data(){
  const user_name=formData.user_name.trim()
  const password=formData.password.trim()
  const contact=formData.phone.trim()
  const email=formData.email.trim()
  const role=formData.role.trim()
  const company_name=formData.company_name.trim()
  const finding =user.find(e=>e.user_name==user_name && e.password==password)
  if (user_name===''|| password===''|| contact===''|| email===""||role===''){
    console.log('Invailed Username or Password.........') 
    setuserError({...userError,opacity:1,tranform:0,color:'bg-danger',content:'Please Fill All Information'});   
    setTimeout(() => {
    setuserError({...userError,opacity:0,tranform:'-100px'});
  }, 2000);
}


else if(finding===undefined) {
  try{
    setspinner(true)
    fetch(process.env.REACT_APP_API_URL + "/post", {
      method: "POST",
      body: JSON.stringify({
        user_name: user_name,
        password: password,
        role:role,
        email:email,
        contact:contact,
        company_name:company_name
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      res.json().then((res) => (setuserError({...userError,opacity:1,tranform:0,content:res.success,color:'bg-success'})));
    }).catch(req=>{console.error(req)})}
  
  catch (e){
}
finally{
setspinner(false)
}

}
else{
  
  setuserError({opacity:1,tranform:0,color:'bg-danger',content:'Already exacts Your Username And Password'});   
    setTimeout(() => {
    setuserError({...userError,opacity:0,tranform:'-100px'});
  }, 2000);
}
}
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};
useEffect(()=>{
  const fetchData = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/user');
      const data = await res.json();
      setUser(data);
   // Set user array with data
    } catch (error) {
      console.log("Error fetching data: ", String(error));
    }
  };
  fetchData();
  
},[user])
  return(
   <div className="container mt-5">
  <h2>Company Registration</h2>
              <div style={{opacity:userError.opacity,transform:` translateY(${userError.tranform})`}} className= {`text-white ${userError.color} alert text-md-center col-md-7 col-10 mt-3 alert-danger`} role="alert">
                 <h4 className="text-center"> {userError.content}</h4>
              </div>
              {spinner &&
              <div className=" d-flex col-10 spinner-border  text-info" role="status">
                <span className="visually-hidden ">Loading...</span>
              </div>}
      <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name:</label>
          <input type="text" className="form-control" id="companyName" name="company_name" value={formData.company_name} onChange={handleChange} required />
      </div>

      <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
          <label htmlFor="phone" className="form-label">PhoneNumber:</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="mb-3">
          <label htmlFor="user_name" className="form-label">Username:</label>
          <input type="text" className="form-control" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <button onClick={Post_Data} type="submit" className="btn btn-primary">Register</button>

</div>

)}

export default Company