import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import FilterTodo from "./FilterTodo";
import SearchTodo from "./SearchTodo";

const TodoApp = () => {
  const dispatch = useDispatch();
  const { data, filter, search } = useSelector((state) => state.todos);

  const fetchTodos = async () => {
    const FILTER = {
      completed: true,
      uncompleted: false,
      all: undefined,
    };

    try {
      const result = await axios.get(
        "https://62260a012dfa524018fa3980.mockapi.io/api/todos",
        {
          params: {
            completed: FILTER[filter],
            title: search || undefined,
          },
        }
      );
      // Dispatch action gửi data lên redux store
      dispatch({ type: "SET_TODOS", data: result.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Call API lấy danh sách todo từ server
  // useEffect này sẽ chạy sau lần render đầu tiên, và sau mỗi lần render khi type thay đổi
  useEffect(() => {
    fetchTodos();
  }, [filter, search]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <h1 className="text-center">Todo App</h1>
          <AddTodo onAddSuccess={fetchTodos} />
          <SearchTodo />
          <TodoList todos={data} onUpdateSuccess={fetchTodos} />
          <FilterTodo />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
