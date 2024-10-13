export const isCommentLike = (comment, userId) => {
    for(let item of comment.likedCommentByUser){
        if(item.userId === userId) return true;
    }
    return false;
}

export const isCheckCommentOfUser = (comment, userId) => {
    return comment?.user.userId === userId ? true : false;
}