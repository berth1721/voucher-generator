export interface Student {
  id: number;
  name: string;
  atmAccount: string;
}

export enum View {
  DATA_INPUT = 'DATA_INPUT',
  PAYROLL = 'PAYROLL',
  VOUCHER = 'VOUCHER',
}
