import React from 'react';
import {Routes, Route} from "react-router-dom"
import Contacts from './Contacts';
import Dashboard from './Dashboard';
import ContactForm from './ContactForm';
import ContactViewDetails from './ContactViewDetails';

const MainContainer:React.FC = () => {
  return (
    <div className='w-[80%]'>
      {/* Defining the Routes Here */}
      <Routes>
        <Route path='/' element={<Contacts />}/>
        <Route path='/createcontacts' element={<ContactForm />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/contact/:id' element={<ContactViewDetails />}/>
      </Routes>
    </div>
  )
}

export default MainContainer