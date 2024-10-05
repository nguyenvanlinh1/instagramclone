import React from 'react'
import Progressbar from './Progressbar';
import { useNavigate } from 'react-router-dom';

const StoryCircle = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/story/")
  }
  return (
    <div className='cursor-pointer flex flex-col items-center' onClick={handleNavigate}>
        <img className='w-16 h-16 rounded-full' src='https://th.bing.com/th/id/OIP.6m6AZ7QHFj5JUAc6eWE6CQHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7'></img>
        <p>username</p>
    </div>

  )
}

export default StoryCircle