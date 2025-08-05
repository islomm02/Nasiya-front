import { LogoIcon } from "../assets/icons"
import CustomForm from "../components/CustomForm"

const Login = () => {
  return (
    <div className="containers h-[100vh] flex flex-col justify-between !py-[20px]  !pt-[43px] ">
      <div><a className="!pt-[43px] w-[40px] h-[40px] " href=""><LogoIcon/></a>
      <div className="w-[80%] space-y-[12px] ">
        <h1 className="pt-[32px] font-bold text-[24px]  ">Dasturga kirish</h1>
      <p className=" mb-[38px] font-medium text-[16px] text-[#0000007a]  ">Iltimos, tizimga kirish uchun login va parolingizni kiriting.</p>
      </div>
      <CustomForm/></div>

      <p className=" w-[90%]  text-[14px]">Hisobingiz yo'q bo'lsa, tizimga kirish huquqini olish uchun <a className="text-[#3478F7]" href="">do'kon administratori</a> bilan bog'laning.</p>
    </div>
  )
}

export default Login