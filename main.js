
    window.onload = loadTasks;
    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addTask();
    });

    function loadTasks() {
      if (localStorage.getItem("tasks") == null) return;
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
<input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
<button class="fa fa-trash btn btn-danger btn-sm float-right delete float" onclick="removeTask(this)">X</button>`;
        list.insertBefore(li, list.children[0]);
      });
    }

    function addTask() {
      const task = document.querySelector("form input");
      const list = document.querySelector("ul");
      if (task.value === "") {
        alert("Please add some task!");
        return false;
      }
  
      // add task to local storage
      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
<input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
<i class="fa fa-trash btn btn-danger btn-sm float-right delete float " onclick="removeTask(this)">X</button>`;
      list.insertBefore(li, list.children[0])
      task.value = "";
    }

    function taskComplete(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) {
          task.completed = !task.completed;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.nextElementSibling.classList.toggle("completed");
    }

    function removeTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
          // delete task
          alert('Delete task?')
          tasks.splice(tasks.indexOf(task), 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.parentElement.remove();
    }
    var currentTask = null;

    function getCurrentTask(event) {
      currentTask = event.value;
    }

    function editTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      // check if task is empty
      if (event.value === "") {
        alert("No task to show!");
        event.value = currentTask;
        return;
      }
    
      // update task
      tasks.forEach(task => {
        if (task.task === currentTask) {
          task.task = event.value;
        }
      });
      // update local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
   
