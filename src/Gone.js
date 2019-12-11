import React, { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import { db, snapshotToArray } from "./firebase";
import Typography from "@material-ui/core/Typography";

export default function Gone(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (props.user) {
      db.collection("users")
        .doc(props.user.uid)
        .collection("places")
        .where("togo", "==", false)
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
      <Typography
        component="div"
        style={{ backgroundColor: "lightBlue", height: 50, fontSize: 30 }}
      >
        Places I've Been
      </Typography>
      <div
        style={{
          display: "flex",
          flexwrap: "wrap",
          paddingLeft: 10,
          paddingTop: 10
        }}
      >
        {places.map(p => {
          return <PlaceCard place={p} type="gone" user={props.user} />;
        })}
      </div>
    </div>
  );
}
