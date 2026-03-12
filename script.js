
async function register(){

const name=document.getElementById("rname").value
const email=document.getElementById("remail").value
const password=document.getElementById("rpass").value

const res=await fetch("/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,password})
})

const data=await res.json()

document.getElementById("msg").innerText=data.message
}

async function login(){

const email=document.getElementById("lemail").value
const password=document.getElementById("lpass").value

const res=await fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
})

const data=await res.json()

if(data.studentId){
localStorage.setItem("studentId",data.studentId)
window.location="dashboard.html"
}else{
document.getElementById("msg").innerText=data.message
}

}
