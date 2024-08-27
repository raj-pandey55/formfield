import { Routes, Route } from "react-router-dom";
import ListServices from "./components/ListServices";
import CreateService from "./components/CreateService";
import ListEvents from "./components/ListEvents";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListServices />} />
        <Route path="/createService" element={<CreateService/>}></Route>
        <Route path="/event" element={<ListEvents/>}></Route>
        <Route path="/createEvent" element={<CreateEvent/>}></Route>
      </Routes>
    </>
  );
}

export default App;
