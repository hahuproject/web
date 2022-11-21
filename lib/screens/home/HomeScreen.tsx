import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { User, USER_TYPES } from "../../models/User";
import { AnnouncementProvider } from "../../providers/announcement/AnnouncementProvider";
import { useAuth, AuthLoading } from "../../providers/auth/AuthProvider";
import { ClassProvider } from "../../providers/class/ClassProvider";
import { CourseProvider } from "../../providers/course/CourseProvider";
import { DepartmentProvider } from "../../providers/department/DepartmentProvider";
import { GradeProvider } from "../../providers/grade/GradeProvider";
import { LibraryProvider } from "../../providers/library/LibraryProvider";
import { MessageProvider } from "../../providers/message/MessageProvider";
import { SectionProvider } from "../../providers/section/SectionProvider";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../widgets/Button";
import { CloseDrawer, Drawer, OpenDrawer } from "../../widgets/Drawer";
import {
  PeopleFilledIcon,
  GridFilledIcon,
  BoxArrowLeftIcon,
  ChevronRightIcon,
  HomeFilledIcon,
  ChatFilledIcon,
  DoorClosedFilledIcon,
  MegaphoneFilledIcon,
  BookFilledIcon,
  LibraryFilledIcon,
  PencilSquareIcon,
} from "../../widgets/Icons";
import { Logo } from "../../widgets/Logo";
import { SidePanel } from "../../widgets/SidePanel/SidePanel";
import {
  ExpandingSidePanelItem,
  SidePanelItem,
} from "../../widgets/SidePanel/SidePanelItem";
import { SidePanelItems } from "../../widgets/SidePanel/SidePanelItems";
import { AnnouncementsScreen } from "./sections/announcements/AnnouncementsScreen";
import { ClassesScreen } from "./sections/classes/ClassesScreen";
import { CoursesScreen } from "./sections/courses/CoursesScreen";
import { DashboardScreen } from "./sections/dashboard/DashboardScreen";
import { DepartmentsScreen } from "./sections/departments/DepartmentsScreen";
import { GradesScreen } from "./sections/grades/GradesScreen";
import { GradeReviewRequestsScreen } from "./sections/grade_review_requests/GradeReviewRequestsScreen";
import { LibraryScreen } from "./sections/library/LibraryScreen";
import { MessageScreen } from "./sections/message/MessageScreen";
import { SectionsScreen } from "./sections/sections/SectionsScreen";
import { SlackSection } from "./sections/slack/SlackSection";
import { StreamsScreen } from "./sections/streams/StreamsScreen";
import { UsersScreen } from "./sections/users/UsersScreen";
import { HomeHeader } from "./widgets/HomeHeader";

export enum SidePanelItemTypes {
  DASHBOARD = "dashboard",
  DEPARTMENTS = "departments",
  USERS = "users",
  COURSES = "courses",
  CLASSES = "classes",
  SECTIONS = "sections",
  ANNOUNCEMENTS = "announcements",
  MESSAGES = "messages",
  LIBRARY = "library",
  GRADE_LABELS = "grade labels",
  GRADE_REVIEW_REUESTS = "grade review requests",
  SLACK = "slack",
  STREAMS = "streams",

  //Users
  ADMINS = "admins",
  REGISTRY_OFFICERS = "registry officers",
  DEPARTMENT_HEADS = "department heads",
  INSTRUCTORS = "instructors",
  SUPERVISORS = "supervisors",
  STUDENTS = "students",
}

