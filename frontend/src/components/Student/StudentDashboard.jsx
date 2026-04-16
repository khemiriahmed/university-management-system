

import {useUserContext} from "../../context/StudentContext.jsx"

export default function StudentDashboard() {
   const { user} = useUserContext()
  return (
    <>  
     <div className="overflow-x-auto">
  <table className="w-full text-sm text-left border-collapse">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
          <th className="px-6 py-3 font-semibold text-gray-900">#ID</th>
        <th className="px-6 py-3 font-semibold text-gray-900">Name</th>
        <th className="px-6 py-3 font-semibold text-gray-900">Email</th>
          <th className="px-6 py-3 font-semibold text-gray-900">Date</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4 text-green-600">{user.name}</td>
        <td className="px-6 py-4 text-green-600">{user.email}</td>
        <td className="px-6 py-4 text-green-600">{user.created_at}</td>

      </tr>
    </tbody>
  </table>
</div>
    </>
  )
}

