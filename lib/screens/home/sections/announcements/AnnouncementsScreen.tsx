import React, { FunctionComponent, useState } from "react";
import { Announcement } from "../../../../models/Announcement";
import { USER_TYPES } from "../../../../models/User";
import {
  AnnouncementLoading,
  useAnnouncement,
} from "../../../../providers/announcement/AnnouncementProvider";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import { Button, ButtonColor, ButtonSize } from "../../../../widgets/Button";
import {
  DeleteFilledIcon,
  MegaphoneFilledIcon,
  PencilSquareIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { IdsRing } from "../../../../widgets/Loaders";
import { Table } from "../../../../widgets/Table";
import { AddAnnouncementDialog } from "./widgets/AddAnnouncementDialog";
import { EditAnnouncementDialog } from "./widgets/EditAnnouncementDialog";

type Props = {};

export const AnnouncementsScreen: FunctionComponent<Props> = () => {
  const { user } = useAuth();

  const {
    announcements,
    connectedToAnnouncementSocket,
    loading,
    error,
    DeleteAnnouncement,
  } = useAnnouncement();

  const [showAddAnnouncementDialog, setShowAddAnnouncementDialog] =
    useState<boolean>(false);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement>();

  const [showEditAnnouncementDialog, setShowEditAnnouncementDialog] =
    useState<boolean>(false);

  return (
    <>
      {showAddAnnouncementDialog && (
        <AddAnnouncementDialog
          show={showAddAnnouncementDialog}
          toggleShow={setShowAddAnnouncementDialog}
        />
      )}
      {showEditAnnouncementDialog && (
        <EditAnnouncementDialog
          show={showEditAnnouncementDialog && !!selectedAnnouncement}
          toggleShow={setShowEditAnnouncementDialog}
          announcement={selectedAnnouncement}
        />
      )}
      <div className="announcements">
        <div className="announcements__title">
          <MegaphoneFilledIcon height={1.6} width={1.6} color="#717f8e" />{" "}
          Announcements
          <div
            style={{
              height: "1.2rem",
              width: "1.2rem",
              borderRadius: "50%",
              backgroundColor: connectedToAnnouncementSocket ? "green" : "red",
            }}
          />
        </div>
        <div className="announcements__content">
          <div className="announcements__content__leading">
            <div className="table-search">
              Search:
              <InputField
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <div className="add-announcement">
              {user && user.Type == USER_TYPES.ADMIN && (
                <Button
                  size={ButtonSize.SMALL}
                  color={ButtonColor.MAIN}
                  onClick={() => {
                    setShowAddAnnouncementDialog(true);
                  }}
                >
                  Add Announcement
                </Button>
              )}
            </div>
          </div>
          <div className="announcements__content__main">
            {loading == AnnouncementLoading.FetchingAnnouncements ? (
              <div>Loading...</div>
            ) : !!!announcements ? (
              <div> Null </div>
            ) : announcements.length < 1 ? (
              <div>Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No", Value: "No" },
                  { Name: "Title", Value: "No" },
                  { Name: "Message", Value: "No" },
                  { Name: "Post Date", Value: "No" },
                  { Name: "Posted By", Value: "No" },
                  { Name: "Posted For", Value: "No" },
                  { Name: "Actions", Value: "No" },
                ]}
              >
                {announcements.map((e, index) => {
                  return (
                    <tr key={e.ID}>
                      <td>{index + 1}</td>
                      <td>{e.Title}</td>
                      <td>{e.Message}</td>
                      <td>
                        {e.CreatedAt &&
                          e.CreatedAt.toLocaleDateString("en-Us", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </td>
                      <td>
                        {!!e.PostedBy &&
                          e.PostedBy.FirstName + " " + e.PostedBy.LastName}
                      </td>
                      <td>
                        {!!e.Section && !!e.Section.ID
                          ? e.Section.Class.Name + "-" + e.Section.Name
                          : "Everyone"}
                      </td>
                      {!!e.PostedBy && e.PostedBy.ID == user.ID && (
                        <td>
                          <div
                            style={{
                              height: "4.8rem",
                              display: "grid",
                              gridAutoFlow: "column",
                              columnGap: "1.6rem",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div
                              onClick={() => {
                                setSelectedAnnouncement(e);
                                setShowEditAnnouncementDialog(true);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <PencilSquareIcon color="blue" />
                            </div>
                            {loading ==
                            AnnouncementLoading.DeletingAnnouncements ? (
                              <IdsRing />
                            ) : (
                              <div style={{ cursor: "pointer" }}>
                                <DeleteFilledIcon
                                  onClick={() => {
                                    if (
                                      confirm(
                                        `Are you sure you want to delete "${e.Title}"`
                                      )
                                    ) {
                                      DeleteAnnouncement(e.ID);
                                    }
                                  }}
                                  color="red"
                                />
                              </div>
                            )}
                          </div>
                        </td>
                      )}
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
