import type { StatsSummaryResponse } from "../../api/models.api";

function StatsSummaryList({
  totalReviewed,
  approvedPercentage,
  rejectedPercentage,
  requestChangesPercentage,
  averageReviewTime,
}: StatsSummaryResponse) {
  return (
    <div className="flex flex-col gap-[30px]">
      <h3 className="text-[28px] font-bold">Общая статистика</h3>
      <div className="flex w-full gap-[25px]">
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">{totalReviewed}</h4>
          <span className="text-info-gray text-[16px]">Проверено</span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {approvedPercentage.toFixed(2)}%
          </h4>
          <span className="text-info-gray text-[16px]">Одобрено</span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {rejectedPercentage.toFixed(2)}%
          </h4>
          <span className="text-info-gray text-[16px]">Отклонено</span>
        </div>

        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {requestChangesPercentage.toFixed(2)}%
          </h4>
          <span className="text-info-gray text-[16px]">На доработку</span>
        </div>
        <div className="flex w-full flex-col justify-center gap-[10px] rounded-[6px] bg-white p-[20px]">
          <h4 className="text-[24px] font-bold">
            {(averageReviewTime / 60 / 3600).toFixed(2)} мин.
          </h4>
          <span className="text-info-gray text-[16px]">Среднее время</span>
        </div>
      </div>
    </div>
  );
}

export default StatsSummaryList;
