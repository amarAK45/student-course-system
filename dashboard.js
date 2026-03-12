
const studentId=localStorage.getItem("studentId")

loadCourses()

async function registerCourse(){

const course=document.getElementById("course").value

await fetch("/register-course",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({studentId,course})
})

loadCourses()
}

async function loadCourses(){

const res=await fetch("/courses/"+studentId)

const courses=await res.json()

const list=document.getElementById("courseList")

list.innerHTML=""

courses.forEach(c=>{
const li=document.createElement("li")
li.innerText=c
list.appendChild(li)
})

}
