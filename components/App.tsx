
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DataInputView } from './components/DataInputView';
import { PayrollSheetView } from './components/PayrollSheetView';
import { DisbursementVoucherView } from './components/DisbursementVoucherView';
import { Student } from './types';
import { View } from './types';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      return savedStudents ? JSON.parse(savedStudents) : [];
    } catch (error) {
      console.error('Error reading students from localStorage', error);
      return [];
    }
  });

  const [activeView, setActiveView] = useState<View>(View.DATA_INPUT);

  useEffect(() => {
    try {
      localStorage.setItem('students', JSON.stringify(students));
    } catch (error) {
      console.error('Error saving students to localStorage', error);
    }
  }, [students]);

  const addStudent = (name: string) => {
    if (name.trim() === '') return;
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent: Student = {
      id: newId,
      name,
      atmAccount: `1212-1313-${13 + newId}`,
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  const addMultipleStudents = (names: string[]) => {
    const newStudents = names
      .filter(name => name.trim() !== '')
      .map((name, index) => {
        const baseId = students.length > 0 ? Math.max(...students.map(s => s.id)) : 0;
        const newId = baseId + 1 + index;
        return {
          id: newId,
          name: name.trim(),
          atmAccount: `1212-1313-${13 + newId}`,
        };
      });
    setStudents(prevStudents => [...prevStudents, ...newStudents]);
  };

  const removeStudent = (id: number) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
  };
  
  const clearAllStudents = () => {
    setStudents([]);
  };

  const renderContent = () => {
    switch (activeView) {
      case View.DATA_INPUT:
        return <DataInputView students={students} addStudent={addStudent} addMultipleStudents={addMultipleStudents} removeStudent={removeStudent} clearAllStudents={clearAllStudents} />;
      case View.PAYROLL:
        return <PayrollSheetView students={students} />;
      case View.VOUCHER:
        return <DisbursementVoucherView students={students} />;
      default:
        return <DataInputView students={students} addStudent={addStudent} addMultipleStudents={addMultipleStudents} removeStudent={removeStudent} clearAllStudents={clearAllStudents}/>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
