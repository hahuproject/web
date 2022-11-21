import React, { FunctionComponent, useState } from "react";
import { Student } from "../../../../../models/User";
import {
  AuthLoading,
  useAuth,
} from "../../../../../providers/auth/AuthProvider";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonColor,
} from "../../../../../widgets/Button";
import { AlertDialog, Dialog } from "../../../../../widgets/Dialogs";
import { DropDown } from "../../../../../widgets/DropDown";
import { IdsRing } from "../../../../../widgets/Loaders";

type Props = {
  show: boolean;
  toggleShow: (v: boolean) => void;
  student: Student;
};

export const StudentPaymentDialog: FunctionComponent<Props> = ({
  show,
  toggleShow,
  student,
}) => {
  const { UpdateStudentPayment, error, setError, loading } = useAuth();

  const [paymentStatus, setPaymentStatus] = useState<boolean>(student.Paid);

  const onSubmit = () => {
    UpdateStudentPayment(
      student.ID,
      paymentStatus,
      () => {
        alert("Successfully updated payment status");
        toggleShow(false);
      },
      () => {}
    );
  };

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div>
            {" "}
            Update Student's Payment{" for "}
            {student.User.FirstName + " " + student.User.LastName}{" "}
          </div>,
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.OUTLINED}
            color={ButtonColor.DANGER}
            onClick={() => {
              toggleShow(false);
            }}
          >
            Cancel
          </Button>,
        ]}
        content={
          <div>
            <DropDown
              defaultValue={paymentStatus}
              label="Student Payment"
              placeholder="Select"
              onChange={(v) => {
                setPaymentStatus(v);
              }}
              options={[
                { name: "Paid", value: true },
                { name: "Not Paid", value: false },
              ]}
            />
          </div>
        }
        actions={[
          <Button onClick={onSubmit}>
            {loading == AuthLoading.UPDATING_STUDENT_PAYMENT ? (
              <IdsRing />
            ) : (
              " Update Payment "
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
