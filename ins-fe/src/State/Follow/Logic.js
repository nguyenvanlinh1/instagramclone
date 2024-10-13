export const checkFollowed = (userId, listFollowed) => {
    for(let item of listFollowed){
       if(item?.userId === userId){
          return true
       }
    }
    return false;
 }
