import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
import { getActivities } from "../utils/util";

export function WorkflowDesigner({ workflow }) {
  const [bpmn, setBpmn] = useState("");
  const [name, setName] = useState("");
  const modelerRef = useRef(null);

  useEffect(() => {
    modelerRef.current = new BpmnModeler({
      container: "#bpmnCanvas",
    });

    if (workflow) {
      setBpmn(workflow.bpmn);
      setName(workflow.name)
    }
    
  }, []);

  useEffect(() => {
    // Load an empty BPMN diagram
    //modelerRef.current.createDiagram();
    if (!workflow) {
      modelerRef.current.createDiagram();
      return
    }

    const load = async () => {
      await modelerRef.current.importXML(bpmn)
        .then(async () => {
          console.log(await getActivities(bpmn))
        })
        .catch((err) => {
        console.log("error", err);
        });
    };

    load();
  }, [bpmn]);

  async function save() {
    const { xml } = await modelerRef.current.saveXML({ format: true });
    //const blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
    //FileSaver.saveAs(blob, "test.bpmn");
    setBpmn(xml);
    const data = {
      ...workflow,
      name: name,
      bpmn: xml,
    };
    let response = null

    if (workflow) {
      response = await axios.put(
        `http://localhost:3000/workflows/${workflow.id}`,
        data
      )
    } else {
      response = await axios.post(
        `http://localhost:3000/workflows`,
        data
      )
    }

    if (response.status == 200 || response.status == 201) {
      alert(`workflow name = ${name} is saved successfully`);
    } else {
      alert(`workflow name = ${name} cannnot be updated`);
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between p-5">
      <div className="mb-5 flex items-center space-x-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input id="email" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        />
      </div>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={save}
        >
          Save
        </button>
      </div>
      <div id="bpmnCanvas" className="flex-1 w-full h-full"></div>
    </div>
  );
}

WorkflowDesigner.propTypes = {
  workflow: PropTypes.string,
};
