import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./HomeComponent/home.js";
import ScheduleComponent from "./ScheduleComponent/schedulecomponent.js";
import AddShiftComponent from "./AddShiftComponent/addshift.js";
import AddAvailability from "./Availability/AddAvailability.js";
import FindReplacement from "./FindReplacement/findreplacement.js";
import TrayUp from "./TrayUp/trayup.js";
import RTU from "./RTU/rtu.js";
import AddEmployee from "./AddEmployee/addemployee.js";
import TextExtract from "./TextExtract/textextract.js";
import ScannedItems from "./TextExtract/scannedList.js";

function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/services/1">
            <ScheduleComponent />
          </Route>
          <Route exact path="/services/2">
            <AddShiftComponent />
          </Route>
          <Route exact path="/services/3">
            <TrayUp />
          </Route>
          <Route exact path="/services/4">
            <RTU />
          </Route>
          <Route exact path="/services/5">
            <AddAvailability />
          </Route>
          <Route exact path="/services/6">
            <FindReplacement />
          </Route>
          <Route exact path="/services/7">
            <AddEmployee />
          </Route>
          <Route exact path="/services/8">
            <TextExtract />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
