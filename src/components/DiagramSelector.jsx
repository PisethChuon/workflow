import { useState, useEffect } from 'react';
import { loadBpmnFiles, loadDiagramFile } from '../utils/diagramLoader';

export default function DiagramSelector({ onSelect, selected }) {
  const [diagrams, setDiagrams] = useState([]);

  useEffect(() => {
    loadBpmnFiles().then(setDiagrams);
  }, []);

  return (
    <div style={{
      marginBottom: '16px',
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
      <label style={{ fontWeight: 500 }}>Select Workflow:</label>
      <select 
        value={selected} 
        onChange={(e) => onSelect(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
      >
        {diagrams.map(diagram => (
          <option key={diagram.id} value={diagram.id}>
            {diagram.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export { loadDiagramFile };
