import React, { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GradeLoading,
  useGrade,
} from "../../../../providers/grade/GradeProvider";
import { Button, ButtonSize, ButtonColor } from "../../../../widgets/Button";
import {
  CheckIcon,
  DeleteFilledIcon,
  GridFilledIcon,
  SlashCircleIcon,
} from "../../../../widgets/Icons";
import { IdsSpinner } from "../../../../widgets/Loaders";
import { Table } from "../../../../widgets/Table";

type Props = {};

export const GradeReviewRequestsScreen: FunctionComponent<Props> = () => {
  const {
    grades,
    loading,
    RejectGradeReviewRequest,
    ApproveGradeReviewRequest,
  } = useGrade();

  return (
    <div className="grade_review_requests">
      <div className="grade_review_requests__title">
        <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Grade Labels
      </div>
      <div className="grade_review_requests__content">
        <div className="grade_review_requests__content__leading">
          <div></div>
        </div>
        <div className="grade_review_requests__content__main">
          {loading == GradeLoading.FetchingGradeLabels ? (
            <IdsSpinner />
          ) : grades == null ? (
            <div> null </div>
          ) : grades.filter((e) => e.ReviewRequested).length < 1 ? (
            <div> Empty </div>
          ) : (
            <Table
              headings={[
                { Name: "No" },
                { Name: "Student Name" },
                { Name: "Course" },
                {
                  Name: "Actions",
                },
              ]}
            >
              {grades &&
                grades.filter((e) => e.ReviewRequested).length > 0 &&
                grades
                  .filter((e) => e.ReviewRequested)
                  .map((e, index) => {
                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.User.FirstName + " " + e.User.LastName}</td>
                        <td>{e.Course.Name}</td>
                        <td
                          style={{
                            // backgroundColor: "blue",
                            height: "4.8rem",
                            display: "grid",
                            gridAutoFlow: "column",
                            columnGap: "1.6rem",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div style={{ cursor: "pointer" }}>
                            <CheckIcon
                              onClick={() =>
                                ApproveGradeReviewRequest(
                                  e.User.ID,
                                  e.Course.ID,
                                  () => {
                                    alert(
                                      "Successfully approved grade review request"
                                    );
                                  }
                                )
                              }
                              color="green"
                            />
                          </div>
                          <div
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to reject the review request`
                                )
                              ) {
                                RejectGradeReviewRequest(
                                  e.User.ID,
                                  e.Course.ID,
                                  () => {
                                    alert(
                                      "Successfully rejected grade review request"
                                    );
                                  }
                                );
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <SlashCircleIcon color="red" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
