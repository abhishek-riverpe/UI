interface ArrivalTimeProps {
  arrivalDate: string;
}

export const ArrivalTime = ({ arrivalDate }: ArrivalTimeProps): JSX.Element => {
  return (
    <div className="mb-6 flex justify-center">
      <div className="flex flex-col items-center">
      <label className="block text-md font-medium mb-2 text-[#222222]">
        Should arrive by
      </label>
      
      <div className="inline-flex font-bold items-center px-2 py-1 bg-[#E2F5EE] text-[#137C59] border-2 border-[#1FCB92] rounded-full">
        <img src="/check.svg" alt="" className="w-4 h-4 mr-2" />
        <span className="font-medium">{arrivalDate}</span>
      </div>
      </div>
    </div>
  );
};
