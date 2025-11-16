import LightButton from "../LightButton";
import type { Period } from "../../pages/StatsPage.tsx";

interface StatsHeaderProps {
  setPeriod: (period: Period) => void;
}

function StatsHeader({ setPeriod }: StatsHeaderProps) {
  return (
    <div className="flex w-[50%] items-center gap-[50px] rounded-[12px] bg-white px-[25px] py-[15px]">
      <h3 className="text-[28px] font-semibold">Период:</h3>
      <div className="flex w-[100%] justify-between">
        <LightButton text="Сегодня" onClickEvent={() => setPeriod("today")} />
        <LightButton text="За неделю" onClickEvent={() => setPeriod("week")} />
        <LightButton text="За месяц" onClickEvent={() => setPeriod("month")} />
      </div>
    </div>
  );
}

export default StatsHeader;
