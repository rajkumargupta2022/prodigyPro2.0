export const fetchAdminUser = ()=>{
  let user:any = localStorage.getItem("adminUser")
  if(user){
    user = JSON.parse(user)
    return user
  }else {
    return null
  }
}
