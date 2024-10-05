import React from 'react'

const SuggetionCard = () => {
  return (
    <div className='flex justify-between'>
        <div className='flex items-center space-x-3'>
            <img className='w-9 h-9 rounded-full' src="https://th.bing.com/th/id/OIP.mJ1NiAi2HGhUjJU17k4VVAHaN4?w=182&h=342&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
            <div>
                <p className='text-sm font-semibold'>username</p>
                <p className='text-sm font-semibold opacity-70'>Follows you</p>
            </div>
        </div>
        <p className='text-blue-600'>Follows</p>
    </div>
  )
}

export default SuggetionCard