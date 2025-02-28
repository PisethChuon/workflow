import { useEffect, useRef } from "react";
import { Form } from "@bpmn-io/form-js";

export function EmergencyIncident() {
  const formRef = useRef(null);

  useEffect(() => {
    fetch("/ei_submission.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Loaded JSON:", data);
        if (data && formRef.current) {
          const form = new Form({ container: formRef.current });
          if (Array.isArray(data) && data.length > 0) {
            form.importSchema(data[0]);
          } else {
            form.importSchema(data); // Handle the case where data is an object
          }
        } else {
          console.error("Invalid JSON format:", data);
        }
      })
      .catch((error) => console.error("Error loading form:", error));
  }, []);

  const handleSubmit = () => {
    console.log("Form Submitted");

    // Add form submission logic
  };

  return (
    <div>
      <h2 className="px-3 py-6 text-3xl">Emergency Incident</h2>
      <div ref={formRef}></div> {/* This is where the form will render */}
      <div className="flex justify-end px-3 py-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
