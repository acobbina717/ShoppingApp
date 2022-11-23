import { Routes, Route } from "react-router-dom";

import Home from "./Routes/Home/Home";
import Navigation from "./Routes/Navigation/Navigation";
import Auth from "./Routes/Auth/Auth";

type AppProps = {};

const App = (props: AppProps) => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default App;
