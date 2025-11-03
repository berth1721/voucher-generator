
import React, { useState } from 'react';
import { Student } from '../types';

interface DataInputViewProps {
  students: Student[];
  addStudent: (name: string) => void;
  addMultipleStudents: (names: string[]) => void;
  removeStudent: (id: number) => void;
  clearAllStudents: () => void;
}

export const DataInputView: React.FC<DataInputViewProps> = ({ students, addStudent, addMultipleStudents, removeStudent, clearAllStudents }) => {
  const [name, setName] = useState('');
  const [bulkNames, setBulkNames] = useState('');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(name);
    setName('');
  };

  const handleAddMultiple = () => {
    const namesArray = bulkNames.split('\n').filter(n => n.trim() !== '');
    addMultipleStudents(namesArray);
    setBulkNames('');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Input Forms Column */}
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Add Single Student</h2>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-600">Student's Full Name</label>
              <input
                id="studentName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Juan Dela Cruz"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add Student
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Add Multiple Students</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="bulkNames" className="block text-sm font-medium text-gray-600">Enter names, one per line</label>
              <textarea
                id="bulkNames"
                rows={5}
                value={bulkNames}
                onChange={(e) => setBulkNames(e.target.value)}
                placeholder="Jane Doe&#10;John Smith"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button onClick={handleAddMultiple} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Add in Bulk
            </button>
          </div>
        </div>
      </div>

      {/* Student List Column */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-700">Student List ({students.length})</h2>
            {students.length > 0 && (
                <button onClick={clearAllStudents} className="text-sm font-medium text-red-600 hover:text-red-800">Clear All</button>
            )}
        </div>
        <div className="max-h-[600px] overflow-y-auto pr-2">
          {students.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <li key={student.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.atmAccount}</p>
                    </div>
                  </div>
                  <button onClick={() => removeStudent(student.id)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No students added yet.</p>
              <p className="text-sm text-gray-400 mt-2">Use the forms to add students to the list.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
