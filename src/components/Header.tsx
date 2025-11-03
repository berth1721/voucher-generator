import React from 'react';
import { View } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  view: View;
  activeView: View;
  onClick: (view: View) => void;
}> = ({ label, view, activeView, onClick }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-white shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="ml-3 text-2xl font-bold text-gray-800">Voucher Generator</h1>
          </div>
          <nav className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <NavButton label="Data Input" view={View.DATA_INPUT} activeView={activeView} onClick={setActiveView} />
            <NavButton label="Payroll Sheet" view={View.PAYROLL} activeView={activeView} onClick={setActiveView} />
            <NavButton label="Disbursement Voucher" view={View.VOUCHER} activeView={activeView} onClick={setActiveView} />
          </nav>
        </div>
      </div>
    </header>
  );
};
