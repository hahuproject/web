import React, { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GradeLoading,
  useGrade,
} from "../../../../providers/grade/GradeProvider";
import { Button, ButtonSize, ButtonColor } from "../../../../widgets/Button";
import { DeleteFilledIcon, GridFilledIcon } from "../../../../widgets/Icons";
import { IdsSpinner } from "../../../../widgets/Loaders";
import { Table } from "../../../../widgets/Table";
import { AddGradeLabelDialog } from "./widgets/AddGradeLabelDialog";

type Props = {};

export const GradesScreen: FunctionComponent<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { gradeLabels, loading, DeleteGradeLabel } = useGrade();

  const [showAddGradeLabelDialog, setShowAddGradeLabelDialog] =
    useState<boolean>(false);

  return (
    <>
      {showAddGradeLabelDialog && (
        <AddGradeLabelDialog
          show={showAddGradeLabelDialog}
          toggleShow={setShowAddGradeLabelDialog}
        />
      )}
      <div className="grades">
        <div className="grades__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Grade
          Labels
        </div>
        <div className="grades__content">
          <div className="grades__content__leading">
            <div></div>
            <div className="add-grade_label">
              <Button
                size={ButtonSize.SMALL}
                color={ButtonColor.MAIN}
                onClick={() => {
                  setShowAddGradeLabelDialog(true);
                }}
              >
                Add Grade Label
              </Button>
            </div>
          </div>
          <div className="grades__content__main">
            {loading == GradeLoading.FetchingGradeLabels ? (
              <IdsSpinner />
            ) : gradeLabels == null ? (
              <div> null </div>
            ) : gradeLabels.length < 1 ? (
              <div> Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No" },
                  { Name: "Label" },
                  { Name: "Minimum" },
                  { Name: "Maximum" },
                  {
                    Name: "Actions",
                  },
                ]}
              >
                {gradeLabels &&
                  gradeLabels.length > 0 &&
                  gradeLabels.map((e, index) => {
                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.Label}</td>
                        <td>{e.Min}</td>
                        <td>{e.Max}</td>
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
                          {/* <div style={{ cursor: "pointer" }}>
                              <PencilSquareIcon
                                onClick={() => setSelectedDepartment(e)}
                                color="blue"
                              />
                            </div> */}
                          <div
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to delete "${e.Label}"`
                                )
                              ) {
                                DeleteGradeLabel(e.ID, () => {
                                  alert("Successfully deleted grade label");
                                });
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <DeleteFilledIcon color="red" />
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
    </>
  );
};
