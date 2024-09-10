import React, { useEffect, useState } from 'react'

const Customer = () => {
  const [user,setUser]=useState([])
  const [userError, setuserError] = useState({opacity:0,tranform:'-100px',content:'',color:'bg-danger'});
  const [company, setcompany] = useState([])
  const [branch, setbranch] = useState([])
  const [formData, setFormData] = useState({
      customer_name:'',
      company_name: '',
      branch_name:'',
      user_name: '',
      email: '',
      phone: '',
      password:'',
      role: 'customer',
      account:''
  
  });
  function Post_Data(){
    const customer_name=formData.customer_name.trim()  
    const user_name=formData.user_name.trim()
      const password=formData.password.trim()
      const contact=formData.phone.trim()
      const email=formData.email.trim()
      const role=formData.role.trim()
      const branch_name=(formData.branch_name)
      const company_name=(formData.company_name)
      const account=formData.account.trim()
      const finding =user.find(e=>e.user_name==user_name && e.password==password)
     
      if (user_name===''|| password===''|| contact===''|| email===""||role===''||branch_name===''||account===''||customer_name===''){
        console.log('Invailed Username or Password.........') 
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
            customer_name:customer_name,
            user_name: user_name,
            password: password,
            role:role,
            email:email,
            contact:contact,
            company:company_name,
            branch:branch_name,
            account_details:account
    
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
     

function SetBranch(e) {
      const values = e.target.value

       
      fetch(process.env.REACT_APP_API_URL+`/branches/${values}`)        
      .then((res) => res.json())
      .then((data) => setbranch(data))
      .catch(req => { console.log(String(req)) })
       setFormData({...formData,company_name:values})
  }
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

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
      console.log('Successfully Fetch the data')
    return clearInterval(fetchData)     
  }, [])

  return (
      <div className="container mt-5">
          <h2>Customer Registration</h2>
          <div style={{opacity:userError.opacity,transform:` translateY(${userError.tranform})`}} className= {`text-white ${userError.color} alert text-md-center col-md-7 col-10 mt-3 alert-danger`} role="alert">
                 <h4 className="text-center"> {userError.content}</h4>
              </div>

          <div className="form-group">
              <label>Customer Name:</label>
              <input type="text" className="form-control" name="customer_name" value={formData.customer_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
              <label>Email:</label>
              <input  type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
              <label>Phone:</label>
              <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
              <label>Company Name:</label>
              <select name="company_name" id="company" className='form-select' onChange={SetBranch} >
                  <option value=""></option>
                  {company.map((e) => <option key={e.id} value={e.id}>{e.company_name}</option>)}
              </select>
          </div>
          <div className="form-group">
              <label>Branch Name:</label>
              <select name="branch_name" id="" className='form-select' onClick={handleChange} >
                 <option value=""></option>
                  {branch.map((e) => <option key={e.id} value={e.id}>{e.branch_name}</option>)}
              </select>
          </div>
          <div className="form-group">
              <label> Account:</label>
              <input type="" className="form-control" name="account" value={formData.account} onChange={handleChange} required />
          </div>
          <div className="form-group">
              <label>User Name:</label>
              <input type="text" className="form-control" name="user_name" value={formData.user_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button onClick={Post_Data} type="submit" className="btn btn-primary">Register</button>

      </div>
  );
};


export default Customer