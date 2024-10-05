import React from 'react'
import { TbCircleDashed } from "react-icons/tb";
import { BsThreads } from "react-icons/bs";
const ProfileUserDetails = () => {
  return (
    <div className='py-10 w-full'>
        <div className='flex items-center'>
            <div className='w-[15%]'>
                <img className='w-32 h-32 rounded-full' src='https://th.bing.com/th/id/OIP.jVFftCXKOA-Rc7c603sZjAHaEK?w=275&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'></img>
            </div>
            <div className='space-y-5'>
                <div className='flex space-x-10 items-center pl-5'>
                    <p>Nguyen Van Linh</p>
                    <button className='bg-[#F5F5F5] p-2 rounded-lg'>Edit Profile</button>
                    <button className='bg-[#F5F5F5] p-2 rounded-lg'>View archive</button>
                    <TbCircleDashed className='font-bold text-3xl' title='Options'/>
                </div>
                <div className='flex space-x-10 items-center pl-5'>
                    <div>
                        <span>10</span>
                        <span>posts</span>
                    </div>
                    <div>
                        <span>5</span>
                        <span>follower</span>
                    </div>
                    <div>
                        <span>2</span>
                        <span>following</span>
                    </div>
                </div>
                <div className='pl-5'>
                    <span className='font-bold'>Nguyen Van Linh</span>
                    <a href='#' className='flex items-center'><BsThreads/>threads</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileUserDetails