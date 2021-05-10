import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./components/TodoItem";
import { addTodos, getTodos } from "./redux/actions/todoActions";
import { API_URL } from "./redux/Config";
import "./todoItem.css";
function App() {
  const { todos } = useSelector((state) => state.todos);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (filter === 1) {
      dispatch(getTodos(`${API_URL}todos/`));
    } else if (filter === 2) {
      dispatch(getTodos(`${API_URL}todos/?status=1`));
    } else if (filter === 3) {
      dispatch(getTodos(`${API_URL}todos/?status=0`));
    }
  }, [dispatch, filter]);
  return (
    <div className="App">
      <div className="container">
        <div
          className="row align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center border-bottom">
                  <div style={{ width: "32px", height: "32px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="form-control border-0 pb-3 fs-3 shadow-none"
                    placeholder="What needs to be done? "
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        event.stopPropagation();
                        dispatch(addTodos(title));
                        setTitle("");
                      }
                    }}
                  />
                </div>
                {todos.length > 0 &&
                  todos.map((todo, i) => <TodoItem key={i} todo={todo} />)}
              </div>
              <div className="row pb-2">
                <div className="col-2"></div>
                <div className="col-6">
                  <button
                    type="button"
                    onClick={() => setFilter(1)}
                    class="btn btn-light"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter(2)}
                    class="btn btn-light"
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter(3)}
                    class="btn btn-light"
                  >
                    Completed
                  </button>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    onClick={() => setFilter(3)}
                    class="btn btn-light"
                  >
                    Clear Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
