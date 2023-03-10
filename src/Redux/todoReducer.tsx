import {
  ADD_CONTENT,
  ADD_SURVEY,
  EDIT_CONTENT,
  EDIT_SURVEY,
  GET_USER,
  REMOVE_CONTENT,
  REMOVE_SURVEY,
} from "./typeTodo";
let id: any;
let initialSurvey: any[] = [];
const user = JSON.parse(sessionStorage.getItem("result") || "{}");

if (user !== null) {
  id = user.id;
  let oldData = JSON.parse(localStorage.getItem(`survey${id}`) || "{}");
  if (oldData !== null) {
    initialSurvey = oldData;
  }
}

const reducer = (
  state = initialSurvey,
  action: { type: any; payload: any[] }
) => {
  switch (action.type) {
    case GET_USER:
      id = action.payload;
      let oldData = JSON.parse(localStorage.getItem(`survey${id}`) || "{}");
      if (oldData !== null) {
        state = oldData;
        return state;
      }
      return state;

    case ADD_SURVEY:
      localStorage.setItem(
        `survey${id}`,
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];

    case REMOVE_SURVEY:
      // eslint-disable-next-line eqeqeq
      state = state.filter((s) => s.id != action.payload);
      localStorage.setItem(`survey${id}`, JSON.stringify(state));
      return state;

    case EDIT_SURVEY:
      // eslint-disable-next-line eqeqeq
      let cur3 = state.find((s) => s.id == action.payload[0]);
      let curData = action.payload[1];
      cur3 = { ...cur3, ...curData };
      // eslint-disable-next-line eqeqeq
      state = state.map((s) => (s.id == cur3.id ? cur3 : s));
      localStorage.setItem(`survey${id}`, JSON.stringify(state));
      return state;

    case ADD_CONTENT:
      // eslint-disable-next-line eqeqeq
      let cur1 = state.find((s) => s.id == action.payload[0]);
      cur1.content.push(action.payload[1]);
      // eslint-disable-next-line eqeqeq
      state = state.map((s) => (s.id == cur1.id ? cur1 : s));
      localStorage.setItem(`survey${id}`, JSON.stringify(state));
      return state;

    case REMOVE_CONTENT:
      // eslint-disable-next-line eqeqeq
      let cur2 = state.find((s) => s.id == action.payload[0]);
      let newItem2 = cur2.content.filter(
        (c: { id: any }) => c.id !== action.payload[1]
      );
      cur2.content = newItem2;
      // eslint-disable-next-line eqeqeq
      state = state.map((s) => (s.id == cur2.id ? cur2 : s));
      localStorage.setItem(`survey${id}`, JSON.stringify(state));
      return state;

    case EDIT_CONTENT:
      // eslint-disable-next-line eqeqeq
      let cur = state.find((s) => s.id == action.payload[0]);
      // eslint-disable-next-line eqeqeq
      let newItem = cur.content.map((c: { id: any }) =>
        // eslint-disable-next-line eqeqeq
        c.id == action.payload[1].id ? action.payload[1] : c
      );
      cur.content = newItem;
      // eslint-disable-next-line eqeqeq
      state = state.map((s) => (s.id == cur.id ? cur : s));
      localStorage.setItem(`survey${id}`, JSON.stringify(state));
      return state;

    default:
      return state;
  }
};

export default reducer;
