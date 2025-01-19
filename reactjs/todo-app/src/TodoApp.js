import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoApp.css";

function TodoApp() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodoList([
        ...todoList,
        { id: Date.now(), text: inputValue, isEditing: false, editValue: "" },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (id, isDone) => {
    if (isDone) {
      setDoneList(doneList.filter((item) => item.id !== id));
    } else {
      setTodoList(todoList.filter((item) => item.id !== id));
    }
  };

  const handleToggleEdit = (id, isDone) => {
    const toggleList = (list) =>
      list.map((item) =>
        item.id === id
          ? { ...item, isEditing: !item.isEditing, editValue: item.text }
          : item
      );
    isDone
      ? setDoneList(toggleList(doneList))
      : setTodoList(toggleList(todoList));
  };

  const handleEditChange = (id, newText, isDone) => {
    const updateList = (list) =>
      list.map((item) =>
        item.id === id ? { ...item, editValue: newText } : item
      );
    isDone
      ? setDoneList(updateList(doneList))
      : setTodoList(updateList(todoList));
  };

  const handleSaveEdit = (id, isDone) => {
    const updateList = (list) =>
      list.map((item) =>
        item.id === id
          ? { ...item, text: item.editValue, isEditing: false }
          : item
      );
    isDone
      ? setDoneList(updateList(doneList))
      : setTodoList(updateList(todoList));
  };

  const handleCheckboxChange = (id) => {
    const itemToMove = todoList.find((item) => item.id === id);
    if (itemToMove) {
      setTodoList(todoList.filter((item) => item.id !== id));
      setDoneList([...doneList, itemToMove]);
    }
  };

  const handleUncheck = (id) => {
    const itemToMove = doneList.find((item) => item.id === id);
    if (itemToMove) {
      setDoneList(doneList.filter((item) => item.id !== id));
      setTodoList([...todoList, itemToMove]);
    }
  };

  return (
    <section id="todolist_all" className="container mt-5">
      <div id="myDIV" className="header mb-4 p-4 bg-light rounded shadow-sm">
        <h2 className="text-center">To Do List</h2>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="要做什麼呢...."
            className="form-control"
          />
          <button
            id="btn"
            onClick={handleAddTodo}
            className="btn btn-primary ms-2"
          >
            新增
          </button>
        </div>
      </div>

      <h4>待辦事項</h4>
      <ul className="list-group mb-4">
        {todoList.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item.id)}
                className="form-check-input me-2"
              />
              {item.isEditing ? (
                <>
                  <input
                    type="text"
                    value={item.editValue}
                    onChange={(e) =>
                      handleEditChange(item.id, e.target.value, false)
                    }
                    className="form-control d-inline w-50 me-2"
                  />
                  <button
                    onClick={() => handleSaveEdit(item.id, false)}
                    className="btn btn-success btn-sm me-2"
                  >
                    確認
                  </button>
                  <button
                    onClick={() => handleToggleEdit(item.id, false)}
                    className="btn btn-secondary btn-sm"
                  >
                    取消
                  </button>
                </>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
            <div>
              {!item.isEditing && (
                <button
                  onClick={() => handleToggleEdit(item.id, false)}
                  className="btn btn-warning btn-sm me-2"
                >
                  編輯
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id, false)}
                className="btn btn-danger btn-sm"
              >
                刪除
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h4>已完成事項</h4>
      <ul className="list-group">
        {doneList.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center bg-success text-white"
          >
            <div>
              <input
                type="checkbox"
                checked
                onChange={() => handleUncheck(item.id)}
                className="form-check-input me-2"
              />
              <span style={{ textDecoration: "line-through" }}>
                {item.text}
              </span>
            </div>
            <button
              onClick={() => handleDelete(item.id, true)}
              className="btn btn-danger btn-sm"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoApp;
