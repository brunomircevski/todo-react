import React, { Component } from "react";
import { ITask, taskState } from "../Task";

export interface ITaskItemProps {
  task: ITask;
  onDelete: Function;
  onStateChange: Function;
}

export interface ITaskItemState {
  displayDeleteButtons: boolean;
}

class TaskItem extends Component<ITaskItemProps, ITaskItemState> {
  state: ITaskItemState = {
    displayDeleteButtons: false,
  };

  render() {
    return (
      <div className="card mb-3" style={{ backgroundColor: this.getBgColor() }}>
        <div className="card-body">
          <h5 className="card-title">{this.props.task.model}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {this.props.task.deviceType} &nbsp;
            <span className={"badge bg-" + this.getBootstrapColor()}>
              {this.props.task.taskState}
            </span>
          </h6>

          <div className="row">
            <div className="col">
              <p>
                Data dodania: {this.formatDate(this.props.task.date)} <br />
                Numer klienta: {this.props.task.phoneNumber} <br />
                Cena: <b>{this.formatPrice()}</b>
              </p>
            </div>
            <div className="col">
              <p className="card-text">
                <b>Opis:</b> {this.props.task.description || "brak"}
              </p>
            </div>
          </div>
          {this.state.displayDeleteButtons
            ? this.renderDeleteButtons()
            : this.renderNormalButtons()}
        </div>
      </div>
    );
  }

  renderNormalButtons() {
    return (
      <div className="btn-group" role="group">
        <button
          onClick={() => this.toggleDeleteButtons()}
          type="button"
          className="btn btn-danger"
        >
          Usuń
        </button>
        <button
          disabled={this.props.task.taskState == taskState.new}
          onClick={() => this.props.onStateChange(this.props.task.id, false)}
          type="button"
          className="btn btn-warning"
        >
          Cofnij
        </button>
        <button
          disabled={this.props.task.taskState == taskState.archive}
          onClick={() => this.props.onStateChange(this.props.task.id, true)}
          type="button"
          className="btn btn-success"
        >
          Dalej
        </button>
      </div>
    );
  }

  renderDeleteButtons() {
    return (
      <div className="btn-group" role="group">
        <button
          onClick={() => this.toggleDeleteButtons()}
          type="button"
          className="btn btn-secondary"
        >
          Cofnij
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.task.id)}
          type="button"
          className="btn btn-danger"
        >
          Potwierdź i usuń
        </button>
      </div>
    );
  }

  toggleDeleteButtons(): void {
    this.setState({ displayDeleteButtons: !this.state.displayDeleteButtons });
  }

  formatDate(d: string): string {
    const date: Date = new Date(d);
    return date.toLocaleDateString("pl-PL");
  }

  formatPrice(): string {
    return this.props.task.price > 0
      ? this.props.task.price + " zł"
      : "Nie ustalono";
  }

  getBgColor(): string {
    switch (this.props.task.taskState) {
      case taskState.new:
        return "#dfd";
      case taskState.working:
        return "#ffc";
      case taskState.ready:
        return "#cdf";
      default:
        return "#eee";
    }
  }

  getBootstrapColor(): string {
    switch (this.props.task.taskState) {
      case taskState.new:
        return "success";
      case taskState.working:
        return "warning";
      case taskState.ready:
        return "primary";
      default:
        return "secondary";
    }
  }
}

export default TaskItem;
