import React from 'react'
import TaggedCard from './TaggedCard'

const TaggedPost = ({datalike}) => {
  return (
    <div>
      <div className="flex flex-wrap">
        {datalike?.map((item) => (
          <TaggedCard key={item.postId} item={item} />
        ))}
      </div>
    </div>
  )
}

export default TaggedPost