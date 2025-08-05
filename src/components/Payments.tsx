
const Payments = ({title, count, type}: {title: string, count: number, type: "red" | "green"}) => {
  return (
    <div className="border-[1px] border-[#ECECEC] rounded-[16px] h-[127px] w-[168px]  ">
        <p>{title}</p>
        <p className="" >{count}</p>
    </div>
  )
}

export default Payments