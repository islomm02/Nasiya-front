import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";

const CommonCreditsDiv = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [common, setCommon] = useState<any>(null);

    return (
         <div className="bg-[#30AF49] mt-[38px] flex text-center justify-center items-center py-[18px] px-[89px] rounded-[20px] ">
            <div>
                <p className="text-white text-[20px] font-semibold ">
                    {isOpen ? common | 0 : "****"} so'm
                </p>
                <p className="text-[#F6F6F6B2] text-[14px] font-normal ">
                    Umumiy nasiya
                </p>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white cursor-pointer absolute right-10 "
            >
                {isOpen ? <EyeInvisibleFilled /> : <EyeFilled />}
            </button>
        </div>
    );
};

export default CommonCreditsDiv;
