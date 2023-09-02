import { useState } from "react";
import { Navigate } from 'react-router-dom'
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const [imageFile, setImageFile] = useState(null); 
    const [documentFile, setDocumentFile] = useState(null); 
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (documentFile) {
            formData.append('document', documentFile);
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }
        if (documentFile) {
            formData.append('document', documentFile);
        }
        fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            body: formData,
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
    if (redirect) {
        return <Navigate to="/login" replace />
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
                    <div>
                        <label htmlFor="image">Image Upload:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={e => setImageFile(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            id="document"
                            name="document"
                            accept=".pdf,.doc,.docx"
                            onChange={e => setDocumentFile(e.target.files[0])}
                         
                        />
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
                </form>
            </main>
        </>
    );
}

export default Register;
