export default class InputWidget {
  constructor(inputElem, taskList) {
    this.taskList = taskList;
    this.form = document.querySelector('form');
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this.input = document.querySelector(inputElem);
    this.input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        taskList.add(this.input.value);
        this.input.value = '';
      }
    });

    this.onFilter = this.onFilter.bind(this);
    this.input.addEventListener('input', this.onFilter);
  }

  onFilter(e) {
    e.preventDefault();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const text = this.input.value;
    this.timeout = setTimeout(() => this.taskList.filterHandler(text), 300);
  }
}
