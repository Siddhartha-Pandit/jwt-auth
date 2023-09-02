import { useState } from "react";
import{Navigate} from 'react-router-dom'
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect]=useState(false)
    const submit = async (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
          setRedirect(true)
    };
    if (redirect){
        return<Navigate to="/login" replace />
    }
    

    return (
        <>

            <main className="form-signin w-100 m-auto">
                <form onSubmit={submit}>

                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingPassword" placeholder="Name" onChange={e => setName(e.target.value)} />
                        <label htmlFor="floatingPassword">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
                </form>
            </main>
        </>
    );
}

export default Register;
