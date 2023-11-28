document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.querySelector(".js-todo-list");
  let emptyState = document.querySelector(".empty-state");

  loadTasks();

  function loadTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }

    tasks.forEach(function (task, index) {
      createTaskElement(task, index);
    });
  }

  function createTaskElement(task, index) {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed || false;

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      loadTasks(); // Memuat kembali daftar tugas setelah mengubah status
    });

    let label = document.createElement("label");
    label.textContent = task.text;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    taskList.appendChild(listItem);
  }

  function saveTasks() {
    // Filter tugas yang belum selesai dan simpan ke local storage
    let uncompletedTasks = tasks.filter(function (task) {
      return !task.completed;
    });

    localStorage.setItem("tasks", JSON.stringify(uncompletedTasks));
  }

  window.addTask = function () {
    let taskInput = document.querySelector(".js-todo-input");
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });

      saveTasks();
      loadTasks();

      taskInput.value = "";
    }
  };

  window.submitTask = function () {
    alert("Tasks submitted!");
  };
});
