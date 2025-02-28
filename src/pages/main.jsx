export function MainPage() {
  return (
    <div className="flex justify-center items-center space-x-5 w-full h-full">
      <button
        className="w-96 h-16 bg-red-700 text-white flex justify-center items-center cursor-pointer"
        onClick={() => (window.location.href = "/admin/workflow")}
      >
        Login as Admin
      </button>
      <button
        className="w-96 h-16 bg-red-700 text-white flex justify-center items-center cursor-pointer"
        onClick={() => (window.location.href = "/user/hod")}
      >
        Login as HOD
      </button>
      <button
        className="w-96 h-16 bg-red-700 text-white flex justify-center items-center cursor-pointer"
        onClick={() => (window.location.href = "/user/sgt-verifier")}
      >
        Login as SGT Verifier
      </button>
      <button
        className="w-96 h-16 bg-red-700 text-white flex justify-center items-center cursor-pointer"
        onClick={() => (window.location.href = "/user/requestor")}
      >
        Login as Requestor
      </button>
    </div>
  );
}
