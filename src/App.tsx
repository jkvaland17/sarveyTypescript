import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Workplace from "./component/Workplace";
import Create from "./component/Create";
import { Provider } from "react-redux";
import store from "./Redux/store";
import User from "./component/User";
import Thanks from "./component/Thanks";
import "./style.css";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workplace" element={<Workplace />} />
            <Route path="/create/:id" element={<Create />} />
            <Route path="/user/:id/:uid" element={<User />} />
            <Route path="/thanks/:id/:uid" element={<Thanks />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
