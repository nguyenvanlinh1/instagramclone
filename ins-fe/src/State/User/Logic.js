export const checkUser = (userId, mainuser) => {
   return userId === mainuser?.userId ?  true :  false;
}