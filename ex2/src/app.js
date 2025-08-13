const API_URL = "https://65d455c53f1ab8c63434e588.mockapi.io/job";

const todoInput = document.querySelector(".todo__input");
const addBtn = document.querySelector(".todo__add-btn");
const todoList = document.querySelector(".todo__list");

function apiRequest(method, body) {
  try {
    const options = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };
    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }
    return options;
  } catch (err) {
    console.error(err);
  }
}

async function fetchTodos() {
  try {
    const res = await fetch(API_URL, apiRequest("GET"));
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error(err);
    alert("Loi tai danh sach cong viec");
  }
}
//render danh sach cac cong viec
function renderTodos(todos) {
  const todoHtml = todos.map(
    (todo) =>
      `<li class = "todo__item">
        <span class="todo__check ${
          todo.checked ? "checked" : ""
        }" data-index="${todo.id}">
            <img src="../public/svg/Vector.svg" alt="Checkbox" />
        </span>
        <span class="todo__content">${todo.content}</span>
        <span class="todo__delete" data-index="${todo.id}">&times</span>
      </li>`
  );
  todoList.innerHTML = todoHtml.join("");
}
//them cong viec moi
async function handleAddTodo() {
  const content = todoInput.value.trim();
  if (!content) {
    alert("Chua nhap noi dung cong viec!");
    todoInput.focus();
    return;
  }

  try {
    await fetch(
      API_URL,
      apiRequest("POST", {
        createdAt: new Date().toISOString(),
        checked: false,
        content,
      })
    );
    await fetchTodos();
    todoInput.value = "";
    todoInput.focus();
    alert("Them cong viec moi thanh cong");
  } catch (err) {
    console.error(err);
    alert("Loi khi them cong viec moi");
  }
}

//xoa cong viec
async function handledDeleteTodo(event) {
  const deleteBtn = event.target.closest(".todo__delete");
  if (!deleteBtn) return;
  const id = deleteBtn.dataset.index;
  const confirmDelete = confirm("Xac nhan xoa cong viec nay!");
  if (!confirmDelete) return;
  try {
    await fetch(`${API_URL}/${id}`, apiRequest("DELETE"));
    fetchTodos();
    alert("Xoa cong viec thanh cong");
  } catch (err) {
    console.error(err);
    alert("Loi xoa cong viec");
  }
}

//cap nhat trang thai
async function updateStatus(event) {
  const checkbox = event.target.closest(".todo__check");
  if (!checkbox) return;
  try {
    const id = checkbox.dataset.index;
    const isChecked = !checkbox.classList.contains("checked");
    await fetch(
      `${API_URL}/${id}`,
      apiRequest("PUT", {
        checked: isChecked,
      })
    );
    fetchTodos();
  } catch (err) {
    console.error(err);
    alert("Loi cap nhat trang thai cong viec");
  }
}

fetchTodos();
addBtn.addEventListener("click", handleAddTodo);
todoList.addEventListener("click", handledDeleteTodo);
todoList.addEventListener("click", updateStatus);
