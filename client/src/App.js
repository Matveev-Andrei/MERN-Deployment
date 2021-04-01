import React from 'react';
import { Link, Router } from '@reach/router';
import Results from './components/Results';
import AddPet from './components/AddPet';
import Details from './components/Details';
import UpdatePet from './components/UpdatePet';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Results path = "/"/>
        <AddPet path = "/pets/new" />
        <Details path = "/pet/:id" />
        <UpdatePet path = "/pet/:id/edit" />
      </Router>
      
    </div>
  );
}

export default App;
