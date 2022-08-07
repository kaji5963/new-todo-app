import React, { useState } from "react";
import "./App.css";

export const App = () => {
  //各TODOを定義
  const todoList = [
    {
      id: Math.floor(Math.random() * 300),
      text: "",
      status: "",
    },
    {
      id: Math.floor(Math.random() * 300),
      text: "",
      status: "",
    },
    {
      id: Math.floor(Math.random() * 300),
      text: "",
      status: "",
    },
  ];
  const [schedule, progress, complete] = todoList; //各TODOを分割代入

  //useState宣言
  const [todo, setTodo] = useState("");
  const [makeTodo, setMakeTodo] = useState([
    {
      id: Math.floor(Math.random() * 300),
      text: "",
      status: "",
    },
  ]);
  //フォームの送信処理をして初期化
  const handleSubmit = (e) => {
    e.preventDefault(); //フォーム送信時のレンダリングを防止
    if (todo === "") return;

    setMakeTodo([
      ...makeTodo,
      {
        id: Math.floor(Math.random() * 300),
        text: todo,
        status: "schedule",
      },
    ]);
    setTodo(""); //フォームの初期化
  };
  //入力データの変更
  const inputChange = (e) => {
    setTodo(e.target.value); //valueのデータを取得
  };

  //予定TODOのデータを削除
  const onClickDelete = (id) => {
    const deleteTodo = makeTodo.filter((todo) => {
      return todo.id !== id;
    });
    setMakeTodo(deleteTodo);
  };
  //予定TODOのデータを進行TODOへ
  const onClickProgress = (id) => {
    const newProgressTodo = [
      ...makeTodo,
      {
        id: Math.floor(Math.random() * 300),
        text: todo,
        status: "schedule",
      },
    ];
    const deleteScheduleTodo = makeTodo.filter((todo) => {
      return todo.id !== id;
    });
    setMakeTodo(deleteScheduleTodo);
  };

  return (
    <>
      {/* 見出し */}
      <h1>~ React TODO App ~</h1>
      {/* フォーム */}
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          onChange={inputChange}
          type="text"
          placeholder="TODO入力"
          value={todo}
        />
        <button>追加</button>
      </form>
      <div className="container">
        {/* 予定TODO */}
        <section className="schedule">
          <p className="title">予定TODO</p>
          <div className="schedule-section">
            <ul>
              {makeTodo.status !== "schedule"
                ? makeTodo.map((todo) => {
                    return (
                      <div key={todo.id} className="schedule-item">
                        <li>{todo.text}</li>
                        <button onClick={() => onClickProgress(todo.id)}>
                          進行
                        </button>
                        <button onClick={() => onClickDelete(todo.id)}>
                          削除
                        </button>
                      </div>
                    );
                  })
                : false}
            </ul>
          </div>
        </section>
        {/* 進行TODO */}
        <section className="progress">
          <p className="title">進行TODO</p>
          <div key={todo.id} className="progress-section">
            <ul>
              {makeTodo.status !== "progress" &&
                makeTodo.map((todo) => {
                  return (
                    <div key={todo.id} className="progress-item">
                      <li>{todo.text}</li>
                      <button>完了</button>
                      <button>戻す</button>
                    </div>
                  );
                })}
            </ul>
          </div>
        </section>
        {/* 完了TODO */}
        <section className="complete">
          <p className="title">完了TODO</p>
          <div key={todo.id} className="complete-section">
            <ul>
              {makeTodo.map((todo) => {
                return (
                  <div key={todo.id} className="complete-item">
                    <li>{todo.text}</li>
                    <button>削除</button>
                    <button>戻す</button>
                  </div>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};;
