import type { PaymentsType } from "../@types";
import { formatPhone } from "../hooks/formatPhone";
import { FormatterPrice } from "../hooks/FormatterPrice";
import { formatDate } from "../hooks/formDate";

const PaymentsCard = ({ item ,isDate}: { item: PaymentsType, isDate: boolean }) => {
    return (
       <>
        <div className="mt-[20px] mb-[16px] ">
            <h2 className={`text-center text-[#3478F7] text-[12px] font-semibold ${isDate ? "" : "hidden"}`}>{formatDate(item.createdAt).dateOnly}</h2>
        </div>
        <div className="flex p-[16px] border-b-[1px] border-[#ECECEC] items-center justify-between">
            <div>
                <h2 className="text-[14px] font-bold ">
                    {item.debt.debter?.name}
                </h2>
                <p className="mt-2 text-[#000000ad] text-[13px] font-semibold ">
                    {formatPhone(item.debt.debter?.phone)}
                </p>
            </div>
            <p className="font-medium text-[16px] ">
                -{FormatterPrice(item.amount)?.comma}
            </p>
        </div>
       </>
    );
};

export default PaymentsCard;
