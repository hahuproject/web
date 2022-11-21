import React, { FunctionComponent } from "react";

type Props = {};

export const Graph: FunctionComponent<Props> = () => {
  return (
    <>
      <table id="q-graph">
        <caption>
          <p>Students By Year</p>
          <div>
            <div className="sent">Male</div>
            <div className="paid">Female</div>
          </div>
        </caption>
        <tbody>
          <tr className="qtr" id="q1">
            <th scope="row">2019</th>
            <td className="sent bar" style={{ height: "111px" }}>
              <p>$18,450.00</p>
            </td>
            <td className="paid bar" style={{ height: "99px" }}>
              <p>$16,500.00</p>
            </td>
          </tr>
          <tr className="qtr" id="q2">
            <th scope="row">2020</th>
            <td className="sent bar" style={{ height: "206px" }}>
              <p>$34,340.72</p>
            </td>
            <td className="paid bar" style={{ height: "194px" }}>
              <p>$32,340.72</p>
            </td>
          </tr>
          <tr className="qtr" id="q3">
            <th scope="row">2021</th>
            <td className="sent bar" style={{ height: "259px" }}>
              <p>$43,145.52</p>
            </td>
            <td className="paid bar" style={{ height: "193px" }}>
              <p>$32,225.52</p>
            </td>
          </tr>
          <tr className="qtr" id="q4">
            <th scope="row">2022</th>
            <td className="sent bar" style={{ height: "110px" }}>
              <p>$18,415.96</p>
            </td>
            <td className="paid bar" style={{ height: "195px" }}>
              <p>$32,425.00</p>
            </td>
          </tr>
        </tbody>
      </table>

      <div id="ticks">
        <div className="tick" style={{ height: "52px" }}>
          <p>6000</p>
        </div>
        <div className="tick" style={{ height: "52px" }}>
          <p>3500</p>
        </div>
        <div className="tick" style={{ height: "52px" }}>
          <p>2000</p>
        </div>
        <div className="tick" style={{ height: "52px" }}>
          <p>1000</p>
        </div>
        <div className="tick" style={{ height: "52px" }}>
          <p>500</p>
        </div>
      </div>
    </>
  );
};
