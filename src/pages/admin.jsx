import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaWpforms } from "react-icons/fa";

export function AdminPage() {
  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/workflows")
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
        <div className="flex justify-end">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {
              navigate("/admin/workflow/new")
            }}
          >
            New
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-2xl"
              >
                Id
              </th>
              <th scope="col" className="px-6 py-3 text-2xl">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-2xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((w) => {
              return (
                <tr key={w.id}>
                  <td className="px-6 py-4 text-xl">{w.id}</td>
                  <td className="px-6 py-4 text-xl">{w.name}</td>
                  <td className="px-6 py-4 text-xl flex space-x-3">
                    <AiFillEdit
                      onClick={() => {
                        navigate(`/admin/workflow/${w.id}/edit`);
                      }}
                    />
                    <FaWpforms 
                      onClick={() => {
                        navigate(`/admin/workflow/${w.id}/form/new`);
                      }}
                    />

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
