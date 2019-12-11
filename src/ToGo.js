import React, { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import { db, snapshotToArray } from "./firebase";
import Typography from "@material-ui/core/Typography";

export default function ToGo(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (props.user) {
      db.collection("users")
        .doc(props.user.uid)
        .collection("places")
        .where("togo", "==", true)
        .onSnapshot(snapshot => {
          const updated_places = snapshotToArray(snapshot);
          setPlaces(updated_places);
        });
    }
  }, [props.user]);

  if (!props.user) {
    return <div />;
  }

  return (
    <div>
      <div>
        <Typography
          style={{ backgroundColor: "lightBlue", height: 50, fontSize: 30 }}
        >
          Places to Visit
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexwrap: "wrap",
          paddingLeft: 10,
          paddingTop: 10
        }}
      >
        {places.map(p => {
          return <PlaceCard place={p} type="togo" user={props.user} />;
        })}
      </div>
    </div>
  );
}
