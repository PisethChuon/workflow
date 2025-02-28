export function VerifierPage() {
return (
    <div>
        <h1 className="px-3 py-6 text-3xl">Duty Verifier</h1>
        <div className="px-50">
            <ul className="w-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex justify-between">
                    <span>Requestor</span>
                    <span>Date</span>
                </li>
            </ul>
        </div>
    </div>
);
}
