import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { db } from "./firebase";
import Timer from "react-countdown-now";

export default function Countdown(props) {
  const [nextVacation, setVacation] = useState([]);

  useEffect(() => {
    if (props.user) {
      db.collection("users")
        .doc(props.user.uid)
        .collection("places")
        .where("togo", "==", true)
        .orderBy("date")
        .onSnapshot(snapshot => {
          setVacation(snapshot.docs[0].data());
        });
    }
  }, [props.user]);

  if (!props.user) {
    return <div />;
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <span>
        {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds{" "}
      </span>
    );
  };

  return (
    <div>
      <Paper
        style={{ backgroundColor: "lightGreen", height: 150, fontSize: 50 }}
      >
        <Timer date={nextVacation.date} renderer={renderer} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography style={{ fontSize: 50 }}>
            {" "}
            Until I Go To {nextVacation.name}!!!
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
