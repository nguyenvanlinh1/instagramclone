import React, { useEffect, useState } from 'react'
import MessageBar from './MessageBar'
import MessageContent from './MessageContent'
import { findAllChatByUserId } from '../../State/Chat/Action'
import { useDispatch } from 'react-redux'

const MainMessage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllChatByUserId());
  }, [])


  return (
    <div className="flex">
        <div className='w-[30%]'>
            <MessageBar/>
        </div>
        <div className='w-[70%]'>
            <MessageContent/>
        </div>
    </div>
  )
}

export default MainMessage