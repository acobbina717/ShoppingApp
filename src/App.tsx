import { useEffect } from "react";

import { useAppDispatch } from "./utils/redux/hooks/hooks";
import { checkUserSession } from "./utils/redux/features/user/userSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div>
      <p>jn</p>
    </div>
    // <Routes>
    //   <Route path="/" element={<Nav />}>
    //     <Route index element={<Home />} />
    //     <Route path="shop/*" element={<Shop />} />
    //     <Route path="auth" element={<Auth />} />
    //     <Route path="checkout" element={<Checkout />} />
    //   </Route>
    // </Routes>
  );
};

export default App;
