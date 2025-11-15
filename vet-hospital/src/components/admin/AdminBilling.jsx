import React from 'react';
import { Plus, Download, Eye } from 'lucide-react';
import { adminData } from '../../data/mockData';

const AdminBilling = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Billing & Payments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Invoice ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Patient</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Owner</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Service</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {adminData.billing.map(bill => (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-800 font-medium">#{bill.id.toString().padStart(4, '0')}</td>
                <td className="px-4 py-4 text-sm text-gray-800">{bill.patientName}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{bill.ownerName}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{bill.service}</td>
                <td className="px-4 py-4 text-sm text-gray-800 font-semibold">${bill.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{bill.date}</td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${bill.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-700">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBilling;