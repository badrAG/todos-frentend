import todoTypes from "../types/todoTypes";
const initialState = {
  todos: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoTypes.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case todoTypes.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case todoTypes.DELETE_TODO:
      const todos = state?.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
      return {
        ...state,
        todos,
      };
    case todoTypes.UPDATE_TODO:
      const updateTodo = state.todos?.filter((todo) => {
        if (todo._id === action.payload._id) {
          todo = action.payload;
          return state.todos;
        }
        return state.todos;
      });
      return {
        ...state,
        todos: updateTodo,
      };

    default:
      return { ...state };
  }
};
export default todoReducer;
