import InputWidget from './components/inputWidget';
import TaskList from './components/taskList';

const taskList = new TaskList('.div__all-tasks', '.div__pinned-tasks');

const input = new InputWidget('.input', taskList);
