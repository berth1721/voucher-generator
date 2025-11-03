import React from 'react';
import { Student } from '../types';
import { 
    AMOUNT_PER_STUDENT, 
    BOOK_ALLOWANCE_PER_STUDENT, 
    PROGRAM_NAME, 
    SCHOOL_YEAR,
    PAYEE_NAME,
    COORDINATOR_NAME,
    COORDINATOR_TITLE,
    ACCOUNTANT_NAME,
    ACCOUNTANT_TITLE,
    ACCOUNTANT_SUB_TITLE,
    DIRECTOR_NAME,
    DIRECTOR_TITLE,
    STIPEND_PER_STUDENT
} from '../constants';
import { PrintWrapper } from './PrintWrapper';

interface DisbursementVoucherViewProps {
  students: Student[];
}

export const DisbursementVoucherView: React.FC<DisbursementVoucherViewProps> = ({ students }) => {
    const numGrantees = students.length;
    const totalStipend = numGrantees * STIPEND_PER_STUDENT;
    const totalBookAllowance = numGrantees * BOOK_ALLOWANCE_PER_STUDENT;
    const totalAmount = numGrantees * AMOUNT_PER_STUDENT;

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
    };

    return (
        <PrintWrapper title="Disbursement Voucher">
            <div className="text-black text-xs p-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="text-center font-bold text-lg mb-2">DISBURSEMENT VOUCHER</div>
                
                <div className="flex justify-end mb-2">
                    <div className="w-1/3">
                        <div className="flex">
                            <span className="font-bold w-16">DV No.:</span>
                            <div className="border-b border-black flex-grow"></div>
                        </div>
                    </div>
                </div>

                <div className="border-2 border-black grid grid-cols-5">
                    {/* Left Column */}
                    <div className="col-span-4 border-r-2 border-black">
                        <div className="p-1 border-b-2 border-black">
                            <span className="font-bold mr-4">Mode of Payment</span>
                            <span>[ ] MDS Check</span>
                            <span className="ml-4">[ ] Commercial Check</span>
                            <span className="ml-4">[X] ADA</span>
                            <span className="ml-4">[ ] Others (Please specify)</span>
                        </div>
                        <div className="p-1 flex">
                            <span className="font-bold w-20">Payee</span>
                            <div className="border-b border-black flex-grow">
                                <span className="ml-2">{PAYEE_NAME}</span>
                            </div>
                        </div>
                    </div>
                    {/* Right Column */}
                    <div className="col-span-1">
                        <div className="p-1 border-b-2 border-black flex">
                            <span className="font-bold w-24">TIN/Employee No.:</span>
                            <div className="border-b border-black flex-grow"></div>
                        </div>
                        <div className="p-1 flex">
                            <span className="font-bold w-24">ORS/BURS No.:</span>
                            <div className="border-b border-black flex-grow"></div>
                        </div>
                    </div>

                    {/* Address Line */}
                    <div className="col-span-5 p-1 border-t-2 border-black">
                        <div className="flex">
                            <span className="font-bold w-20">Address</span>
                            <div className="border-b border-black flex-grow"></div>
                        </div>
                    </div>
                </div>

                {/* Particulars Table */}
                <table className="w-full border-x-2 border-b-2 border-black">
                    <thead>
                        <tr className="border-b-2 border-black font-bold text-center">
                            <td className="p-1 border-r-2 border-black">Particulars</td>
                            <td className="p-1 border-r-2 border-black w-32">Responsibility Center</td>
                            <td className="p-1 border-r-2 border-black w-24">MFO/PAP</td>
                            <td className="p-1 w-40">Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border-r-2 border-black align-top h-32">
                                <p>Payment of the financial benefits for <span className="font-bold">({numGrantees})</span> beneficiaries under the {PROGRAM_NAME} for {SCHOOL_YEAR} in the amount of................</p>
                                <div className="pl-8 mt-4">
                                    <p>Stipend (<span className="font-sans">&#8369;</span>{STIPEND_PER_STUDENT.toLocaleString()}/sem)</p>
                                    <p>Book Allowance and other Learning Materials (<span className="font-sans">&#8369;</span>{BOOK_ALLOWANCE_PER_STUDENT.toLocaleString()}/sem)</p>
                                </div>
                            </td>
                            <td className="p-1 border-r-2 border-black align-top text-center">26-004-03-00004</td>
                            <td className="p-1 border-r-2 border-black align-top"></td>
                            <td className="p-1 align-top text-right">
                                <p className="mt-12">&nbsp;</p>
                                <p>{formatCurrency(totalStipend)}</p>
                                <p>{formatCurrency(totalBookAllowance)}</p>
                            </td>
                        </tr>
                        <tr className="border-t-2 border-black font-bold">
                            <td className="p-1 border-r-2 border-black text-right">Amount Due</td>
                            <td colSpan={2}></td>
                            <td className="p-1 border-t border-black text-right">{formatCurrency(totalAmount)}</td>
                        </tr>
                    </tbody>
                </table>
                
                {/* Section A */}
                <div className="border-x-2 border-black p-2">
                    <span className="font-bold">A.</span> Certified: Expenses/Cash Advance necessary, lawful and incurred under my direct supervision.
                    <div className="text-center mt-8">
                        <p className="font-bold">{COORDINATOR_NAME}</p>
                        <hr className="border-black w-1/3 mx-auto" />
                        <p>Education Supervisor II / Stufaps Coordinator</p>
                    </div>
                </div>

                {/* Section B */}
                <div className="border-2 border-black">
                    <p className="p-1 font-bold">B. Accounting Entry:</p>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center font-bold">
                                <td className="p-1 border-t-2 border-r-2 border-black">Account Title</td>
                                <td className="p-1 border-t-2 border-r-2 border-black">UACS Code</td>
                                <td className="p-1 border-t-2 border-r-2 border-black">Debit</td>
                                <td className="p-1 border-t-2 border-black">Credit</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-10 text-center">
                                <td className="border-t-2 border-r-2 border-black text-left pl-2">Scholarship Grants/Expenses</td>
                                <td className="border-t-2 border-r-2 border-black">5-02-02-020-00</td>
                                <td className="border-t-2 border-r-2 border-black text-right pr-2">{formatCurrency(totalAmount)}</td>
                                <td className="border-t-2 border-black"></td>
                            </tr>
                            <tr className="h-10 text-center">
                                <td className="border-t border-r-2 border-black text-left pl-2">Cash - MDS, Trust</td>
                                <td className="border-t border-r-2 border-black">1-01-04-060-00</td>
                                <td className="border-t border-r-2 border-black"></td>
                                <td className="border-t border-black text-right pr-2">{formatCurrency(totalAmount)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Section C & D */}
                <div className="grid grid-cols-2 border-x-2 border-b-2 border-black">
                    <div className="p-2 border-r-2 border-black">
                        <p><span className="font-bold">C.</span> Certified:</p>
                        <p className="mt-1 ml-4">[X] Cash available</p>
                        <p className="ml-4">[X] Subject to Authority to Debit Account (when applicable)</p>
                        <p className="ml-4">[ ] Supporting documents complete and amount claimed proper</p>
                        
                        <div className="grid grid-cols-2 mt-4">
                            <div><p>Signature</p></div>
                            <div className="border-b border-black"></div>
                        </div>
                        <div className="grid grid-cols-2 mt-1">
                            <div><p>Printed Name</p></div>
                            <div className="font-bold">{ACCOUNTANT_NAME}</div>
                        </div>
                         <div className="grid grid-cols-2 mt-1">
                            <div><p>Position</p></div>
                            <div>
                                <p>{ACCOUNTANT_TITLE}</p>
                                <p className="text-[10px]">{ACCOUNTANT_SUB_TITLE}</p>
                            </div>
                        </div>
                         <div className="grid grid-cols-2 mt-1">
                            <div><p>Date</p></div>
                            <div className="border-b border-black"></div>
                        </div>
                    </div>

                    <div className="p-2">
                        <p><span className="font-bold">D.</span> Approved for Payment</p>
                        <div className="grid grid-cols-2 mt-12">
                            <div><p>Signature</p></div>
                            <div className="border-b border-black"></div>
                        </div>
                        <div className="grid grid-cols-2 mt-1">
                            <div><p>Printed Name</p></div>
                            <div className="font-bold">{DIRECTOR_NAME}</div>
                        </div>
                         <div className="grid grid-cols-2 mt-1">
                            <div><p>Position</p></div>
                            <div>
                                <p>{DIRECTOR_TITLE}</p>
                                <p className="text-[10px]">Agency Head/Authorized Representative</p>
                            </div>
                        </div>
                         <div className="grid grid-cols-2 mt-1">
                            <div><p>Date</p></div>
                            <div className="border-b border-black"></div>
                        </div>
                    </div>
                </div>

                 {/* Section E */}
                <div className="border-x-2 border-b-2 border-black p-2">
                    <p><span className="font-bold">E.</span> Receipt of Payment</p>
                    <div className="grid grid-cols-10 gap-x-4 mt-2">
                        <div className="col-span-2">Check/ADA No.:</div>
                        <div className="col-span-3 border-b border-black"></div>
                        <div className="col-span-1">Date:</div>
                        <div className="col-span-2 border-b border-black"></div>
                        <div className="col-span-2">IEV No.:</div>
                    </div>
                    <div className="grid grid-cols-10 gap-x-4 mt-2">
                        <div className="col-span-2">Signature:</div>
                        <div className="col-span-3 border-b border-black"></div>
                        <div className="col-span-3">Bank Name & Account Number:</div>
                        <div className="col-span-2 border-b border-black"></div>
                    </div>
                    <div className="grid grid-cols-10 gap-x-4 mt-2">
                        <div className="col-span-2"></div>
                        <div className="col-span-3"></div>
                        <div className="col-span-1">Date:</div>
                        <div className="col-span-2 border-b border-black"></div>
                         <div className="col-span-2"></div>
                    </div>
                     <div className="mt-2">
                        Official Receipt No. & Date/Other Documents:
                    </div>
                </div>
            </div>
        </PrintWrapper>
    );
};
