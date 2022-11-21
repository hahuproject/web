/*

Define SVG Icons here
* Use these template when defining your own ICON

export const "IconName(Use Capitalized)": FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      *** Insert your svg code / Dont forget to update the height width 
      color parameters with the variables defined in props ***
    </div>
  );
};


*/

import { FunctionComponent } from "react";

type Props = {
  height?: number;
  width?: number;
  color?: string;
  onClick?: Function;
};

export const MenuIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    </div>
  );
};

export const ThemeIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 20 20"
        viewBox="0 0 20 20"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
      >
        <rect
          fill="none"
          width={width * 10 + "px"}
          height={height * 10 + "px"}
        />
        <path d="M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7 c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42C10.72,3.03,10.36,3,10,3L10,3z" />
      </svg>
    </div>
  );
};

export const PersonFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-person-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
    </div>
  );
};

export const KeyIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-key"
        viewBox="0 0 16 16"
      >
        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    </div>
  );
};

export const PersonIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-person"
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      </svg>
    </div>
  );
};

export const EyeFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-eye-fill"
        viewBox="0 0 16 16"
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
    </div>
  );
};

export const EyeSlashFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-eye-slash-fill"
        viewBox="0 0 16 16"
      >
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
      </svg>
    </div>
  );
};

export const BoxArrowLeftIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-box-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
        />
        <path
          fillRule="evenodd"
          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
        />
      </svg>
    </div>
  );
};

export const ChevronRightIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  );
};

export const HomeFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-house-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
        />
        <path
          fillRule="evenodd"
          d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
        />
      </svg>
    </div>
  );
};

export const PeopleFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-people-fill"
        viewBox="0 0 16 16"
      >
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path
          fillRule="evenodd"
          d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
        />
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      </svg>
    </div>
  );
};

export const GridFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-grid-1x2-fill"
        viewBox="0 0 16 16"
      >
        <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
      </svg>
    </div>
  );
};

export const DoorClosedFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-door-closed-fill"
        viewBox="0 0 16 16"
      >
        <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    </div>
  );
};
export const ChatFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-chat-dots-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    </div>
  );
};

export const GearFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-gear-fill"
        viewBox="0 0 16 16"
      >
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
      </svg>
    </div>
  );
};

export const SearchIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
    </div>
  );
};

export const ExclamationCircleIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-exclamation-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
      </svg>
    </div>
  );
};

export const DeleteFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-archive-fill"
        viewBox="0 0 16 16"
      >
        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
      </svg>
    </div>
  );
};

export const AddIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
    </div>
  );
};

export const SendFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-send-fill"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
        />
      </svg>
    </div>
  );
};

export const ChevronLeftIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </div>
  );
};

export const CheckIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-check-lg"
        viewBox="0 0 16 16"
      >
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
      </svg>
    </div>
  );
};

export const SlashCircleIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-slash-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
      </svg>
    </div>
  );
};

export const PencilSquareIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-pencil-square"
        viewBox="0 0 16 16"
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
    </div>
  );
};

export const MegaphoneFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-megaphone-fill"
        viewBox="0 0 16 16"
      >
        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
      </svg>
    </div>
  );
};

export const BookFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-book-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
      </svg>
    </div>
  );
};

export const LibraryFilledIcon: FunctionComponent<Props> = ({
  height = 1.8,
  width = 1.8,
  color = "#fff",
  onClick = () => {},
}) => {
  return (
    <div
      onClick={() => onClick()}
      style={{ height: height + "rem", width: width + "rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width * 10 + "px"}
        height={height * 10 + "px"}
        fill={color}
        className="bi bi-border-style"
        viewBox="0 0 16 16"
      >
        <path d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm8 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm8 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-4-4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1z" />
      </svg>
    </div>
  );
};
