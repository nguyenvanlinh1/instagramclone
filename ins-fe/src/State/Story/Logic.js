export const isLikedStory = (story, userId) => {
    for(let item of story.likedStoryByUser){
        if(item?.userId === userId) return true;
    }
    return false;
}