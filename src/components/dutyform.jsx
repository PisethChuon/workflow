import { useState, useEffect } from "react";

const FormComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch("ei_submission.json") // Fetch the JSON file from public folder
      .then((response) => response.json())
      .then((data) => setFormData(data[0])) // Assuming JSON structure as array
      .catch((error) => console.error("Error loading form JSON:", error));
  }, []);

  const handleRequestClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {/* Request Button */}
      <button
        onClick={handleRequestClick}
        style={{
          background: "blue",
          color: "white",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        Request
      </button>

      {/* Display Form If Button Clicked & JSON Loaded */}
      {showForm && formData && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <h2>{formData.components[0].text}</h2>

          {formData.components.map((component, index) => {
            if (component.type === "group") {
              return (
                <div key={index} style={{ padding: "10px", border: "1px solid gray", marginBottom: "10px" }}>
                  <h3>{component.label}</h3>
                  {component.components.map((field, idx) => (
                    <div key={idx} style={{ marginBottom: "10px" }}>
                      <label>{field.label}:</label>
                      {field.type === "textfield" && <input type="text" placeholder={`Enter ${field.label}`} />}
                      {field.type === "textarea" && <textarea placeholder={`Enter ${field.label}`} />}
                      {field.type === "select" && (
                        <select>
                          {field.values.map((option, i) => (
                            <option key={i} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}

          {/* Submit Button */}
          <button style={{ background: "green", color: "white", padding: "10px", marginTop: "10px" }}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
