import logo from './logo.svg';
import './App.css';
import { Component, useEffect, useState, setState } from 'react';
import { useLayoutEffect } from 'react/cjs/react.development';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faLevelUpAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Link , Redirect} from 'react-router-dom';


import Home from "./Home"
import Student from "./Student"
import Teacher from "./Teacher"
import NavBar from "./NavBar"



class App extends Component {
  render(){
    return<Router>
      <NavBar/>
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Student" component={Student}/>
      <Route exact path="/Teacher" component={Teacher}/>
      <Route />
      </Switch>
    </Router>
  }
}
export default App;
