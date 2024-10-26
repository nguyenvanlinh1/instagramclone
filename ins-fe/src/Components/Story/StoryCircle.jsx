import React from 'react'
import { useNavigate } from 'react-router-dom';

const StoryCircle = ({item}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/story/${item.username}`)
  }
  return (
    <div className='cursor-pointer flex flex-col items-center' onClick={handleNavigate}>
        <img className='w-16 h-16 rounded-full' src={item?.userImage ? item?.userImage : "https://hzshop.ir/img/accountimg.png"}></img>
        <p className='text-sm font-bold'>{item?.username}</p>
    </div>

  )
}

export default StoryCircle