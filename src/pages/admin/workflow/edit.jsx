import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import { WorkflowDesigner } from "../../../components/WorkflowDesigner";

export function WorkflowEditPage() {
    const { wid } = useParams()
    const [workflow, setWorkflow] = useState(null)

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await axios.get(`http://localhost:3000/workflows/${wid}`)
            setWorkflow(response.data)
        }
        fetchDetail()
    }, [])
    return (
        <div className="w-full h-full">
            {workflow ? <WorkflowDesigner workflow={workflow}/> : <></>}
        </div>
    )
}