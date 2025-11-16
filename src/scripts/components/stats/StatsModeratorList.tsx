import type { ModeratorStats } from "../../api/models.api";

interface StatsModeratorListProps {
  moderatorName: string;
  moderatorStats: ModeratorStats;
}

function StatsModeratorList({
  moderatorName,
  moderatorStats,
}: StatsModeratorListProps) {
  return (
    <div className="flex flex-col gap-[30px]">
      <h3 className="text-[28px] font-bold">
        Общая статистика модератора: {moderatorName}
      </h3>
      <div className="flex w-full gap-[25px]">
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {moderatorStats.totalReviewed}
          </h4>
          <span className="text-info-gray text-[16px]">Всего проверено</span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {moderatorStats.todayReviewed}
          </h4>
          <span className="text-info-gray text-[16px]">
            Проверено за сегодня
          </span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {moderatorStats.thisWeekReviewed}
          </h4>
          <span className="text-info-gray text-[16px]">
            Проверено за неделю
          </span>
        </div>

        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {moderatorStats.thisMonthReviewed}
          </h4>
          <span className="text-info-gray text-[16px]">Проверено за месяц</span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {(moderatorStats.averageReviewTime / 60 / 3600).toFixed(2)} мин.
          </h4>
          <span className="text-info-gray text-[16px]">Среднее время</span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {moderatorStats.approvalRate}%
          </h4>
          <span className="text-info-gray text-[16px]">Одобрено</span>
        </div>
      </div>
    </div>
  );
}

export default StatsModeratorList;
