export const isCommentLike = (comment, userId) => {
    if (Array.isArray(comment?.likedCommentByUser) && comment.likedCommentByUser.length > 0) {
        for (let item of comment.likedCommentByUser) {
            if (item?.userId === userId) {
                return true;
            }
        }
    }
    return false;
};


export const isCheckCommentOfUser = (comment, userId) => {
    return comment?.user?.userId === userId ? true : false;
}