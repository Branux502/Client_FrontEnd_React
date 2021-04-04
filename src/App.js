import logo from './logo.svg';
import './App.css';
import { Component, useEffect, useState, setState } from 'react';
import { useLayoutEffect } from 'react/cjs/react.development';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';


const url="http://localhost:8090/api/v1/student"

class App extends Component {

  state={
    data:[]
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data:response.data});

    })
  }

  componentDidMount(){
    this.peticionGet();
  }


  render(){
  return (

        <div classname="App">
          <br></br>
          <button className="btn btn-success">Agregar Estudiante</button>
          <br></br>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>DOB</th>
                  <th>Edad</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(student=>{
                    return(
                      <tr>

                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.dob}</td>
                    <td>{student.age}</td>
                    <td>
                    <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                    {"  "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>


          
        </div>
        
  );
}
}
export default App;
