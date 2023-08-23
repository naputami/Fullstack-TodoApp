const dummyData = [
    {
        taskName: "membuat file HTML",
        dueDate: '2023-09-18',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima maxime dolor exercitationem quidem esse beatae.',
        isDone: false,
        projectName: 'coding',
        id: 1
    },
    {
        taskName: "membuat file CSS",
        dueDate: '2023-09-18',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima maxime dolor exercitationem quidem esse beatae.',
        isDone: false,
        projectName: 'coding',
        id: 2
    },
    {
        taskName: "membuat file JS",
        dueDate: '2023-09-18',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima maxime dolor exercitationem quidem esse beatae.',
        isDone: false,
        projectName: 'coding',
        id: 3
    },
    {
        taskName: "membuat paper biologi",
        dueDate: '2023-09-18',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima maxime dolor exercitationem quidem esse beatae.',
        isDone: false,
        projectName: 'biology',
        id: 4
    },   
    {
      taskName: "membuat file Word",
      dueDate: '2023-10-20',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima maxime dolor exercitationem quidem esse beatae.',
      isDone: true,
      projectName: 'Office',
      id: 5
  },
  {
      taskName: "membuat file excel",
      dueDate: '2023-10-20',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima maxime dolor exercitationem quidem esse beatae.',
      isDone: true,
      projectName: 'Office',
      id: 6
  },
]

let apiData = {}


// const fetchingData = async () => {
//   const data = await getTask()
//   return data
// }



const taskTitleField = document.getElementById('taskTitle')
const taskDateField = document.getElementById('taskDate')
const taskProjectField = document.getElementById('taskProject')
const taskDescriptionField = document.getElementById('taskDescription')
const formTaskLabel = document.getElementById('formTaskLabel')

// window.addEventListener('load', () => {
//   showData(dummyData)
// })


const resetTaskFormField = () => {
  taskTitleField.value = ''
  taskDateField.value = ''
  taskProjectField.innerHTML = ''
  taskDescriptionField.value = ''
  formTaskLabel.innerHTML = ''
}

const toggleAddTask = () => {
  resetTaskFormField()
  formTaskLabel.innerHTML = 'Add New Task'
}

const addTask = () => {
  resetTaskFormField()
}

const deleteTask = (id) => {
  Swal.fire({
    title: "Are you sure to delete this task?",
    text: "This task will be deleted permanently",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C0564B",
    confirmButtonText: 'Yes, delete this task'
 }).then((result) => {
    if (result.isConfirmed) {
        console.log(id)

    Swal.fire("Success", "The task is deleted", "success");
    } else if (result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'Cancelled',
        'The task is not deleted',
        'error'
      )
    }
 });

}

const editTask = (id) => {
  const editedTask = apiData.tasks.find(data => data.id === id)
  const originalDatetime = new Date(editedTask.due_date)
  const formattedDatetime = originalDatetime.toISOString().split('T')[0];

  formTaskLabel.innerHTML = 'Edit Task'
  taskTitleField.value = editedTask.title
  taskProjectField.innerHTML = `<option selected>${editedTask.project}</option>`
  taskDescriptionField.value = editedTask.description
  taskDateField.value = formattedDatetime

}


const showData = (todos) => {
  const unfinishedTaskContainer = document.getElementById('unfinishedTask')
  const finishedTaskContainer = document.getElementById('finishedTask')

  
  unfinishedTaskContainer.innerHTML = ''
  finishedTaskContainer.innerHTML = ''

  todos.forEach(todo => {
    const originalDatetime = new Date(todo.due_date)
    const formattedDatetime = originalDatetime.toISOString().split('T')[0];
    if(todo.is_done) {
      let item = `
      <div class="todo-item p-2 mb-3" id="${todo.id}">
        <div class="todo-project p-1">${todo.project}</div>
        <h3 class="todo-title mb-1">${todo.title}</h3>
        <p class="todo-date mb-1">Due date: ${formattedDatetime}</p>
        <p class="todo-desc">
         ${todo.description}
        </p>
        <div class="todo-btns">
          <div class="todo-edit-btn">
            <!-- Edit Button trigger modal -->
            <button type="button" class="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#formTask" title="edit" onClick = "editTask(${todo.id})"><i class="fa-regular fa-pen-to-square"></i></button>
          </div>
          <div class="todo-delete-btn">
            <button class="btn btn-primary delete-btn" title="delete" onClick="deleteTask(${todo.id})"><i class="fa-regular fa-trash-can"></i></button>
          </div>
          <div class="todo-finished-btn">
            <button class="btn btn-primary finish-undo-btn" title="mark as unfinished"><i class="fa-solid fa-rotate-left"></i></button>
          </div>
        </div>
      </div>
        `
      finishedTaskContainer.innerHTML += item
    } else {
      let item = `
      <div class="todo-item p-2 mb-3" id="${todo.id}">
      <div class="todo-project p-1">${todo.project}</div>
      <h3 class="todo-title mb-1">${todo.title}</h3>
      <p class="todo-date mb-1">Due date: ${formattedDatetime}</p>
      <p class="todo-desc">
        ${todo.description}
      </p>
      <div class="todo-btns">
        <div class="todo-edit-btn">
          <!-- Edit Button trigger modal -->
          <button type="button" class="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#formTask" title="edit" onClick = "editTask(${todo.id})"><i class="fa-regular fa-pen-to-square"></i></button>
        </div>
        <div class="todo-delete-btn">
          <button class="btn btn-primary delete-btn" title="delete"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        <div class="todo-finished-btn">
          <button class="btn btn-primary finish-undo-btn" title="mark as finished"><i class="fa-regular fa-circle-check"></i></button>
        </div>
      </div>
    </div>
      `
      unfinishedTaskContainer.innerHTML += item
    }
  })

}

const getTask = async () => {
  const response = await axios.get('http://127.0.0.1:5000/tasks/user/3')
  apiData = response.data
  console.log(apiData)
  showData(response.data.tasks)
}

getTask()

const showTimer = () => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

showTimer()
setInterval(showTimer, 1000);

