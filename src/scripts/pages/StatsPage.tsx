import {
  getActivityChart,
  getCategoriesChart,
  getCurrentModerator,
  getDecisionsChart,
  getStatsSummary,
} from "../api/api.ts";
import type {
  StatsSummaryResponse,
  DecisionsDataResponse,
  CategoriesChartResponse,
  ModeratorResponse,
  ActivityDataResponse,
} from "../api/models.api.ts";
import StatsSummaryList from "../components/stats/StatsSummaryList.tsx";
import StatsHeader from "../components/stats/StatsHeader.tsx";
import { useState, useEffect } from "react";
import StatsModeratorList from "../components/stats/StatsModeratorList.tsx";
import StatsDecisionsGraph from "../components/stats/StatsDecisionsGraph.tsx";
import StatsActivityGraph from "../components/stats/StatsActivityGraph.tsx";
import StatsCategoriesGraph from "../components/stats/StatsCategoriesGraph.tsx";

export type Period = "today" | "week" | "month" | "custom";

function StatsPage() {
  const [period, setPeriod] = useState<Period>("today");
  const [statsSummaryData, setStatsSummaryData] =
    useState<StatsSummaryResponse | null>(null);
  const [activityData, setActivityData] = useState<
    ActivityDataResponse[] | null
  >(null);
  const [decisionsData, setDecisionsData] =
    useState<DecisionsDataResponse | null>(null);
  const [categoriesData, setCategoriesData] =
    useState<CategoriesChartResponse | null>(null);
  const [moderatorData, setModeratorData] = useState<ModeratorResponse | null>(
    null,
  );

  const fetchStatsSummaryData = async (
    period: string,
    startDate = "",
    endDate = "",
  ) => {
    try {
      const response = await getStatsSummary({ period, startDate, endDate });
      if (response) {
        setStatsSummaryData(response);
      }
    } catch (error) {
      console.error("Ошибка загрузки статистики: ", error);
    }
  };

  const fetchActivityData = async (
    period: string,
    startDate = "",
    endDate = "",
  ) => {
    try {
      const response = await getActivityChart({ period, startDate, endDate });
      if (response) {
        setActivityData(response);
      }
    } catch (error) {
      console.error("Ошибка загрузки активности: ", error);
    }
  };

  const fetchDecisionsData = async (
    period: string,
    startDate = "",
    endDate = "",
  ) => {
    try {
      const response = await getDecisionsChart({ period, startDate, endDate });
      if (response) {
        setDecisionsData(response);
      }
    } catch (error) {
      console.error("Ошибка загрузки решений: ", error);
    }
  };

  const fetchCategoriesData = async (
    period: string,
    startDate = "",
    endDate = "",
  ) => {
    try {
      const response = await getCategoriesChart({ period, startDate, endDate });
      if (response) {
        setCategoriesData(response);
      }
    } catch (error) {
      console.error("Ошибка загрузки категорий: ", error);
    }
  };

  const fetchCurrentModeratorData = async () => {
    try {
      const response = await getCurrentModerator();
      if (response) {
        setModeratorData(response);
      }
    } catch (error) {
      console.error("Ошибка загрузки данных модератора: ", error);
    }
  };

  useEffect(() => {
    fetchStatsSummaryData(period);
    fetchActivityData(period);
    fetchDecisionsData(period);
    fetchCategoriesData(period);
  }, [period]);

  useEffect(() => {
    fetchCurrentModeratorData();
  }, []);

  return (
    <div className="min-h-screen bg-grey-3">
      <div className="container">
        <div className="flex flex-col gap-[50px] py-[25px]">
          {moderatorData && (
            <StatsModeratorList
              moderatorName={moderatorData.name}
              moderatorStats={moderatorData.statistics}
            />
          )}
          <StatsHeader setPeriod={setPeriod} />
          {statsSummaryData && (
            <StatsSummaryList
              totalReviewed={statsSummaryData.totalReviewed}
              totalReviewedToday={statsSummaryData.totalReviewedToday}
              totalReviewedThisWeek={statsSummaryData.totalReviewedThisWeek}
              totalReviewedThisMonth={statsSummaryData.totalReviewedThisMonth}
              approvedPercentage={statsSummaryData.approvedPercentage}
              rejectedPercentage={statsSummaryData.rejectedPercentage}
              requestChangesPercentage={
                statsSummaryData.requestChangesPercentage
              }
              averageReviewTime={statsSummaryData.averageReviewTime}
            />
          )}
          {decisionsData && (
            <StatsDecisionsGraph
              approved={decisionsData.approved}
              rejected={decisionsData.rejected}
              requestChanges={decisionsData.requestChanges}
            />
          )}
          {activityData && <StatsActivityGraph activityData={activityData} />}
          {categoriesData && (
            <StatsCategoriesGraph categoriesData={categoriesData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
