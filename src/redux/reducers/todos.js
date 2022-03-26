// Khai báo default state cho reducer
const initialState = {
  data: [],
  filter: "all",
  search: "",
};



// Nếu default state là 1 object hay array.
// Khi cập nhật state bắt buộc phải return về array hoặc object mới
// Bởi vì redux sẽ thực hiện shallow compare (===) để kiểm tra state có thay đổi hay không => đối với object hoặc array sẽ kiểm tra địa chỉ vùng nhớ của biến => cần return về array hoặc object mới nếu thay đổi state
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TODOS": {
      // state.data = action.data
      // return state
      return { ...state, data: action.data };
    }
    case "CHANGE_FILTER": {
      return { ...state, filter: action.data };
    }
    case "CHANGE_SEARCH": {
      return { ...state, search: action.data };
    }
    default:
      return state;
  }
};

export default todoReducer;
