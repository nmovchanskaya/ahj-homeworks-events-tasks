export default class Task {
  constructor(text) {
    this.text = text;
    this.pinned = false;
  }

  pin(task) {
    task.pinned = true;
  }
}
