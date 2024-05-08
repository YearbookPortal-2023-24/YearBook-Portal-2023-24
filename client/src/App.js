import React from "react";
import "./App.css";
import Error from "./new_components/Error/Error";
// import UserList from "./components/navbar/UserList.js";
import { Route, Routes } from "react-router-dom";
import { LoginContext } from "./helpers/Context";
import DevP from "./new_components/developers_page/devp.js";
import EndHome from "./new_components/EndHome/EndHome.jsx";

const App = ({ location }) => {
  return (
    <LoginContext.Provider>
      <div id="root2" className="App overflow-x-hidden bg-cover">
        <Routes>
          {/* Homepage */}

          <Route exact path="/" element={<EndHome />} />
          <Route exact path="/team" element={<DevP />} />

          <Route exact path="*" element={<Error />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
};

export default App;
