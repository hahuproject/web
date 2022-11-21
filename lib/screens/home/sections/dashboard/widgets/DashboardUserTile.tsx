import React, { FunctionComponent } from "react";
import { ChevronRightIcon } from "../../../../../widgets/Icons";

type Props = {
  label: string;
  content: string;
  average: number;
};

export const DashboardUserTile: FunctionComponent<Props> = ({
  label,
  content,
  average,
}) => {
  return (
    <div className="dashboard-user-tile">
      <div className="dashboard-user-tile__label">{label}</div>
      <div className="dashboard-user-tile__content">{content}</div>
      <div className="dashboard-user-tile__graph">
        <img src="/images/bar_chart.png" alt="Bar chart image" />
      </div>
      <div
        className={`dashboard-user-tile__average ${
          average < 0 && "dashboard-user-tile__average--decreasing"
        }`}
      >
        <ChevronRightIcon color="black" />
        {average + "%"}
      </div>
    </div>
  );
};
