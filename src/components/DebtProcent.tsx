type DebtProgressProps = {
  term: number;             // jami oylar
  remainingMonths: number;  // qolgan oylar
};

export const DebtProgress = ({ term, remainingMonths }: DebtProgressProps) => {
  const paidMonths = term - remainingMonths;
  const progressPercent = Math.round((paidMonths / term) * 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all duration-500"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};
