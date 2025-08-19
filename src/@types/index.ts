import type { MouseEvent, ReactNode } from "react";


export interface TextType {
    children:ReactNode,
    extraClass?:string,
    title?:string
    onClick?:(e:MouseEvent<HTMLParagraphElement>) => void
}

export interface CalendarUniqForDayType {
  id: string;
  debtId: string;
  amount: number;
  month: number;
  date: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  Debt: {
    id: string;
    productName: string;
    date: string;
    term: number;
    note: string;
    amount: number;
    debtorId: string;
    sellerId: string;
    createdAt: string;
    updatedAt: string;
    Debtor: DebterType;
  };
}

export interface CalendarType {
  unpaidForDay: Array<CalendarUniqForDayType>;
  totalForMonth: number;
}

export interface RouteType {
    id: number;
    path: string;
    element: ReactNode;
}

export interface UserType {
    PINcode: number;
    balance: number;
    createdAt: string;
    email: string;
    id: string;
    image: string;
    login: string;
    name: string;
    password: string;
    phone: string;
    role: string;
}

export interface DebterType {
    id: string;
    name: string;
    phone: string;
    sellerId: string;
    debts: DebtType[];
    star: boolean;
}

export interface TermType {
    id: string;
    term: string;
}

export interface ChatType {
    id: string;
    debterId: string;
    sellerId: string;
    debter: DebterType;
    sellers: SellerType;
    createdAt: string;
}

export interface SellerType {
    id: string;
    name: string;
    login: string;
    phone: string;
    password: string;
    role: string;
    PINcode: number;
    createdAt: string;
    email: string;
    balance: number;
    image: string;
}

export interface PaymentsType {
    id: string;
    createdAt: string;
    debtId: string;
    month: number;
    debt: DebtType;
}

export interface MessageType {
    chatId: string;
    createdAt: string;
    debterId: string;
    id: string;
    message: string;
    status: string;
}

export interface PaymentsType {
    id: string;
    createdAt: string;
    debtId: string;
    month: number;
    amount: number;
    debt: DebtType;
}

// interface PaymentDebterType {
//     id: string;
//     name: string;
//     term: number;
//     remainingMonths: number;
//     description: string;
//     status: string;
//     createdAt: string;
//     startingTime: string;
//     summaryAmount: number;
//     remainingAmount: number;
//     monthlyPayment: number;
//     sellerId: string;
//     debterId: string;
//     nextPaymentDay: string;
//     debter: DebterType;
// }

export interface ExampleMessageType {
    id: string;
    text: string;
    status: boolean;

    sellerId: string;
}

export interface DebtType {
    id: string;
    name: string;
    description: string;
    sellerId: string;
    term: number;
    remainingMonths: number;
    summaryAmount: number;
    remainingAmount: number;
    monthlyPayment: number;
    status: "PAID" | "NOT_PAID";
    startingTime: string;
    nextPaymentDay: string;
    createdAt: string;
    debterId: string;
    debter?: DebterType;
}



export interface HeadingType {
    classList?:string,
    tag:"h1" | "h2" | "h3",
    children:ReactNode
}