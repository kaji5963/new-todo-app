import React, { useState } from "react";
import "./App.css";

export const App = () => {
  //useState宣言
  const [todo, setTodo] = useState("");
  const [makeTodo, setMakeTodo] = useState([]);
  //フォームの送信処理をして初期化
  const handleSubmit = (e) => {
    e.preventDefault(); //フォーム送信時のレンダリングを防止
    if (todo === "") return;
    setMakeTodo([...makeTodo, { id: makeTodo.length + 1, text: todo }]);
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
      {/* 予定TODO */}
      <section className="schedule">
        <p className="title"></p>
        <div className="schedule-section">
          <ul>
            {makeTodo.map((todo) => {
              return (
                <div key={todo.id} className="schedule-item">
                  <li>{todo.text}</li>
                  <button>進行</button>
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </div>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
