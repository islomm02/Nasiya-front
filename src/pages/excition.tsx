import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { RightArrowIcon } from "../assets/icons";
import { useState } from "react";
import CustomPaymentModal from "../components/CustomPaymentModal";
import CustomPaymentAllModal from "../components/CustomPaymentAll";
import CustomPaymentChooseModal from "../components/CustomPaymentChoose";

const Excition = () => {
  const navigate = useNavigate();
  const [isModalOpenAmount, setIsModalOpenAmount] = useState(false);
  const [isModalOpenMonth, setIsModalOpenMonth] = useState(false);
  const [isModalOpenChoose, setIsModalOpenChoose] = useState(false);
  const { id } = useParams();

  return (
    <div className="containers">
      <div className="flex mt-[34px] items-center justify-between px-4 py-4">
        <button onClick={() => navigate(`/credits/${id}`)} className="p-0">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">Nasiyani so‘ndirish</h1>
        <div className="w-6"></div>
      </div>

      <h2 className="font-semibold text-[18px] my-[20px]">To'lov</h2>
      <div>
        <div
          onClick={() => setIsModalOpenMonth(true)}
          className="flex justify-between border-b border-[#EEEEEE] py-[16px] items-center cursor-pointer"
        >
          <p className="text-[14px]">1 oyga so‘ndirish</p>
          <RightArrowIcon />
        </div>
        <div
        onClick={() => setIsModalOpenAmount(true)} className="flex justify-between border-b border-[#EEEEEE] py-[16px] items-center cursor-pointer">
          <p className="text-[14px]">Har qanday miqdorda so‘ndirish</p>
          <RightArrowIcon />
        </div>
        <div onClick={() => setIsModalOpenChoose(true)} className="flex justify-between border-b border-[#EEEEEE] py-[16px] items-center cursor-pointer">
          <p className="text-[14px]">To‘lov muddatini tanlash</p>
          <RightArrowIcon />
        </div>
      </div>

      <CustomPaymentModal itemId={id} isOpen={isModalOpenMonth} setIsOpen={setIsModalOpenMonth} />
      <CustomPaymentAllModal itemId={id} isOpen={isModalOpenAmount} setIsOpen={setIsModalOpenAmount} />
      <CustomPaymentChooseModal itemId={id} isOpen={isModalOpenChoose} setIsOpen={setIsModalOpenChoose} />
    </div>
  );
};

export default Excition;
