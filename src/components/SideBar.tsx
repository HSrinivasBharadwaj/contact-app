import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar:React.FC = () => {
  const navigate = useNavigate();
  const goToContactsPage = () => {
    navigate("/")
  }
  const goToChartsPage = () => {
    navigate("/dashboard")
  }
  return (
    <aside className='w-[20%]  bg-gray-800 text-white flex flex-col p-5 '>
      <nav>
        <ul>
          <li onClick={goToContactsPage} className='my-3 cursor-pointer'>
            <a>Contacts</a>
          </li>
          <hr />
          <li onClick={goToChartsPage} className='my-3 cursor-pointer'>
            <a>Charts and Map</a>
          </li>
          <hr />
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar