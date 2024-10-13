export const getUserChat = (userCreate, userChat, isGroup) => {
    if(isGroup === false){
        for(let item of userChat){
            if(item?.userId !== userCreate?.userId) return item;
        }
    }
    return;
}