import React from "react";
import { Component, FormEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deviceType, Task, taskState } from "../Task";
import { createTask } from "../TaskService";

export interface IFormProps {}

export interface IFormState {
  errorModel: boolean;
  errorPhoneNumber: boolean;
  errorPrice: boolean;
}

class Form extends Component<IFormProps, IFormState> {
  state: IFormState = {
    errorModel: true,
    errorPhoneNumber: true,
    errorPrice: false,
  };

  handleSubmit(e: any) {
    e.preventDefault();

    const task: Task = new Task();

    task.model = e.target["model"].value;
    task.deviceType = e.target["deviceType"].value;
    task.phoneNumber = e.target["phoneNumber"].value;
    task.description = e.target["description"].value;
    task.price = e.target["price"].value || 0;
    task.date = new Date().toISOString();
    task.taskState = taskState.new;

    //const navigate = useNavigate();

    createTask(task)
      .then(() => {
        //navigate("/");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        alert("Nie udało się dodać zadania.");
      });
  }

  render() {
    return (
      <div className="row">
        <h1 className="h1 mb-3">Dodaj zadanie</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="model" className="col-sm-4 col-form-label">
              Model urządzenia
            </label>
            <div className="col-sm-8">
              <input
                onChange={(e) => {
                  this.validate(e.target.value, e.target.id);
                }}
                type="text"
                className="form-control"
                id="model"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="deviceType" className="col-sm-4 col-form-label">
              Typ urządzenia
            </label>
            <div className="col-sm-8">
              <select className="form-select" id="deviceType">
                <option value={deviceType.phone}>{deviceType.phone}</option>
                <option value={deviceType.tablet}>{deviceType.tablet}</option>
                <option value={deviceType.other}>{deviceType.other}</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="phoneNumber" className="col-sm-4 col-form-label">
              Numer tel. klienta
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                onChange={(e) => {
                  this.validate(e.target.value, e.target.id);
                }}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="description" className="col-sm-4 col-form-label">
              Opis usterki
            </label>
            <div className="col-sm-8">
              <textarea className="form-control" id="description"></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="price" className="col-sm-4 col-form-label">
              Cena
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                id="price"
                onChange={(e) => {
                  this.validate(e.target.value, e.target.id);
                }}
              />
            </div>
          </div>
          <div className="row mb-3">
            {this.renderErrors()}
            <div className="col-sm-4 text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  this.state.errorModel ||
                  this.state.errorPhoneNumber ||
                  this.state.errorPrice
                }
              >
                Dodaj
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderErrors() {
    return (
      <div className="col-sm-8 text-danger">
        <div>
          {!this.state.errorModel ||
            "Model musi składać się z co najmniej dwóch słów."}
        </div>
        <div>
          {!this.state.errorPhoneNumber ||
            "Numer telefonu składa się z 9 cyfr."}
        </div>
        <div>
          {!this.state.errorPrice ||
            "Cena musi mieścić się w przedziale 0-10000 zł"}
        </div>
      </div>
    );
  }

  validate(value: string, input: string) {
    switch (input) {
      case "model":
        this.setState({
          errorModel: !/\w+\s\w+/.test(value),
        });
        break;
      case "phoneNumber":
        this.setState({
          errorPhoneNumber: !(
            parseInt(value) >= 100000000 && parseInt(value) < 1000000000
          ),
        });
        break;
      case "price":
        this.setState({
          errorPrice: parseInt(value) <= 0 || parseInt(value) > 10000,
        });
        break;
    }
  }
}

export default Form;
