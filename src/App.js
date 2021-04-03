import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useLayoutEffect } from 'react/cjs/react.development';

function App() {

  const[Student, setStudent] = useState([])
  useEffect(() => {
    ObtenerDatos()
  }, [] )

  const ObtenerDatos = async () => {
    const data = await fetch('http://localhost:8090/api/v1/student')
    const users = await data.json()
    setStudent(users)
  }


  return (

        <div>
          <ul>
            {
              Student.map( item => (
                <li key={item.id}>{item.name} - {item.email} - {item.dob} - {item.age}</li>
                ))
            }           
          </ul>
        </div>
        
  );
}

export default App;
