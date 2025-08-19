import { useEffect, useState } from "react";
import { FilterIcon, SearchIcon } from "../assets/icons";
import { useCookies } from "react-cookie";
import ClientsComponent from "../components/ClientsComponent";
import type { DebterType } from "../@types";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../hooks/getEnv";

const Clients = () => {
  const [cookies] = useCookies(["token"]);
  const [users, setUsers] = useState<DebterType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<DebterType[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/debter`);
        setUsers(res.data.data);
        setFilteredUsers(res.data); 
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    if (cookies.token) {
      fetchUser();
    }
  }, [cookies.token]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const handleCreate = (id:string) => {
    axios.post(`${API}/chat`, {debterId: id}, {headers: {Authorization: `Bearer ${cookies.token}`}}).then(res => {console.log(res); navigate("/report") })
  }

  return (
    <>
      <div className="containers !mt-[29px]">
        <div className="flex mb-[28px]">
          <button className="absolute top-10.5 left-6">
            <SearchIcon />
          </button>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="py-[12px] pl-[46px] w-full bg-[#F6F6F6] rounded-[12px] border-[1px] border-[#ECECEC]"
            placeholder="Mijozlarni qidirish..."
            type="text"
          />
          <button className="pl-2">
            <FilterIcon />
          </button>
        </div>
        <div className="text-center my-4">
          <h2 className="text-[15px] font-semibold">Habar yuborish uchun mijozni tanlang</h2>
        </div>
        <div className="space-y-[16px]">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item) => (
                <div onClick={() => handleCreate(item.id)}>
                    <ClientsComponent key={item.id} item={item} />
                </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Mijoz topilmadi</p>
          )}
        </div>
      </div>
      <Footer activePage="hisobot" />
    </>
  );
};

export default Clients;
