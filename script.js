let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let progressBar = document.getElementById("progressBar");
let progressText = document.getElementById("progressText");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render(){
    taskList.innerHTML="";
    let completed=0;
    tasks.forEach((task,i)=>{
        let li=document.createElement("li");
        li.innerHTML=`<span>${task.text}</span>
                      <button onclick="delTask(${i})">❌</button>`;
        if(task.done) li.classList.add("completed");
        li.querySelector("span").onclick=()=>{
            task.done=!task.done;
            render();
        };
        taskList.appendChild(li);
        if(task.done) completed++;
    });
    let percent = tasks.length ? Math.round(completed/tasks.length*100) : 0;
    progressBar.style.width = percent+"%";
    progressText.innerText = percent+"% completed";
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){
    let text=taskInput.value.trim();
    if(!text) return;
    tasks.push({text, done:false});
    taskInput.value="";
    render();
}

function delTask(i){
    tasks.splice(i,1);
    render();
}

function toggleMode(){
    document.body.classList.toggle("dark");
    let btn=document.getElementById("modeBtn");
    btn.innerText = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

render();