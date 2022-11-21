import React, { FunctionComponent, useState } from "react";
import { Button, ButtonSize, ButtonType } from "../../../../widgets/Button";

type Props = {
  onChange?: (v: File) => void;
};

export const PicPicker: FunctionComponent<Props> = ({
  onChange = (v) => {},
}) => {
  const [fileChosen, setFileChosen] = useState<any>();

  return (
    <div className="pic-picker">
      <div className="pic-picker__display">
        {fileChosen && <img src={fileChosen} />}
      </div>
      <input
        id="pic-picker__input"
        className="pic-picker__input"
        type="file"
        accept="image/*"
        onChange={(v) => {
          if (!!v.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
              setFileChosen(event.target.result);
            };
            reader.readAsDataURL(v.target.files[0]);
            onChange(v.target.files[0]);
          }
        }}
      />
      <div className="pic-picker__btn">
        <Button
          size={ButtonSize.SMALL}
          type={ButtonType.OUTLINED}
          onClick={() => {
            document.getElementById("pic-picker__input").click();
          }}
        >
          Choose Photo
        </Button>
      </div>
    </div>
  );
};
