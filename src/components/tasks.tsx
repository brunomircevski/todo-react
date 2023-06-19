import { Component } from "react";
import TaskItem from "./taskItem";
import { Task, taskState } from "../Task";
import { getTasks, deleteTask, updateTask } from "../TaskService";

export interface ITasksProps {}

export interface ITasksState {
  tasks: Task[];
  error: boolean;
}

class Tasks extends Component<ITasksProps, ITasksState> {
  state: ITasksState = {
    tasks: [],
    error: false,
  };

  componentDidMount() {
    getTasks()
      .then((tasks) => {
        tasks = tasks.filter((t) => t.taskState != taskState.archive);
        this.setState({ tasks });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  }

  handleDelete = (taskId: number) => {
    deleteTask(taskId)
      .then(() => {
        const tasks: Task[] = this.state.tasks.filter((t) => t.id != taskId);
        this.setState({ tasks });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleStateChange = (taskId: number, forward: boolean) => {
    const task: Task = this.state.tasks.filter((t) => t.id == taskId)[0];
    const newState: taskState = forward
      ? this.getNextState(task.taskState)
      : this.getPreviousState(task.taskState);

    if (forward && task.taskState == taskState.working && task.price == 0) {
      if (!this.priceChangePrompt(task)) return;
    }

    if (newState != task.taskState) {
      task.taskState = newState;

      updateTask(task)
        .then(() => {
          const tasks: Task[] = this.state.tasks;
          tasks.filter((t) => t.id == taskId)[0] = task;
          this.setState({ tasks });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  priceChangePrompt(task: Task): boolean {
    const priceStr = prompt("Podaj cenę za usługę");
    const price: number = parseInt(priceStr || "0");
    if (price <= 0 || price > 10000 || Number.isNaN(price)) {
      alert("Cena musi być w przedziale 1-10000");
      return false;
    }
    task.price = price;
    return true;
  }

  render() {
    return (
      <>
        <div className="row">{this.renderAlert()}</div>
        <div className="row">
          {this.state.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={this.handleDelete}
              onStateChange={this.handleStateChange}
            />
          ))}
        </div>
      </>
    );
  }

  renderAlert() {
    if (!this.state.error)
      return (
        <div className="alert alert-dark" role="alert">
          {this.getLenghtString(this.state.tasks.length)}
        </div>
      );

    return (
      <div className="alert alert-danger" role="alert">
        Błąd. Nie udało się pobrać zadań.
      </div>
    );
  }

  getLenghtString(n: number): string {
    switch (n) {
      case 0:
        return "Nie masz zadań";
      case 1:
        return "Masz 1 zadanie";
      case 2:
      case 3:
      case 4:
        return `Masz ${n} zadania`;
      default:
        return `Masz ${n} zadań`;
    }
  }

  getNextState(s: taskState): taskState {
    switch (s) {
      case taskState.new:
        return taskState.working;
      case taskState.working:
        return taskState.ready;
      default:
        return taskState.archive;
    }
  }

  getPreviousState(s: taskState): taskState {
    switch (s) {
      case taskState.archive:
        return taskState.ready;
      case taskState.ready:
        return taskState.working;
      default:
        return taskState.new;
    }
  }
}

export default Tasks;
