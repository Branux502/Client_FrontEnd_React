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
    data:[],
    modalInsertar: false,
    form:{
      name: '',
      email: '',
      dob: ''
    }
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data:response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPost=async ()=>{
   await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    }
    );
    console.log(this.state.form);
  }

  componentDidMount(){
    this.peticionGet();
  }


  render(){
    const {form}=this.state;
  return (

        <div classname="App">
          <br /><br /><br />
          <button className="btn btn-success" onClick={()=>this.modalInsertar()}>Agregar Estudiante</button>
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
            
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="name" onChange={this.handleChange} value={form.name}/>
                    <br />
                    <label htmlFor="nombre">Email</label>
                    <input className="form-control" type="text" name="email" onChange={this.handleChange} value={form.email}/>
                    <br />
                    <label htmlFor="capital_bursatil">DOB</label>
                    <input className="form-control" type="text"  name="dob" onChange={this.handleChange} value={form.dob}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button> 
                  
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>



        </div>
        
  );
}
}
export default App;
