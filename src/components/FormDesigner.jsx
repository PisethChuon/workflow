import { useEffect, useRef, useState } from "react";
import { FormEditor, Form } from "@bpmn-io/form-js";
import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import "../styles/formEditor.css";
import axios from "axios";
import PropTypes from "prop-types";

const defaultSchema = {
  components: [
    {
      type: "text",
      label: "Text Field",
      id: "Field_1",
    }
  ],
  type: "default"
};

const containerStyles = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f8f8f8',
  position: 'relative'
};

const toolbarStyles = {
  display: 'flex',
  gap: '0.5rem',
  padding: '0.5rem',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e0e0e0',
  alignItems: 'center'
};

const buttonStyles = {
  padding: '8px 16px',
  backgroundColor: '#2196f3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
};

const editorContainerStyles = {
  display: 'flex',
  flex: 1,
  minHeight: 0
};

const mainPanelStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
};

export function FormDesigner({wid, formSchema}) {
  const formEditorRef = useRef(null);
  const formPreviewRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [previewForm, setPreviewForm] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSchema, setCurrentSchema] = useState(defaultSchema);

  useEffect(() => {
    // Initialize form editor
    const initEditor = async () => {
      const editor = new FormEditor({
        container: formEditorRef.current
      });
      
      await editor.importSchema(currentSchema);
      
      editor.on('changed', ({ schema }) => {
        setCurrentSchema(schema);
      });

      setEditor(editor);
    };

    initEditor();

    return () => {
      editor?.destroy();
      previewForm?.destroy();
    };
  }, []);

  // Update preview effect
  useEffect(() => {
    let currentPreview = null;

    const setupPreview = async () => {
      if (showPreview && formPreviewRef.current) {
        try {
          // Clean up existing preview if any
          if (previewForm) {
            previewForm.destroy();
          }

          // Create and setup new preview
          currentPreview = new Form();
          await currentPreview.importSchema(currentSchema);
          currentPreview.attachTo(formPreviewRef.current);
          setPreviewForm(currentPreview);
        } catch (err) {
          console.error('Error setting up preview:', err);
        }
      }
    };

    setupPreview();

    // Cleanup function
    return () => {
      if (currentPreview) {
        currentPreview.destroy();
      }
      if (previewForm) {
        previewForm.destroy();
      }
      setPreviewForm(null);
    };
  }, [showPreview, currentSchema]);

  const handleSave = async () => {
    const schema = editor.saveSchema();
    /*
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-schema.json';
    a.click();
    URL.revokeObjectURL(url);
    */

    let response = null
    if(!formSchema) {
      response = await axios.post(`/admin/forms`, {
        
      })
    }
  };

  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const schema = JSON.parse(e.target.result);
          await editor.importSchema(schema);
          setCurrentSchema(schema);
        } catch (err) {
          console.error('Error loading schema:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={toolbarStyles}>
        <button 
          style={buttonStyles}
          onClick={handleSave}
        >
          <span>💾</span> Save
        </button>

        <label style={{...buttonStyles, backgroundColor: '#4caf50'}}>
          <span>📁</span> Open
          <input
            type="file"
            accept=".json"
            onChange={handleLoad}
            style={{ display: 'none' }}
          />
        </label>

        <button 
          style={{
            ...buttonStyles,
            backgroundColor: showPreview ? '#f44336' : '#00bcd4'
          }}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? '❌ Hide Preview' : '👁️ Preview'}
        </button>
      </div>

      <div style={editorContainerStyles}>
        <div style={mainPanelStyles}>
          <div ref={formEditorRef} className="form-editor" />
        </div>
        
        {showPreview && (
          <div style={{
            width: '40%',
            borderLeft: '1px solid #e0e0e0',
            backgroundColor: '#fff',
            overflowY: 'auto'
          }}>
            <div ref={formPreviewRef} className="form-preview" />
          </div>
        )}
      </div>
    </div>
  );
}

FormDesigner.propTypes = {
  wid: PropTypes.number,
  formSchema: PropTypes.string
};

