// Function to load all BPMN files from assets directory
export async function loadBpmnFiles() {
  const bpmnModules = import.meta.glob('../assets/*.bpmn');
  const diagrams = [];

  for (const path in bpmnModules) {
    const name = path.split('/').pop().replace('.bpmn', '');
    diagrams.push({
      id: name.toLowerCase(),
      name: name.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' '),
      file: path
    });
  }

  return diagrams;
}

export async function loadDiagramFile(filePath) {
  try {
    const module = await import(/* @vite-ignore */ filePath);
    const response = await fetch(module.default);
    return await response.text();
  } catch (err) {
    console.error('Error loading diagram:', err);
    return null;
  }
}

// Updated function to parse BPMN XML and extract task names
export async function parseBpmnTasks(bpmnXml) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(bpmnXml, "text/xml");
    // Note: getElementsByTagName will match any tag ending with 'task'
    const tasks = xmlDoc.querySelectorAll('[id*="task_"]');
    const taskInfo = [];

    for (let task of tasks) {
      taskInfo.push({
        id: task.getAttribute("id"),
        name: task.getAttribute("name")?.toLowerCase() || '',
        taskType: task.tagName
      });
    }

    console.log('Detected BPMN tasks:', taskInfo);
    return taskInfo;
  } catch (err) {
    console.error('Error parsing BPMN:', err);
    return [];
  }
}

// Modified loadFormConfig to check task-specific folders
export async function loadFormConfig(diagramName, stateName) {
  try {
    console.log('Loading form for:', { diagramName, stateName });

    // Load and parse BPMN file
    const bpmnXml = await loadDiagramFile(`../assets/${diagramName}.bpmn`);
    const tasks = await parseBpmnTasks(bpmnXml);

    // Find the current task
    const currentTask = tasks.find(t => t.name.toLowerCase() === stateName.toLowerCase());
    console.log('Current task:', currentTask);

    // Dynamic form discovery using glob
    const formFiles = import.meta.glob('../assets/activity/**/*.json');
    const formPaths = Object.keys(formFiles);

    // First try task-specific folder
    if (currentTask?.name) {
      const taskFolderForms = formPaths.filter(path => 
        path.includes(`/activity/${currentTask.name}/`)
      );
      
      if (taskFolderForms.length > 0) {
        console.log('Found forms in task folder:', taskFolderForms);
        // Try to load the form
        const formData = await import(/* @vite-ignore */ taskFolderForms[0]);
        return formData.default || formData;
      }
    }

    // Fallback: Look in diagram folder
    const diagramForms = formPaths.filter(path => 
      path.includes(`/activity/${diagramName}/`)
    );

    console.log('Fallback - checking diagram folder forms:', diagramForms);

    // Try to find a matching form using various naming patterns
    const possibleNames = [
      currentTask?.name,
      stateName,
      `${diagramName}_${stateName}`,
      `${diagramName}_${currentTask?.name}`
    ].filter(Boolean);

    const formPath = diagramForms.find(path => 
      possibleNames.some(name => path.toLowerCase().includes(name.toLowerCase()))
    );

    if (!formPath) {
      console.warn('No matching form found:', {
        diagramName,
        stateName,
        taskName: currentTask?.name,
        possibleNames
      });
      return null;
    }

    console.log('Loading form from:', formPath);
    const formData = await import(/* @vite-ignore */ formPath);
    return formData.default || formData;

  } catch (err) {
    console.error('Form loading error:', {
      diagramName,
      stateName,
      error: err.message
    });
    return null;
  }
}

export function getDiagramName(filePath) {
  return filePath.split('/').pop().replace('.bpmn', '').toLowerCase();
}
