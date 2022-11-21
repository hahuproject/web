/*

SERVICES
  - GetGrades
  - Approve Grade Review Requests
  - Reject Grade Review Requests
  - Get Grade Labels
  - Add Grade Label
  - Delete Grade Label

STATES
  - grades
  - grade labels
  - loading
  - error

VARS
  - url
  - loading enums

*/

import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Grade,
  GradeFromJSON,
  GradeLabel,
  GradeLabelFromJSON,
  GradeLabelToJSON,
} from "../../models/Grade";

import { axios } from "../../utils/axios";

const GRADE_URL = "/grades";
const GRADE_Label_URL = "/grade-labels";

//Loading
export enum GradeLoading {
  FetchingGrades = "fetching grades",
  FetchingGradeLabels = "fetching grade labels",
  AddingGradeLabel = "adding grade label",
  DeletingGradeLabel = "deleting grade label",
  ApprovingGradeReviewRequest = "ApprovingGradeReviewRequest",
  RejectingGradeReviewRequest = "RejectingGradeReviewRequest",
}

type GradeContextType = {
  grades: Grade[];
  gradeLabels: GradeLabel[];
  loading: GradeLoading;
  error: string;
  setError: (v: string) => void;
  GetGrades: Function;
  GetGradeLabels: Function;
  AddGradeLabel: (
    gradeLabel: GradeLabel,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  DeleteGradeLabel: (
    gradeLabelId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  ApproveGradeReviewRequest: (
    userId: string,
    courseId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  RejectGradeReviewRequest: (
    userId: string,
    courseId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
};

const GRADE_CONTEXT = createContext<GradeContextType>({
  grades: null,
  gradeLabels: null,
  loading: null,
  error: null,
  setError: () => {},
  GetGrades: () => {},
  GetGradeLabels: () => {},
  AddGradeLabel: (
    gradeLabel: GradeLabel,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  DeleteGradeLabel: (
    gradeLabelId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  ApproveGradeReviewRequest: (
    userId: string,
    courseId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  RejectGradeReviewRequest: (
    userId: string,
    courseId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
});

export const GradeProvider: FunctionComponent<{ children: JSX.Element }> = ({
  children,
}) => {
  const [grades, setGrades] = useState<Grade[]>();
  const [gradeLabels, setGradeLabels] = useState<GradeLabel[]>();
  const [loading, setLoading] = useState<GradeLoading>();
  const [error, setError] = useState<string>();

  const GetGrades = useCallback(async () => {
    try {
      setError(null);
      setLoading(GradeLoading.FetchingGrades);

      const _res = await axios.get(GRADE_URL);

      console.log(_res.data);
      console.log((_res.data as JSON[]).map((e) => GradeFromJSON(e)));

      setGrades((_res.data as JSON[]).map((e) => GradeFromJSON(e)));

      setLoading(null);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(null);
    }
  }, []);

  const GetGradeLabels = useCallback(async () => {
    try {
      setError(null);
      setLoading(GradeLoading.FetchingGrades);

      const _res = await axios.get(GRADE_Label_URL);

      console.log(_res.data);

      setGradeLabels((_res.data as JSON[]).map((e) => GradeLabelFromJSON(e)));

      setLoading(null);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(null);
    }
  }, []);

  const AddGradeLabel = useCallback(
    async (
      gradeLabel: GradeLabel,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(GradeLoading.AddingGradeLabel);

        const _res = await axios.post(
          GRADE_Label_URL,
          GradeLabelToJSON(gradeLabel)
        );

        setGradeLabels((prev) => [GradeLabelFromJSON(_res.data), ...prev]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to add grade label");
        }

        setLoading(null);
        !!failCallback && failCallback();
        console.log(error);
      }
    },
    []
  );

  const DeleteGradeLabel = useCallback(
    async (
      gradeLabelId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(GradeLoading.DeletingGradeLabel);

        const _res = await axios.delete(
          GRADE_Label_URL + `?id=${gradeLabelId}`
        );

        setGradeLabels((prev) => [...prev.filter((e) => e.ID != gradeLabelId)]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to add grade label");
        }

        setLoading(null);
        !!failCallback && failCallback();
        console.log(error);
      }
    },
    []
  );

  const ApproveGradeReviewRequest = useCallback(
    async (
      userId: string,
      courseId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(GradeLoading.ApprovingGradeReviewRequest);

        const _res = await axios.post(
          GRADE_URL +
            `/request-review/approve?course-id=${courseId}&user-id=${userId}`
        );

        GetGrades();

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to approve grade review request");
        }
        setLoading(null);
        !!failCallback && failCallback();
        console.log(error);
      }
    },
    []
  );
  const RejectGradeReviewRequest = useCallback(
    async (
      userId: string,
      courseId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(GradeLoading.RejectingGradeReviewRequest);

        const _res = await axios.post(
          GRADE_URL +
            `/request-review/reject?course-id=${courseId}&user-id=${userId}`
        );

        GetGrades();

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to reject grade review request");
        }
        setLoading(null);
        !!failCallback && failCallback();
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    GetGrades();
    GetGradeLabels();
  }, []);

  const _contextValue = useMemo(
    () => ({
      grades,
      gradeLabels,
      loading,
      error,
      setError,
      GetGrades,
      GetGradeLabels,
      AddGradeLabel,
      DeleteGradeLabel,
      ApproveGradeReviewRequest,
      RejectGradeReviewRequest,
    }),
    [grades, gradeLabels, loading, error]
  );

  return (
    <GRADE_CONTEXT.Provider value={_contextValue}>
      {children}
    </GRADE_CONTEXT.Provider>
  );
};

export const useGrade = () => useContext(GRADE_CONTEXT);
