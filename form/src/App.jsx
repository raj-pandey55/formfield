import { Routes, Route } from "react-router-dom";
import ListServices from "./components/ListServices";
import CreateService from "./components/CreateService";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListServices />} />
        <Route path="/createService" element={<CreateService/>}></Route>
      </Routes>
    </>
  );
}

export default App;
