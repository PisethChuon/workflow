import { useState, useEffect } from "react";
import axios from "axios";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RequestorPage() {
  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setWorkflows(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-2xl">
                Form Type
              </th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((u) => {
              return (
                <tr key={u.id}>
                  <td className="px-3 py-4 text-xl">
                    {u.inbox.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate("/user/requestor/incident")}
                      >
                        <Folder className="w-5 h-5 text-gray-500" />{" "}
                        {item.workflow_id}
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
