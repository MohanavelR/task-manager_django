
import React, { useEffect, useState } from 'react'
const Branch = () => {
  const [company, setcompany] = useState([])
  const [user,setUser]=useState([])
  const [userError, setuserError] = useState({opacity:0,tranform:'-100px',content:'',color:'bg-danger'});
  const [formData, setFormData] = useState({
    company_name: '',
    branch_name:'',
    user_name: '',
    email: '',
    phone: '',
    password:'',
    role: 'branch'

});
function Post_Data(){
  const user_name=formData.user_name.trim()
  const password=formData.password.trim()
  const contact=formData.phone.trim()
  const email=formData.email.trim()
  const role=formData.role.trim()
  const branch_name=formData.branch_name.trim()
  const company_name=formData.company_name.trim()
  const finding =user.find(e=>e.user_name===user_name && e.password===password)
   
  if (user_name===''|| password===''|| contact===''|| email===""||role===''||branch_name===''){
   
    setuserError({...userError,opacity:1,tranform:0,color:'bg-danger',content:'Please Fill All Information'});   
    setTimeout(() => {
    setuserError({...userError,opacity:0,tranform:'-100px',color:'bg-danger'});
  }, 2000);
}
else if(finding===undefined){
  try{
    fetch(process.env.REACT_APP_API_URL + "/post", {
      method: "POST",
      body: JSON.stringify({
        user_name: user_name,
        password: password,
        role:role,
        email:email,
        contact:contact,
        company:company_name,
        branch_name:branch_name

      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      res.json().then((res) => setuserError({...userError,opacity:1,tranform:0,content:res.success,color:'bg-success'}));
    }).catch(req=>{console.error(req)})}
  
  catch (e){

  }

}
else{
  
  setuserError({opacity:1,tranform:0,color:'bg-danger',content:'Already exacts Your Username And Password'});   
    setTimeout(() => {
    setuserError({...userError,opacity:0,tranform:'-100px',color:'bg-danger'});
  }, 2000);
}
}
  
  useEffect(() => {
    try{
    fetch(process.env.REACT_APP_API_URL +'/active_data')
        .then(res => res.json()).
        then(res => setcompany(res.company)).catch(res=>{console.log(String(res)+'..........')
            console.log('Server is Not Response...')
        })
    }
    catch (e){
        console.log('Server is Not Response...')
    }
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
       
}, [company,user])

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
  return (
    <div className="container mt-5">
    <h2>Branch Registration</h2>
    <div style={{opacity:userError.opacity,transform:` translateY(${userError.tranform})`}} className= {`text-white ${userError.color} alert text-md-center col-md-7 col-10 mt-3 alert-danger`} role="alert">
                 <h4 className="text-center"> {userError.content}</h4>
              </div>
        <div className="mb-3">
            <label htmlFor="companyName" className="form-label">Company Name:</label>
            <select type="text" className="form-control" id="companyName" name="company_name" value={formData.company_name} onChange={handleChange} required >
              {company.map((e)=><option key={e.id} value={e.id}>{e.company_name}</option>)}
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="branch_name" className="form-label">Branch Name:</label>
            <input type="text" className="form-control" id="branch_name" name="branch_name" value={formData.registrationNumber} onChange={handleChange} required />
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
        {/* <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div> */}
        {/* <div className="mb-3">
            <label htmlFor="zip" className="form-label">Zip Code</label>
            <input type="text" className="form-control" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
        </div> */}
        <button onClick={Post_Data} type="submit" className="btn btn-primary">Register</button>
  
  </div>
  
  
  );
};

export default Branch