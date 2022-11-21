import React, { FunctionComponent, useEffect, useState } from "react";
import { Grade } from "../../../../../models/Grade";
import { Student, User, USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import {
  GradeLoading,
  useGrade,
} from "../../../../../providers/grade/GradeProvider";
import { axios } from "../../../../../utils/axios";
import { BackDrop } from "../../../../../widgets/BackDrop";
import { Button, ButtonSize } from "../../../../../widgets/Button";
import { PersonIcon } from "../../../../../widgets/Icons";
import { IdsRing } from "../../../../../widgets/Loaders";

export const UserDetailInfoTile: FunctionComponent<{
  icon: JSX.Element;
  label: string;
  content: string;
}> = ({ icon, label, content }) => {
  return (
    <div className="user-detail__info-tile">
      <div className="user-detail__info-tile__icon">{icon}</div>
      <div className="user-detail__info-tile__label">{label + " :"}</div>
      <div className="user-detail__info-tile__content">{content}</div>
    </div>
  );
};

type Props = {
  user: User;
  student?: Student;
  show?: boolean;
  toggleShow?: (v: boolean) => void;
};

export const UserDetail: FunctionComponent<Props> = ({
  user,
  student,
  show = false,
  toggleShow,
}) => {
  const { grades, loading, gradeLabels } = useGrade();

  const { user: authUser } = useAuth();

  var [userGrades, setUserGrades] = useState<Grade[]>([]);

  useEffect(() => {
    if (!!grades && !!user) {
      setUserGrades(Array.from(grades).filter((e) => e.User.ID == user.ID));
    }
    // console.log(userGrades);
    // console.log(userGrades.length < 1);

    // console.log(grades);
    // console.log(!!grades);
    // if (!!grades && !!user) {
    //   console.log(Array.from(grades).filter((e) => e.User.ID == user.ID));
    // }
  }, [user, grades]);

  const [generatingReport, setGeneratingReport] = useState<boolean>(false);

  console.log(student);

  return (
    <>
      <BackDrop show={show} onClick={() => toggleShow(false)} />
      <div className={`user-detail ${show && "user-detail--show"}`}>
        {!!user && (
          <>
            <div className="user-detail__top">
              <img
                className="user-detail__pic"
                src={"http://" + user.ProfilePic.toString()}
                alt="user photo"
              />
              <div className="user-detail__name">
                {user.FirstName + " " + user.LastName}
              </div>
              <div className="user-detail__date">
                {"Registered On " +
                  user.CreatedAt.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
              </div>
            </div>
            <div className="user-detail__middle">
              <UserDetailInfoTile
                icon={<PersonIcon color="grey" />}
                label="Full Name"
                content={
                  user.Type != USER_TYPES.STUDENT
                    ? user.FirstName + " " + user.LastName
                    : user.FirstName +
                      " " +
                      student.MiddleName +
                      " " +
                      user.LastName
                }
              />
              <UserDetailInfoTile
                icon={<PersonIcon color="grey" />}
                label="Email"
                content={user.Email}
              />
              <UserDetailInfoTile
                icon={<PersonIcon color="grey" />}
                label="Phone"
                content={user.Phone}
              />
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Gender"
                  content={student.Gender}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Birth Date"
                  content={new Date(student.BirthDate).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Birth Place"
                  content={student.BirthPlace}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Disability"
                  content={student.Disability}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Previous School"
                  content={student.PreviousSchool}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Average Mark For Highschool"
                  content={student.AvarageMarkForHighSchool.toString()}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Matric Result"
                  content={student.MatricResult.toString()}
                />
              )}
              {user.Type == USER_TYPES.STUDENT && (
                <UserDetailInfoTile
                  icon={<PersonIcon color="grey" />}
                  label="Program"
                  content={student.Program}
                />
              )}
              <UserDetailInfoTile
                icon={<PersonIcon color="grey" />}
                label="Username"
                content={user.Username}
              />
              <UserDetailInfoTile
                icon={<PersonIcon color="grey" />}
                label="Address"
                content={user.Address.City + ", " + user.Address.Country}
              />
              {user.Type == USER_TYPES.STUDENT &&
                (loading == GradeLoading.FetchingGrades ? (
                  <div>Loading User Grades</div>
                ) : !!!grades ? (
                  <div>Failed to get grades, Please refresh page</div>
                ) : userGrades.length < 1 ? (
                  <div> Grades not submitted </div>
                ) : (
                  <div
                    style={{ margin: "2.4rem 0rem" }}
                    className="user-detail__grades"
                  >
                    <div className="user-detail__grades__label">
                      Grades by Course
                    </div>
                    {(() => {
                      var _courses = userGrades.map((e) => e.Course);
                      _courses.filter(
                        (e, i, s) => s.findIndex((c) => (c.ID = e.ID)) === i
                      );

                      return _courses.map((e) => {
                        var _userGrades = userGrades.filter(
                          (ug) => ug.Course.Name == e.Name
                        );
                        var _totalGrade: number =
                          (!!_userGrades &&
                            _userGrades.length > 0 &&
                            (_userGrades[0].Assessment ?? 0) +
                              (_userGrades[0].Mid ?? 0) +
                              (_userGrades[0].Final ?? 0)) ||
                          0;
                        console.log(_userGrades);

                        return (
                          <div className="user-detail__grades__content">
                            <div className="user-detail__grades__content__course">
                              {e.Name}
                            </div>
                            <div className="user-detail__grades__content__tab">
                              <div className="user-detail__grades__content__results">
                                <div className="user-detail__grades__content__results__label">
                                  25%
                                </div>
                                <div className="user-detail__grades__content__results__value">
                                  {(!!_userGrades &&
                                    _userGrades.length > 0 &&
                                    _userGrades[0].Assessment) ||
                                    "-"}
                                </div>
                              </div>
                              <div className="user-detail__grades__content__results">
                                <div className="user-detail__grades__content__results__label">
                                  25%
                                </div>
                                <div className="user-detail__grades__content__results__value">
                                  {(!!_userGrades &&
                                    _userGrades.length > 0 &&
                                    _userGrades[0].Mid) ||
                                    "-"}
                                </div>
                              </div>
                              <div className="user-detail__grades__content__results">
                                <div className="user-detail__grades__content__results__label">
                                  50%
                                </div>
                                <div className="user-detail__grades__content__results__value">
                                  {(!!_userGrades &&
                                    _userGrades.length > 0 &&
                                    _userGrades[0].Final) ||
                                    "-"}
                                </div>
                              </div>
                              <div className="user-detail__grades__content__results">
                                <div className="user-detail__grades__content__results__label">
                                  Total
                                </div>
                                <div className="user-detail__grades__content__results__value">
                                  {_totalGrade > 0 ? _totalGrade : "-"}
                                </div>
                              </div>
                              <div className="user-detail__grades__content__results">
                                <div className="user-detail__grades__content__results__label">
                                  Grade
                                </div>
                                <div className="user-detail__grades__content__results__value">
                                  {!!gradeLabels &&
                                  gradeLabels.filter((e) => {
                                    console.log(e.Label);
                                    return (
                                      e.Min <= _totalGrade &&
                                      _totalGrade <= e.Max
                                    );
                                  }).length > 0
                                    ? gradeLabels.filter((e) => {
                                        return (
                                          e.Min <= _totalGrade &&
                                          _totalGrade <= e.Max
                                        );
                                      })[0].Label
                                    : "-"}
                                </div>
                              </div>
                              <div className="user-detail__grades__content__results">
                                <div className="user-detail__grades__content__results__label">
                                  Competency
                                </div>
                                <div className="user-detail__grades__content__results__value">
                                  {_totalGrade > 50
                                    ? "Competent"
                                    : "Incompetent"}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                ))}
            </div>
            {!!authUser &&
              authUser.Type == USER_TYPES.REGISTRY_OFFICER &&
              !!grades &&
              userGrades.length > 0 && (
                <div
                  style={{
                    marginBottom: "1.6rem",
                    width: "100%",
                    height: "100%",
                    justifySelf: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={async () => {
                      if (!generatingReport) {
                        try {
                          setGeneratingReport(true);
                          const _res = await axios(
                            `/certificate?user-id=${user.ID}`
                          );

                          setGeneratingReport(false);
                          window.open(_res.data, "_blank");
                        } catch (error) {
                          setGeneratingReport(false);
                          if (!!error.response) {
                            alert(error.response.data);
                          } else {
                            alert("Could not generate report");
                          }
                        }
                      }
                    }}
                    size={ButtonSize.MEDIUM}
                  >
                    {generatingReport ? <IdsRing /> : "Generate Report"}
                  </Button>
                </div>
              )}
            <div className="user-detail__bottom">
              <img src="/images/logo.png" alt="logo" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

/*


<div className="user-detail__grades">
                  <div className="user-detail__grades__label">
                    Grades by Course
                  </div>
                  <div className="user-detail__grades__content">
                    <div className="user-detail__grades__content__course">
                      Calculus
                    </div>
                    <div className="user-detail__grades__content__results">
                      <div className="user-detail__grades__content__results__label">
                        Mid
                      </div>
                      <div className="user-detail__grades__content__results__value">
                        21
                      </div>
                    </div>
                    <div className="user-detail__grades__content__results">
                      <div className="user-detail__grades__content__results__label">
                        Mid
                      </div>
                      <div className="user-detail__grades__content__results__value">
                        21
                      </div>
                    </div>
                  </div>
                  <div className="user-detail__grades__content">
                    <div className="user-detail__grades__content__course">
                      Calculus
                    </div>
                    <div className="user-detail__grades__content__results">
                      <div className="user-detail__grades__content__results__label">
                        Mid
                      </div>
                      <div className="user-detail__grades__content__results__value">
                        21
                      </div>
                    </div>
                    <div className="user-detail__grades__content__results">
                      <div className="user-detail__grades__content__results__label">
                        Mid
                      </div>
                      <div className="user-detail__grades__content__results__value">
                        21
                      </div>
                    </div>
                  </div>
                </div>


*/
