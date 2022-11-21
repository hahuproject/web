import React, { FunctionComponent } from "react";

type Heading = {
  Name: string;
  DataValue?: string;
  Value?: any;
};

type Props = {
  headings: Heading[];
  children: any;
};

export const Table: FunctionComponent<Props> = ({ headings, children }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map((e) => (
            <th>{e.Name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
