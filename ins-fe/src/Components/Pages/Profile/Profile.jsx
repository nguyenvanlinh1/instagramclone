import React from 'react'
import MainProfile from '../../ProfileComponent/MainProfile'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='px-36'>
      <MainProfile/>
      <Outlet />
    </div>
  )
}

export default Profile