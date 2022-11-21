import React, { FunctionComponent } from "react";
import { GridFilledIcon } from "../../../../widgets/Icons";

type Props = {};

export const SlackSection: FunctionComponent<Props> = () => {
  return (
    <div className="slack">
      <div className="slack__title">
        <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Staff
        Messaging
      </div>
      <div className="slack__content">
        <div className="slack__content__leading"></div>
        <div className="slack__content__main">
          <iframe height="100%" width="100%" src="https://slack.com" />
        </div>
      </div>
    </div>
  );
};
