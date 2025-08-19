import { useNavigate } from "react-router-dom";
import type { DebterType } from "../@types";
import { StarIconFilled, StarIconUnfilled } from "../assets/icons";
import { FormatterPrice } from "../hooks/FormatterPrice";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useCookies } from "react-cookie";
import { useState } from "react";

const ClientsComponent = ({ item }: { item: DebterType }) => {
    const navigate = useNavigate();
    const [star, setStar] = useState(item.star)
    const [cookies, __setCookie, removeCookie] = useCookies([
        "token",
        "refreshToken",
    ]);

    const handleStar = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const updateUser = async () => {
            try {
                await axios.patch(
                    `${API}/debter/${id}`,
                    { star: !item.star },
                    { headers: { Authorization: `Bearer ${cookies.token}` } }
                );
                setStar(!star)
            } catch (err) {
                console.error(err);
                // @ts-ignore
                if (err.response?.status === 401) {
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
        updateUser();
    };

    return (
        <div
            onClick={() => navigate(`${item.id}`)}
            className="bg-[#F6F6F6] p-4 border-[1px] border-[#ECECEC] rounded-[16px] relative"
        >
            <button
                onClick={(e) => handleStar(e, item.id)}
                className="absolute right-10"
            >
                {star ? <StarIconFilled /> : <StarIconUnfilled />}
            </button>
            <div className="mb-[16px]">
                <h3 className="font-semibold mb-1 text-[16px] ">{item.name}</h3>
                <p className="font-medium text-[14px] text-[#1A1A1A] ">
                    {item.phone}
                </p>
            </div>
            <div>
                <p className="text-[12px] mb-1 font-semibold">Jami nasiya:</p>
                <p className="font-semibold text-[16px] text-[#F94D4D] ">
                    -
                    {FormatterPrice(
                        (item.debts ?? []).reduce(
                            (sum, d) => sum + (d?.summaryAmount ?? 0),
                            0
                        )
                    )?.space}{" "}
                    so'm
                </p>
            </div>
        </div>
    );
};

export default ClientsComponent;
