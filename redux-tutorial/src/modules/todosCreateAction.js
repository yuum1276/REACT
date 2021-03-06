import { createAction, handleActions } from 'redux-actions';

//1. 액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

//2. 액션 생성 함수 정의
export const changeInputCreateAction = createAction(
  CHANGE_INPUT,
  (input) => input,
);

//insert가 호출될 때마다 1씩 증가될 변수
let id = 3;
export const insertCreateAction = createAction(INSERT, (text) => ({
  id: id++,
  text, //text는 key값없이 바로 넣어줌
  done: false,
}));

export const toggleCreateAction = createAction(TOGGLE, (id) => id);

export const removeCreateAction = createAction(REMOVE, (id) => id);

//3. 초기상태 정의
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

//4. 리듀서 함수 정의
const todosCreateAction = handleActions(
  //handleAction에서는 액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용
  //리듀서를 구현할 때 action.payload 사용
  //비구조화 할당으로 payload의 이름을 새로 설정 가능
  {
    // 객체 타입이 change_input일 때
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input: input }), //payload로 input이라는 이름을 설정 후 바로 사용 가능
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initialState,
);

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo),
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

export default todosCreateAction;