const SidePanelContent = (
  responsive,
  index,
  setCurrIndex,
  Logout,
  user?: User
) => (
  <SidePanelItems
    leading={<Logo />}
    content={
      <>
        <SidePanelItem
          responsive={responsive}
          icon={<HomeFilledIcon />}
          title="Dashboard"
          active={index == SidePanelItemTypes.DASHBOARD}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.DASHBOARD);
            CloseDrawer();
          }}
        />
        <ExpandingSidePanelItem
          parent={
            <SidePanelItem
              responsive={responsive}
              icon={<PeopleFilledIcon />}
              title="Users"
              trailing={<ChevronRightIcon height={1.2} width={1.2} />}
              active={index == SidePanelItemTypes.USERS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.USERS);
                // console.log("Users");
                // console.log(SidePanelItemTypes.USERS);
                // console.log(index == 1);

                CloseDrawer();
              }}
            />
          }
          children={[
            <SidePanelItem
              responsive={responsive}
              title="Admins"
              icon={<div>AD</div>}
              active={index == SidePanelItemTypes.ADMINS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.ADMINS);
                CloseDrawer();
              }}
            />,
            <SidePanelItem
              responsive={responsive}
              title="Registry Officers"
              icon={<div>RO</div>}
              active={index == SidePanelItemTypes.REGISTRY_OFFICERS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.REGISTRY_OFFICERS);
                CloseDrawer();
              }}
            />,
            <SidePanelItem
              responsive={responsive}
              title="Department Heads"
              icon={<div>DH</div>}
              active={index == SidePanelItemTypes.DEPARTMENT_HEADS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.DEPARTMENT_HEADS);
                CloseDrawer();
              }}
            />,
            <SidePanelItem
              responsive={responsive}
              title="Instructors"
              icon={<div>IN</div>}
              active={index == SidePanelItemTypes.INSTRUCTORS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.INSTRUCTORS);
                CloseDrawer();
              }}
            />,
            <SidePanelItem
              responsive={responsive}
              title="Supervisors"
              icon={<div>SU</div>}
              active={index == SidePanelItemTypes.SUPERVISORS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.SUPERVISORS);
                CloseDrawer();
              }}
            />,
            <SidePanelItem
              responsive={responsive}
              title="Students"
              icon={<div>ST</div>}
              active={index == SidePanelItemTypes.STUDENTS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.STUDENTS);
                CloseDrawer();
              }}
            />,
          ]}
          onClick={() => {
            // setCurrIndex(1);
            // CloseDrawer();
          }}
        />
        <SidePanelItem
          responsive={responsive}
          icon={<BookFilledIcon />}
          title="Courses"
          active={index == SidePanelItemTypes.COURSES}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.COURSES);
            CloseDrawer();
          }}
        />
        <SidePanelItem
          responsive={responsive}
          icon={<GridFilledIcon />}
          title="Departments"
          active={index == SidePanelItemTypes.DEPARTMENTS}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.DEPARTMENTS);
            CloseDrawer();
          }}
        />
        <SidePanelItem
          responsive={responsive}
          icon={<DoorClosedFilledIcon />}
          title="Streams"
          active={index == SidePanelItemTypes.STREAMS}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.STREAMS);
            CloseDrawer();
          }}
        />
        <SidePanelItem
          responsive={responsive}
          icon={<DoorClosedFilledIcon />}
          title="Classes"
          active={index == SidePanelItemTypes.CLASSES}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.CLASSES);
            CloseDrawer();
          }}
        />
        <SidePanelItem
          responsive={responsive}
          icon={<DoorClosedFilledIcon />}
          title="Sections"
          active={index == SidePanelItemTypes.SECTIONS}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.SECTIONS);
            CloseDrawer();
          }}
        />
        {user &&
          (user.Type == USER_TYPES.ADMIN ||
            user.Type == USER_TYPES.SUPER_ADMIN) && (
            <SidePanelItem
              responsive={responsive}
              icon={<MegaphoneFilledIcon />}
              title="Announcements"
              active={index == SidePanelItemTypes.ANNOUNCEMENTS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.ANNOUNCEMENTS);
                CloseDrawer();
              }}
            />
          )}
        {/* {user &&
          (user.Type == USER_TYPES.ADMIN ||
            user.Type == USER_TYPES.SUPER_ADMIN) && ( */}
        <SidePanelItem
          responsive={responsive}
          icon={<ChatFilledIcon />}
          title="Messages"
          active={index == SidePanelItemTypes.MESSAGES}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.MESSAGES);
            CloseDrawer();
          }}
        />
        {/* )} */}
        {user &&
          (user.Type == USER_TYPES.ADMIN ||
            user.Type == USER_TYPES.SUPER_ADMIN) && (
            <SidePanelItem
              responsive={responsive}
              icon={<PencilSquareIcon />}
              title="Grade Labels"
              active={index == SidePanelItemTypes.GRADE_LABELS}
              onClick={() => {
                setCurrIndex(SidePanelItemTypes.GRADE_LABELS);
                CloseDrawer();
              }}
            />
          )}
        {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
          <SidePanelItem
            responsive={responsive}
            icon={<PencilSquareIcon />}
            title="Grade Review Requests"
            active={index == SidePanelItemTypes.GRADE_REVIEW_REUESTS}
            onClick={() => {
              setCurrIndex(SidePanelItemTypes.GRADE_REVIEW_REUESTS);
              CloseDrawer();
            }}
          />
        )}
        <SidePanelItem
          responsive={responsive}
          icon={<LibraryFilledIcon />}
          title="Lbrary"
          active={index == SidePanelItemTypes.LIBRARY}
          onClick={() => {
            setCurrIndex(SidePanelItemTypes.LIBRARY);
            CloseDrawer();
          }}
        />
      </>
    }
    actions={
      <Button
        type={ButtonType.FLAT}
        size={ButtonSize.SMALL}
        color={ButtonColor.WHITE}
        onClick={() => {
          Logout(
            () => {
              Router.push("/auth/login");
            },
            () => {}
          );
        }}
        leading={<BoxArrowLeftIcon />}
      >
        {/* Log Out */}
      </Button>
    }
  />
);

