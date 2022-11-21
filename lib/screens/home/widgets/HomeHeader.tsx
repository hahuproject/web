import React from "react";
import { useAuth } from "../../../providers/auth/AuthProvider";
import { OpenDrawer } from "../../../widgets/Drawer";
import {
  MenuIcon,
  GearFilledIcon,
  SearchIcon,
  ChatFilledIcon,
} from "../../../widgets/Icons";
import { SidePanelItemTypes } from "../HomeScreen";

type Props = {
  setIndex: (v: SidePanelItemTypes) => void;
  currIndex: SidePanelItemTypes;
};

export const HomeHeader = ({ setIndex, currIndex }) => {
  const { user } = useAuth();

  return (
    <div className="home-header">
      <div className="home-header__menu">
        <MenuIcon height={2.4} width={2.4} color="black" onClick={OpenDrawer} />
      </div>
      <div className="home-header__search">
        <div className="home-header__search--icon">
          <SearchIcon height={2.4} width={2.4} color="#717f8e" />
        </div>
        <div className="home-header__search--full">Search Items</div>
      </div>
      {/* <div className="spacer" /> */}
      <div className="home-header__setting">
        <ChatFilledIcon
          onClick={() => {
            // if (currIndex == SidePanelItemTypes.SLACK) {
            //   setIndex(SidePanelItemTypes.DASHBOARD);
            // } else {
            //   setIndex(SidePanelItemTypes.SLACK);
            // }
            window.open("https://slack.com", "");
          }}
          height={2.4}
          width={2.4}
          color="#717f8e"
        />
      </div>
      <div className="home-header__profile">
        <div className="home-header-profile__pic">
          {user && user.ProfilePic && (
            <img
              src={"http://" + user.ProfilePic.toString()}
              alt="user photo"
            />
          )}
        </div>
        <div className="home-header-profile__name">
          {user && user.FirstName + " " + user.LastName}
        </div>
        <div className="home-header-profile__role">{user && user.Type}</div>
      </div>
    </div>
  );
};
