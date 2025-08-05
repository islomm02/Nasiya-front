import type { ReactNode } from "react";

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
    id:string;
    image: string;
    login: string;
    name: string;
    password: string;
    phone: string;
    role: string
}
