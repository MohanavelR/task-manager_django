import React, { useEffect, useState } from 'react'



const Agent = () => {
// usestatus
    const [user,setUser]=useState([])
    const [userError, setuserError] = useState({opacity:0,tranform:'-100px',content:'',color:'bg-danger'});
    const [company, setcompany] = useState([])
    const [branch, setbranch] = useState([])

// post datases
    const [formData, setFormData] = useState({
        agent_name:'',
        company_name: '',
        branch_name:'',
        user_name: '',
        email: '',
        phone: '',
        password:'',
        role: 'agent',
        collector_id:''
    
});
// main function this intergrate server
    function Post_Data(){
        const agent_name=formData.agent_name.trim()
        const user_name=formData.user_name.trim()
        const password=formData.password.trim()
        const contact=formData.phone.trim()
        const email=formData.email.trim()
        const role=formData.role.trim()
        const branch_name=Number(formData.branch_name)
        const company_name=Number(formData.company_name)
        const colloctor_id=formData.collector_id.trim()
        const finding =user.find(e=>e.user_name==user_name && e.password==password)
       
        // checking all fields
        if (user_name===''|| password===''|| contact===''|| email===""||role===''||branch_name===''||colloctor_id===''){
            console.log('Invailed Username or Password.........') 
            setuserError({...userError,opacity:1,tranform:0,color:'bg-danger',content:'Please Fill All Information'});   
            setTimeout(() => {
            setuserError({...userError,opacity:0,tranform:'-100px'});
          }, 2000);        

      }
      else if(finding===undefined){
        // post value in server
        try{
          fetch(process.env.REACT_APP_API_URL + "/post", {
            method: "POST",
            body: JSON.stringify({
              agent_name:agent_name, 
              user_name: user_name,
              password: password,
              role:role,
              email:email,
              contact:contact,
              company:company_name,
              branch:branch_name,
              collector_id:colloctor_id
      
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
          setuserError({...userError,opacity:0,tranform:'-100px'});
        }, 2000);
      
      }
    }
// set branch in select element
function SetBranch(e) {
         const values = e.target.value
         fetch(process.env.REACT_APP_API_URL+`/branches/${values}`)        
        .then((res) => res.json())
        .then((data) => setbranch(data))
        .catch(req => { console.log(String(req)) })
         setFormData({...formData,company_name:values})
    }
// set post data values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
// set company in select element
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

    return (
        <div className="container mt-5">
            <h2>Agent Registration</h2>
            <div style={{opacity:userError.opacity,transform:` translateY(${userError.tranform})`}} className= {`text-white ${userError.color} alert text-md-center col-md-7 col-10 mt-3 alert-danger`} role="alert">
                 <h4 className="text-center"> {userError.content}</h4>
              </div>
            <div className="form-group">
                <label>AgentName:</label>
                <input type="text" className="form-control" name="agent_name" value={formData.agent_name} onChange={handleChange} required />
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
                <label> Collector Id</label>
                <input type="text" className="form-control" name="collector_id" value={formData.collector_id} onChange={handleChange} required />
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
export default Agent