export const HomeScreen = () => {
  const [currIndex, setCurrIndex] = useState<SidePanelItemTypes>(
    SidePanelItemTypes.DASHBOARD
  );

  const { user, loading, Logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!!!user && loading != AuthLoading.AUTO_LOGIN) {
      console.log("return to login");
      console.log(!!!user);
      console.log(loading);

      router.replace("/auth/login");
    }
  }, [user, loading]);

  // console.log(currIndex);

  // console.log(user, loading == AuthLoading.AUTO_LOGIN);

  if (loading == AuthLoading.AUTO_LOGIN) {
    return <div>Loading ....</div>;
  }

  if (!user) {
    return <div />;
  }

  return (
    <div className="home" style={{ height: "100vh" }}>
      <Drawer>
        {SidePanelContent(false, currIndex, setCurrIndex, Logout, user)}
      </Drawer>
      <div className="home__left">
        <SidePanel>
          {SidePanelContent(true, currIndex, setCurrIndex, Logout, user)}
        </SidePanel>
      </div>
      <div className="home__right">
        <HomeHeader
          setIndex={(v) => {
            setCurrIndex(v);
          }}
          currIndex={currIndex}
        />
        {(() => {
          switch (currIndex) {
            case SidePanelItemTypes.DASHBOARD:
              return (
                <AnnouncementProvider>
                  <DepartmentProvider>
                    <DashboardScreen />
                  </DepartmentProvider>
                </AnnouncementProvider>
              );
            case SidePanelItemTypes.USERS:
              return (
                <GradeProvider>
                  <UsersScreen />
                </GradeProvider>
              );
            case SidePanelItemTypes.ADMINS:
              return <UsersScreen type={USER_TYPES.ADMIN} />;
            case SidePanelItemTypes.REGISTRY_OFFICERS:
              return <UsersScreen type={USER_TYPES.REGISTRY_OFFICER} />;
            case SidePanelItemTypes.DEPARTMENT_HEADS:
              return <UsersScreen type={USER_TYPES.DEPARTMENT_HEAD} />;
            case SidePanelItemTypes.INSTRUCTORS:
              return <UsersScreen type={USER_TYPES.INSTRUCTOR} />;
            case SidePanelItemTypes.SUPERVISORS:
              return <UsersScreen type={USER_TYPES.SUPERVISOR} />;
            case SidePanelItemTypes.STUDENTS:
              return (
                <GradeProvider>
                  <UsersScreen type={USER_TYPES.STUDENT} />
                </GradeProvider>
              );
            case SidePanelItemTypes.COURSES:
              return (
                <CourseProvider>
                  <CoursesScreen />
                </CourseProvider>
              );
            case SidePanelItemTypes.DEPARTMENTS:
              return (
                <DepartmentProvider>
                  <DepartmentsScreen />
                </DepartmentProvider>
              );
            case SidePanelItemTypes.STREAMS:
              return (
                <DepartmentProvider>
                  <StreamsScreen />
                </DepartmentProvider>
              );
            case SidePanelItemTypes.CLASSES:
              return (
                <DepartmentProvider>
                  <CourseProvider>
                    <ClassProvider>
                      <ClassesScreen />
                    </ClassProvider>
                  </CourseProvider>
                </DepartmentProvider>
              );
            case SidePanelItemTypes.SECTIONS:
              return (
                <ClassProvider>
                  <SectionProvider>
                    <SectionsScreen />
                  </SectionProvider>
                </ClassProvider>
              );
            case SidePanelItemTypes.ANNOUNCEMENTS:
              return (
                <AnnouncementProvider>
                  <AnnouncementsScreen />
                </AnnouncementProvider>
              );
            case SidePanelItemTypes.MESSAGES:
              return (
                <MessageProvider>
                  <MessageScreen />
                </MessageProvider>
              );
            case SidePanelItemTypes.LIBRARY:
              return (
                <CourseProvider>
                  <LibraryProvider>
                    <LibraryScreen />
                  </LibraryProvider>
                </CourseProvider>
              );
            case SidePanelItemTypes.GRADE_LABELS:
              return (
                <GradeProvider>
                  <GradesScreen />
                </GradeProvider>
              );
            case SidePanelItemTypes.GRADE_REVIEW_REUESTS:
              return (
                <GradeProvider>
                  <GradeReviewRequestsScreen />
                </GradeProvider>
              );
            case SidePanelItemTypes.SLACK:
              return <SlackSection />;

            default:
              return <DashboardScreen />;
          }
        })()}
      </div>
    </div>
  );
};
