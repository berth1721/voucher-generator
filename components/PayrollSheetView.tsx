import React from 'react';
import { Student } from '../types';
// FIX: Import missing constants
import { 
    AMOUNT_PER_STUDENT, 
    PROGRAM_NAME, 
    SCHOOL_YEAR,
    COORDINATOR_NAME,
    COORDINATOR_TITLE,
    DIRECTOR_NAME,
    DIRECTOR_TITLE
} from '../constants';
import { PrintWrapper } from './PrintWrapper';

interface PayrollSheetViewProps {
  students: Student[];
}

export const PayrollSheetView: React.FC<PayrollSheetViewProps> = ({ students }) => {
  const totalAmount = students.length * AMOUNT_PER_STUDENT;
  
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <PrintWrapper title="Payroll Sheet">
        <div className="text-black text-xs font-mono p-4" style={{ fontFamily: 'Consolas, monospace' }}>
            {/* Header */}
            <div className="text-center mb-4">
                <p>SCHOLARSHIP PROGRAM</p>
                <p className="font-bold">{PROGRAM_NAME}</p>
                <p>SCHOOL YEAR</p>
            </div>
            <div className="flex justify-between mb-4">
                <p>SCHOOL ADDRESS</p>
                <p>COSCHO</p>
                <p>#REF!</p>
            </div>
            <div className="flex justify-end mb-2">
                <p className="font-bold">{SCHOOL_YEAR}</p>
            </div>
            
            {/* Table */}
            <table className="w-full border-collapse border border-black">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black p-1 text-center font-bold">NO.</th>
                        <th className="border border-black p-1 text-center font-bold">NAME</th>
                        <th className="border border-black p-1 text-center font-bold">AMOUNT</th>
                        <th className="border border-black p-1 text-center font-bold">ATM ACCOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td className="border border-black p-1 text-center">{index + 1}</td>
                            <td className="border border-black p-1">{student.name.toUpperCase()}</td>
                            <td className="border border-black p-1 text-right">{formatCurrency(AMOUNT_PER_STUDENT)}</td>
                            <td className="border border-black p-1 text-center">{student.atmAccount}</td>
                        </tr>
                    ))}
                     {/* Render empty rows to have at least 20 rows total */}
                    {Array.from({ length: Math.max(0, 20 - students.length) }).map((_, index) => (
                        <tr key={`empty-${index}`}>
                            <td className="border border-black p-1 text-center">{students.length + index + 1}</td>
                            <td className="border border-black p-1">&nbsp;</td>
                            <td className="border border-black p-1">&nbsp;</td>
                            <td className="border border-black p-1">&nbsp;</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="border border-black p-1 text-right font-bold" colSpan={2}>TOTAL</td>
                        <td className="border border-black p-1 text-right font-bold">{formatCurrency(totalAmount)}</td>
                        <td className="border border-black p-1"></td>
                    </tr>
                </tbody>
            </table>

            {/* Footer */}
            <div className="mt-16 grid grid-cols-2 gap-4">
                <div>
                    <p>Certified Correct:</p>
                    <div className="mt-12 text-center">
                        <p className="font-bold underline">{COORDINATOR_NAME}</p>
                        <p>{COORDINATOR_TITLE}</p>
                    </div>
                </div>
                <div>
                    <p>Approved:</p>
                    <div className="mt-12 text-center">
                        <p className="font-bold underline">{DIRECTOR_NAME}</p>
                        <p>{DIRECTOR_TITLE}</p>
                    </div>
                </div>
            </div>
        </div>
    </PrintWrapper>
  );
};
