export const isPostLike = (post, userId) => {
    for(let item of post.likedByUsers){
        if(item.userId === userId){
            return true;
        }
    }
    return false
}

export const isPostSave = (post, userId) => {
    for(let item of post.savedByUsers){
        if(item.userId === userId){
            return true;
        }
    }
    return false;
}

export const isCreatePost = (post, userId) => {
    if(post.user?.userId === userId){
        return true;
    }
    return false;
}
