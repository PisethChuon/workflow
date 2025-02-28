import BpmnModdle from "bpmn-moddle";

export async function getActivities(xml) {
    const moddle = new BpmnModdle();
    const { rootElement } = await moddle.fromXML(xml);
    const elements = rootElement.rootElements[0].flowElements || [];
    return elements
      .filter((el) =>
        ["bpmn:Task", "bpmn:UserTask", "bpmn:ServiceTask", "bpmn:StartEvent", "bpmn:EndEvent", "bpmn:ExclusiveGateway"].includes(el.$type)
      )
      .map((el) => ({
        id: el.id,
        name: el.name || el.$type, // Use name if available
        type: el.$type.replace("bpmn:", ""),
      }));
}