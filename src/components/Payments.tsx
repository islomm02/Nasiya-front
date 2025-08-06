
const Payments = ({title, count, type}: {title: string, count: number, type: "red" | "green"}) => {
  return (
    <div className="border-[1px] flex flex-col justify-between p-[16px] border-[#ECECEC] rounded-[16px] h-[127px] w-[168px]  ">
        <p className="text-[14px] font-medium w-[50%] ">{title}</p>
        <p className={`${type == "red" ? "text-red-500" : "text-green-600"} font-semibold text-[18px]  `} >{count}</p>
    </div>
  )
}

export default Payments