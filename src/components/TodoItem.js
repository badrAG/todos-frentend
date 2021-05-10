import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodos,deleteTodos } from "../redux/actions/todoActions";

const TodoItem = ({ todo }) => {
  const [toggle, setToggle] = useState(true);
  const [status, setStatus] = useState();
  const [name, setName] = useState("");
  const ref = useRef(null)
  const dispatch = useDispatch()
  const hamdelChangeStatus = (e) => {
    setStatus(!status);
    dispatch(updateTodos(todo._id,{status:!status}))
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setToggle(true);
    }
};
  useEffect(() => {
    setName(todo.title);
    setStatus(todo.status);
  }, [todo.title,todo.status]);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      }
  }, [])
  return (
    <div className="d-flex content-item align-items-center border-bottom py-2">
        <div className="d-flex flex-grow-1 align-items-center">
      <label>
        <input
          className="form-check-input option-input radio me-3"
          style={{ marginTop: "-12px" }}
          onChange={(e) => hamdelChangeStatus(e)}
          name="checkStatus"
          type="checkbox"
          value={status}
          checked={!status}
          id="flexCheckDefault"
        />
      </label>
      {toggle ? (
        <span
          onDoubleClick={() => {
            setToggle(false);
          }}
          className={`${
            status
              ? "label-text fs-4 mb-0"
              : "label-text text-secondary text-decoration-line-through fs-4 mb-0"
          }`}
        >
          {name}
        </span>
      ) : (
        <input
          type="text"
          className="py-2 w-100"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                dispatch(updateTodos(todo._id,{title:name}))
                setToggle(true);
            }
          }}
        />
      )}
        </div>
        <span ref={ref} className="fw-bolder p-2 fs-5 remove-icon" onClick={()=> dispatch(deleteTodos(todo._id))}>
          x
        </span>
    </div>
  );
};

export default TodoItem;
