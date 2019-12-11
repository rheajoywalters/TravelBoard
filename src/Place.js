import React, { useState, useEffect } from "react";
import AddPhoto from "./AddPhoto";
import PhotoCard from "./PhotoCard";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { db, snapshotToArray } from "./firebase";
import Typography from "@material-ui/core/Typography";

export default function Place(props) {
  const [dialog_open, setDialogOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("places")
      .doc(props.match.params.place_id)
      .collection("photos")
      .onSnapshot(snapshot => {
        const updated_photos = snapshotToArray(snapshot);
        setPhotos(updated_photos);
      });
    return unsubscribe;
  }, [props]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("places")
      .doc(props.match.params.place_id)
      .onSnapshot(snapshot => {
        setLocation(snapshot.data().name);
      });
    return unsubscribe;
  }, [props]);

  return (
    <div>
      <Typography
        component="div"
        style={{ backgroundColor: "lightBlue", height: 50, fontSize: 30 }}
      >
        {location}
      </Typography>
      <div
        style={{
          display: "flex",
          flexwrap: "wrap",
          paddingLeft: 10,
          paddingTop: 10
        }}
      >
        {photos.map(p => {
          return (
            <PhotoCard
              photo={p}
              user={props.user}
              place_id={props.match.params.place_id}
            />
          );
        })}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            color="secondary"
            variant="contained"
            style={{
              marginTop: 10,
              marginRight: 10
            }}
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Add Photo
          </Button>
          {props.type === "gone" ? (
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: 10 }}
              to="/app/Places_I've_Gone/"
              component={Link}
            >
              Return to Places I've Gone
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: 10 }}
              to="/app/Places_To_Go/"
              component={Link}
            >
              Return to Places To Go
            </Button>
          )}
        </div>
        <AddPhoto
          open={dialog_open}
          onClose={() => {
            setDialogOpen(false);
          }}
          user={props.user}
          place_id={props.match.params.place_id}
        />
      </div>
    </div>
  );
}
