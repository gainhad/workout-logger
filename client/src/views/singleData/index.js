import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getE1RMHistoryForLift } from "../../redux/slices/liftHistory";
import { getMeasurementHistory } from "../../redux/slices/measurementHistory";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import styles from "./singleDataView.module.scss";

const SingleDataView = props => {
  const name = props.match.params.dataItem;
  const type = props.match.params.dataType;
  let selector;
  if (type === "lift") {
    selector = getE1RMHistoryForLift;
  } else {
    selector = getMeasurementHistory;
  }
  const data = useSelector(state => selector(state, { name: name }));
  const key = type === "lift" ? "e1rm" : "measurement";
  function formatDate(timestamp) {
    let date = new Date(timestamp);
    return date.getMonth() + 1 + "/" + date.getDate();
  }
  // Don't load until data is fetched (happens if people refresh on a view)
  if (data) {
    data.entries.forEach(entry => {
      entry.timestamp = formatDate(entry.timestamp);
    });
    return (
      <div id={styles.singleMeasurementView}>
        <Link to="/view" className={styles.upperLeft}>
          <button type="button" className={styles.backButton}>
            &larr;
          </button>
        </Link>
        <h1 className={styles.liftTitle}>{name.toUpperCase()}</h1>
        <div className={styles.graphArea}>
          <ResponsiveContainer>
            <LineChart
              data={data.entries}
              margin={{ top: 0, right: 5, bottom: 0, left: 0 }}
            >
              <Line dataKey={key} stroke="rgba(255, 255, 255, .8)" />
              <XAxis dataKey="timestamp" stroke="rgba(255, 255, 255, 1)" />
              <YAxis
                type="number"
                domain={[
                  dataMin => Math.round(dataMin * 0.9),
                  dataMax => Math.round(dataMax * 1.1)
                ]}
                width={35}
                stroke="rgba(255, 255, 255, 1)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(50, 50, 50, .85)",
                  border: "1px solid rgba(255, 255, 255, .3)"
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <table id={styles.e1rmTable}>
          <thead>
            <tr>
              <th>DATE</th>
              <th>
                {key.toUpperCase()} ({data.unit})
              </th>
            </tr>
          </thead>
          <tbody>
            {data.entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.timestamp}</td>
                <td>{entry[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div id={styles.singleMeasurementView}>
        <h1 id={styles.loadingMessage}>LOADING (IMPRESSIVE!) LIFT DATA...</h1>
      </div>
    );
  }
};

export default SingleDataView;
