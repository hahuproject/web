import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AdminForm } from "../../../lib/screens/auth/register/widgets/AdminForm";
import { RegisterScreen } from "../../../lib/screens/auth/register/RegisterScreen";
import { RegistryOfficerForm } from "../../../lib/screens/auth/register/widgets/RegistryOfficerForm";
import { DepartmentHeadForm } from "../../../lib/screens/auth/register/widgets/DepartmentHeadForm";
import { InstructorForm } from "../../../lib/screens/auth/register/widgets/InstructorForm";
import { StudentForm } from "../../../lib/screens/auth/register/widgets/StudentForm";
import { DepartmentProvider } from "../../../lib/providers/department/DepartmentProvider";
import { SupervisorForm } from "../../../lib/screens/auth/register/widgets/SupervisorForm";
import { SubRegistryOfficerForm } from "../../../lib/screens/auth/register/widgets/SubRegistryOfficerForm";

const RegisterUserPage = () => {
  const router = useRouter();

  const [regForm, setRegForm] = useState<any>();

  console.log(router.query["type"]);

  useEffect(() => {
    switch (router.query["type"]) {
      case "admin":
        setRegForm(<AdminForm />);
        break;
      case "registry-officer":
        setRegForm(<RegistryOfficerForm />);
        break;
      case "sub-registry-officer":
        setRegForm(<SubRegistryOfficerForm />);
        break;
      case "department-head":
        setRegForm(<DepartmentHeadForm />);
        break;
      case "instructor":
        setRegForm(<InstructorForm />);
        break;
      case "supervisor":
        setRegForm(<SupervisorForm />);
        break;
      case "student":
        setRegForm(<StudentForm />);
        break;
      case undefined:
        break;

      default:
        router.replace("/auth/login");
        break;
    }
  }, [router.query["type"]]);

  if (!!!regForm) {
    return <div> Unsuppoted User Type </div>;
  }

  if (
    router.query["type"] == "student" ||
    router.query["type"] == "sub-registry-officer"
  ) {
    return (
      <DepartmentProvider>
        <RegisterScreen regForm={regForm} />
      </DepartmentProvider>
    );
  } else {
    return <RegisterScreen regForm={regForm} />;
  }
};

export default RegisterUserPage;
