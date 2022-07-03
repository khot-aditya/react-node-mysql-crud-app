// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Axios from 'axios';
import { useEffect } from 'react';

function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {

    // fetch('http://localhost:3001/api/get').then((response) => {
    //   console.log(response.data);
    // });

    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setUsers(response.data);
      })
  }, []);


  const submitForm = () => {
    Axios.post('http://localhost:3001/api/insert',
      {
        username: userName, password: password
      });


    setUsers([...users, { username: userName, password: password }]);

    setUserName('')
    setPassword('')
  }

  const updatePassword = () => {

    Axios.put(`http://localhost:3001/api/update`, {
      username: userName, password: password
    });

    setUserName('')
    setPassword('')

  }

  const deleteUser = (user) => {
    Axios.delete(`http://localhost:3001/api/delete/${user}`,);
  }

  return (
    <div className="App">
      <h1>Crud Application</h1>


      <input type="text" id='name' name='name' placeholder='Name'
        onChange={(e) => setUserName(e.target.value)} value={userName} />

      <br />

      <input type="text" id='subtext' name='subtext' placeholder='Subtext'
        onChange={(e) => setPassword(e.target.value)} value={password} />



      <br />
      <button onClick={submitForm}>Submit</button>
      <button onClick={updatePassword} >Update</button>

      {
        users.map((val) => {
          return <ul>{val.user_name} . {val.password} <button onClick={() => {
            setUserName(val.user_name)
            setPassword(val.password)
          }}>Update</button> <button onClick={() => { deleteUser(val.user_name) }}>Delete</button></ul>
        })
      }
    </div>
  );
}

export default App;
