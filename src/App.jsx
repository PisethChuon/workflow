import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { AdminPage } from "./pages/admin";
import { RequestorPage } from "./pages/requestor";
import { VerifierPage } from "./pages/verifier";
import { MainPage } from "./pages/main";
import { WorkflowDesigner } from "./components/WorkflowDesigner";
import { WorkflowEditPage } from "./pages/admin/workflow/edit";
import { WorkflowNewPage } from "./pages/admin/workflow/new";
import { FormDesigner } from "./components/FormDesigner";
import { EmergencyIncident } from "./forms/ei";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin/workflow" element={<AdminPage />} />
          <Route path="/admin/workflow/new" element={<WorkflowNewPage />} />
          <Route
            path="/admin/workflow/:wid/edit"
            element={<WorkflowEditPage />}
          />
          <Route
            path="/admin/workflow/:wid/form/new"
            element={<FormDesigner />}
          />
          <Route
            path="/admin/workflow/:wid/form/:fid"
            element={<WorkflowDesigner />}
          />
          <Route path="/user/sgt-verifier" element={<VerifierPage />} />
          <Route path="/user/requestor" element={<RequestorPage />} />
          <Route
            path="/user/requestor/incident"
            element={<EmergencyIncident />}
          />
        </Routes>
      </Router>
    </div>
  );
}
