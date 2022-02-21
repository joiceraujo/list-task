/* Criando variaveis para armazenar os valores */

const addButton = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const clearButton = document.querySelector('#apaga-tudo');
const completedClear = document.querySelector('#remover-finalizados');
const saveListButton = document.querySelector('#salvar-tarefas');
const moveUp = document.querySelector('#mover-cima');
const moveDown = document.querySelector('#mover-baixo');
const selectedRemoveButton = document.querySelector('#remover-selecionado');
const selectedClass = '.selectedTask';

/* Criando uma função para voltar ao estado original, usei o innerHTML para
colocar texto dentro do HTML com o localStorage.getItem para retornar o valor nas minhas terafas. */

function backToState() {
  taskList.innerHTML = localStorage.getItem('tasks');
}
backToState();

/* Adicionando um evento de click ao Botão e criando elementos na minha lista com appendChild */
addButton.addEventListener('click', () => {
  const inputText = document.querySelector('#texto-tarefa').value;
  const listElement = document.createElement('li');
  listElement.innerText = inputText;
  listElement.classList.add('task');
  taskList.appendChild(listElement);
  document.querySelector('#texto-tarefa').value = '';
});

/* Adicionando outro evento de click usando o addEventListener para usar com varias funções
e criando um loop para selecionar as classes , peguei referencias do metodo event.terget.classList.add
href: https://developer.mozilla.org/pt-BR/docs/Web/API/Element/classList  e
https://stackoverflow.com/questions/61758780/how-to-set-css-style-to-local-storage-for-dynamically-created-list-using-javascr */

taskList.addEventListener('click', (event) => {
  const selectedTask = document.querySelectorAll(selectedClass);
  for (let index = 0; index < selectedTask.length; index += 1) {
    selectedTask[index].classList.remove('selectedTask');
  }
  event.target.classList.add('selectedTask');
});

/* Adicionando evento para quando o botão for clicado 
duas vezes rapidamente usando a class completed que está stylizada no CSS */

taskList.addEventListener('dblclick', (event) => {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
});

/* Adicionando evento para o botão limpar lista */

clearButton.addEventListener('click', () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
});
completedClear.addEventListener('click', () => {
  const completedTasks = document.querySelectorAll('.completed');
  for (let index = 0; index < completedTasks.length; index += 1) {
    completedTasks[index].remove();
  }
});

saveListButton.addEventListener('click', () => {
  localStorage.setItem('tasks', taskList.innerHTML);
});

/* Adicionando botão com a função de mover para cima
 e botão com a função de mover para baixo */

moveUp.addEventListener('click', () => {
  const selectedTask = document.querySelector(selectedClass);
  if (selectedTask !== null && selectedTask.previousSibling !== null) {
    const lista = selectedTask.parentElement;
    lista.insertBefore(selectedTask, selectedTask.previousSibling);
  }
});
moveDown.addEventListener('click', () => {
  const selectedTask = document.querySelector(selectedClass);
  if (selectedTask !== null && selectedTask.nextSibling !== null) {
    const lista = selectedTask.parentElement;
    lista.insertBefore(selectedTask, selectedTask.nextSibling.nextSibling);
  }
});

/* Adicionando evento de click ao botão remover */

selectedRemoveButton.addEventListener('click', () => {
  const selectedTask = document.querySelector(selectedClass);
  selectedTask.remove();
});