const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')

const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const closEl = document.getElementById('close')

const fullday = document.getElementById('full-day')
const year = document.getElementById('year')
const day = document.getElementById('day')
const month = document.getElementById('mont')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []



function setTodos() {
    localStorage.setItem("list", JSON.stringify(todos));
}



if (todos.length) showTodos()

function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.textContent = ""
    todos.forEach((todo, i) => {
        console.log(todo);
        listGroupTodo.innerHTML += `
        <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${todo.completed ? 'completed' : '' }">
                ${todo.text}
                    <div class="todo-icons">
                        <span class="opacity-50 me-2">${todo.time}</span>
                        <img onclick="editTodo(${i})" src="img/edit.svg" alt="edit image" width="25" height="25">
                        <img onclick="deleteTodo(${i})" src="img/delete.svg" alt="edit image" width="25" height="25">
                    </div>
          </li>
        `;
    });
}


formCreate.addEventListener('click', e => {
    e.preventDefault();
    const todoText = formCreate["input-create"].value.trim()
    formCreate.reset();
    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), completed: false});
        setTodos()
        showTodos()
    } else showMessage('message-create', 'Please create some text...')
})

function showMessage(where, message){
    document.getElementById(`${where}`).textContent = message
    setTimeout(()=>{
    document.getElementById(`${where}`).textContent = ''
    }, 2500);
}




function getTime(){
    let now = new Date()

    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    let seconds = now.getSeconds()< 10 ? '0' + now.getSeconds() : now.getSeconds()
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    let month = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
    let year = now.getFullYear() < 10 ? '0' + now.getFullYear() : now.getFullYear()

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    fullday.innerHTML = `${date} ${monthNames[Number(month)]} ${year}`

    hourEl.innerHTML = hour
    minuteEl.innerHTML = minutes
    secondEl.innerHTML = seconds 

    return `${hour}:${minutes}:${seconds} ${date}.${month}.${year} `
}

setInterval(getTime, 1000)


function deleteTodo(i){
    const deleteTodos = todos.filter((item, index)=>{
        return i !== index
    })
    todos = deleteTodos
    setTodos()
    showTodos()
}


function setCompleted(i){
    let completeTodos = todos.map((item, index)=>{
        if(i == index){
            return {...item, completed: item.completed ? false : true}
        } else return {...item}
    })

    todos = completeTodos
    setTodos()
    showTodos()
}

formEdit.addEventListener('submit', (e)=>{
    e.preventDefault()
    const todoText = formEdit["input-edit"].value.trim()
    formEdit.reset()
    if(todoText.length){
        todos.splice(editItemId, 1, {text: todoText, time: getTime(), completed: false})
        setTodos()
        showTodos()
        closeModal()
    } else showMessage('message-edit', 'Please create some text...')
})


function editTodo(id){
    openModal()
    editItemId = id
}

function openModal(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
document.addEventListener('keydown', (e)=>{
    if(e.which == 27) closeModal()
})

overlay.addEventListener('click', closeModal)
closEl.addEventListener('click', closeModal)
function closeModal(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}