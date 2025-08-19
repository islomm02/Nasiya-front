import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";
import { FormatterPrice } from "../hooks/FormatterPrice";
import { useNavigate } from "react-router-dom";

const CommonCreditsDiv = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [common, setCommon] = useState<any>(null);
    const [cookies, __setCookie, removeCookie] = useCookies(["token", "refreshToken"]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios
                    .get(`${API}/common/debts`, {
                        headers: { Authorization: `Bearer ${cookies.token}` },
                    })
                    .then((res) => setCommon(res.data));
            } catch (error) {
                console.error("Xatolik:", error);
                // @ts-ignore
                if (error.response?.status === 401) {
        try {
          await axios.post(`${API}/auth/refresh`, {
            refreshToken: cookies.refreshToken,
          });

          


        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }

        removeCookie("token");
        navigate("/login");
      }
            }
        };

        if (cookies.token) {
            fetchUser();
        }
    }, [cookies.token]);

    return (
        <div className="bg-[#30AF49] w-[344px] mt-[38px] flex text-center justify-center items-center py-[18px] px-[8px] rounded-[20px] ">
            <div>
                <p className="text-white text-[20px] font-semibold ">
                    {isOpen ? FormatterPrice(common)?.space : "****"} so'm
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
