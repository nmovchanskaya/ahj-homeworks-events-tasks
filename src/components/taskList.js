import Task from './task';

export default class TaskList {
  constructor(allTasksClass, pinnedTasksClass) {
    this.tasks = [];
    this.allTasksElem = document.querySelector(allTasksClass);
    this.pinnedTasksElem = document.querySelector(pinnedTasksClass);
  }

  add(taskText) {
    if (taskText.trim() === '') {
      this.renderMessage('.input__message', 'You need to define task name');
      return;
    }

    this.hideMessage('.input__message');
    this.hideMessage('.tasks__message');
    const task = new Task(taskText);
    this.tasks.push(task);

    // this.renderTask(task);
    this.clearTasksElem(this.allTasksElem);

    // render regular tasks
    const tasks = this.tasks.filter((item) => item.pinned === false);
    this.renderTasks(tasks);
  }

  renderTask(task) {
    const taskElem = document.createElement('div');
    taskElem.className = 'task';
    taskElem.innerHTML = `<div class = "task__title">
                            ${task.text}
                        </div>
        <a href = "#" class = "task__pin"></a>
        <a href = "#" class = "task__unpin hidden">V</a>`;

    if (task.pinned) {
      taskElem.querySelector('.task__pin').classList.toggle('hidden');
      taskElem.querySelector('.task__unpin').classList.toggle('hidden');
    }

    const onPinCb = this.onClickCb.bind(this, task, true);
    const onUnpinCb = this.onClickCb.bind(this, task, false);

    taskElem.querySelector('.task__pin').addEventListener('click', onPinCb);
    taskElem.querySelector('.task__unpin').addEventListener('click', onUnpinCb);

    if (task.pinned) {
      this.pinnedTasksElem.insertBefore(taskElem, null);
    } else {
      this.allTasksElem.insertBefore(taskElem, null);
    }
  }

  onClickCb(task, pin) {
    task.pinned = pin;
    this.clearTasksElem(this.allTasksElem);
    this.clearTasksElem(this.pinnedTasksElem);

    let tasks;
    const input = document.querySelector('.input');
    if (pin === false) {
      this.filterHandler(input.value);
    } else {
      tasks = this.tasks.filter((item) => item.pinned === false);
      this.renderTasks(tasks);
    }

    // render pinned tasks
    tasks = this.tasks.filter((item) => item.pinned === true);
    if (tasks.length === 0) {
      this.renderMessage('.pinned__message', 'No pinned tasks');
    } else {
      this.hideMessage('.pinned__message');
      this.renderTasks(tasks);
    }
  }

  renderTasks(tasks) {
    tasks.forEach((item) => {
      this.renderTask(item);
    });
  }

  clearTasksElem(elem) {
    elem.querySelectorAll('.task').forEach((item) => {
      item.remove();
    });
  }

  filterHandler(text) {
    // filter task with text in unpinned tasks
    const tasks = this.tasks.filter((item) => item.pinned === false && item.text.toLowerCase().includes(text.toLowerCase()));

    // clear and render all filtered tasks
    if (tasks.length === 0) {
      this.renderMessage('.tasks__message', 'No tasks found');
    } else {
      this.hideMessage('.tasks__message');
    }

    this.clearTasksElem(this.allTasksElem);
    this.renderTasks(tasks);
  }

  // render messages
  renderMessage(elemName, message) {
    const elem = document.querySelector(elemName);
    elem.textContent = message;
  }

  hideMessage(elemName) {
    const elem = document.querySelector(elemName);
    elem.textContent = '';
  }
}
