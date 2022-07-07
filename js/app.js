let elLogOutBtn=document.querySelector('.logout');
const token=window.localStorage.getItem('token');
if(!token){
    window.location.replace('index.html');
}
elLogOutBtn.addEventListener('click',()=>{
    window.localStorage.removeItem('token');
    window.location.replace('index.html');
})