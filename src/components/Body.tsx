import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'

const Body:React.FC = () => {
  return (
    <div className='flex h-screen'>
      {/* SideBar component */}
        <SideBar />
        {/* Main component */}
        <MainContainer />
    </div>
  )
}

export default Body