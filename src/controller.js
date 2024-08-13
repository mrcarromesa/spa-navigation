import "./browserHistoryEvent.js";
import { getTodos } from "./api.js";
import {
  container,
  radioButtons,
  makeLoading,
  clearButton,
} from "./components.js";

const makeTodos = async (queryParams) => {
  makeLoading();
  const todos = await getTodos(queryParams);

  let html = "";

  todos.forEach((todo) => {
    html += `
      <div class="bg-white p-4 border rounded shadow">
            <h3 class="text-lg font-semibold">${todo.title}</h3>
            <p class="text-sm text-gray-600">User: ${todo.userId}, completed: ${todo.completed}</p>
          </div>
    `;
  });

  container.innerHTML = html;
};

clearButton.addEventListener("click", () => {
  const newUrl = `${window.location.pathname}`;

  history.pushState(null, "", newUrl);
});

function fetchTodosByQueryParams() {
  let params = new URLSearchParams(window.location.search);
  let queryParams = {};

  for (let [key, value] of params.entries()) {
    queryParams[key] = value;
  }

  makeTodos(queryParams);
}

const findAndCheckRadioButton = () => {
  const params = new URLSearchParams(window.location.search);

  radioButtons.forEach((radioButton) => {
    const name = radioButton.getAttribute("name");
    const key = name;
    const value = radioButton.value;

    radioButton.checked = params.get(key) === value;
  });
};

(function () {
  window.addEventListener("statechange", function () {
    fetchTodosByQueryParams();
    findAndCheckRadioButton();
  });

  findAndCheckRadioButton();
  fetchTodosByQueryParams();
})();
