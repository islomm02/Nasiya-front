import { useNavigate } from "react-router-dom";
import { SuccessIcon } from "../assets/icons";

const SuccessModal = ({to, action}:{to?:string, action?:string}) => {
    const navigate = useNavigate();
    return (
          <div className="bg-white flex flex-col justify-between items-center p-6 w-full h-[100vh] text-center shadow-lg">
            <div className="mt-[173px]">
              <SuccessIcon />
            <h2 className="mt-[28px] text-[#3478F7] text-[22px] font-bold">Ajoyib!</h2>
            <p className="mt-[12px] text-[16px] font-medium">Muvaffaqiyatli {action || "so‘ndirildi"} </p>
            </div>
            <button
                onClick={() => navigate( to || `/clients`)}
                className="mt-6 px-8 py-3 bg-[#3478F7] hover:bg-[#2c6dd6] text-[18px] font-medium text-white rounded-[10px] transition w-full"
            >
                Ortga
            </button>
          </div>
    );
};

export default SuccessModal;
