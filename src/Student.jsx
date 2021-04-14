import React, { Component , useEffect, useState, setState} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faLevelUpAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const url="http://localhost:8090/api/v1/student/"
const name="name=";
const email="&email=";

class Student extends Component{

    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
          id: '',
          name: '',
          email: '',
          dob: '',
          tipoModal:''
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
        delete this.state.form.id;
       await axios.post(url,this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }
    
    
      peticionPut=()=>{
        delete this.state.form.dob;
        axios.put(url+this.state.form.id+'?', name+this.state.form.name + email+this.state.form.email  ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }
    
    
      peticionDelete=()=>{
        axios.delete(url+this.state.form.id).then(response=>{
          this.setState({modalEliminar:false});
          this.peticionGet();
        })
    
      }
    
      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }
    
      choseStudent=(student)=>{
        this.setState({
          tipoModal: 'actualizar',
          form:{
            id: student.id,
            name: student.name,
            email: student.email,
            dob: student.dob
          }
        })
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
    
            <div classname="container-fluid">
              <br /><br /><br />
              <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Estudiante</button>
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
                        <button className="btn btn-primary"   onClick={()=>{this.choseStudent(student);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"  "}
                        <button className="btn btn-danger" onClick={()=>{this.choseStudent(student);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                      <label htmlFor="nombre">Id</label>
                        <input className="form-control" type="text" name="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                        <br />
                        <label htmlFor="nombre">Nombre</label>
                        <input className="form-control" type="text" name="name" onChange={this.handleChange} value={form?form.name: ''}/>
                        <br />
                        <label htmlFor="nombre">Email</label>
                        <input className="form-control" type="email" name="email" placeholder="example@domain.com" onChange={this.handleChange} value={form?form.email: ''}/>
                        <br />
                        <label htmlFor="capital_bursatil">DOB</label>
                        {this.state.tipoModal=='insertar'?
                        <input className="form-control" type="text"  name="dob" placeholder="YYYY-MM-DD" onChange={this.handleChange} value={form?form.dob: ''}/>
                        :
                        <input className="form-control" type="text"  name="dob" readOnly onChange={this.handleChange} value={form?form.dob: ''}/>
                        }
    
    
                      </div>
                    </ModalBody>
    
                    <ModalFooter>
                      {this.state.tipoModal=='insertar'?
                        <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                      </button>:
                     <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                     Actualizar
                   </button>
                    }
                       
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
              </Modal>
    
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody >
                   Estás seguro que deseas eliminar el Estudiante {form && form.nombre}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar:false})}>No</button>
                </ModalFooter>
              </Modal>
    
            </div>
            
      );
    }



}

export default Student;