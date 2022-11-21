import React, { useEffect } from "react";
import { USER_TYPES } from "../../../../models/User";
import { useAnnouncement } from "../../../../providers/announcement/AnnouncementProvider";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import { useDepartment } from "../../../../providers/department/DepartmentProvider";
import { Calendar } from "../../../../widgets/Calendar";
import { Graph } from "../../../../widgets/Graph";
import {
  ChevronRightIcon,
  GridFilledIcon,
  MegaphoneFilledIcon,
} from "../../../../widgets/Icons";
import { DashboardUserTile } from "./widgets/DashboardUserTile";

export const DashboardScreen = () => {
  const { user, users, GetUsers } = useAuth();

  const { departments } = useDepartment();

  const { announcements } = useAnnouncement();

  useEffect(() => {
    GetUsers();
  }, []);

  useEffect(() => {}, [announcements]);

  // console.log("announcements dashboard");
  // console.log(announcements);

  return (
    <div className="dashboard">
      <div className="dashboard__title">
        <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Dashboard
      </div>
      <div className="dashboard__content">
        <div className="dashboard__content__users">
          <DashboardUserTile
            label="Total Employees"
            content={
              users &&
              users
                .filter((e) => e.Type != USER_TYPES.STUDENT && !!e.Verified)
                .length.toString()
            }
            average={0}
          />
          <DashboardUserTile
            label="Total Students"
            content={
              users &&
              users
                .filter((e) => e.Type == USER_TYPES.STUDENT && !!e.Verified)
                .length.toString()
            }
            average={0}
          />
          <DashboardUserTile
            label="Total Departments"
            content={departments && departments.length.toString()}
            average={0}
          />
          <DashboardUserTile label="Total Revenue" content="0" average={0} />
        </div>
        <div className="dashboard__content__misc">
          <div className="dashboard__content__misc__attendance-graph">
            <Graph />
          </div>
          <div className="dashboard__content__misc__announcements">
            {!!announcements &&
              announcements.map((e) => {
                // console.log("e announcement dashboard");
                // console.log(e);

                return (
                  <div className="announcement-tile">
                    <div className="announcement-tile__title">
                      <MegaphoneFilledIcon color="lightblue" />
                      {e.Title}
                    </div>
                    <div className="announcement-tile__date">
                      {!!e.CreatedAt &&
                        e.CreatedAt.toLocaleDateString("en-US", {
                          dateStyle: "long",
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="dashboard__content__misc__calendar">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};
