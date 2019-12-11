import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { db, storage } from "./firebase";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import uuid from "node-uuid";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddPlace(props) {
  const [locationName, setLocationName] = useState("");
  const [file, setFile] = useState(null);
  const [checkedValue, setCheckedValue] = useState(false);
  const [savingSpinner, setSavingSpinner] = useState(false);
  const [placeDetails, setPlaceDetails] = useState("");
  const [placeDate, setPlaceDate] = useState("");

  const handleSaveLocation = () => {
    //setSavingSpinner(true);
    setSavingSpinner(true);
    storage
      .ref("places/" + uuid())
      .put(file)
      .then(snapshot => {
        // download url
        snapshot.ref.getDownloadURL().then(downloadURL => {
          db.collection("users")
            .doc(props.user.uid)
            .collection("places")
            .add({
              name: locationName,
              image: downloadURL,
              togo: checkedValue,
              details: placeDetails,
              date: placeDate
            })
            .then(() => {
              setLocationName("");
              setFile(null);
              setCheckedValue(false);
              setSavingSpinner(false);
              setPlaceDetails("");
              setPlaceDate("");
              props.onClose();
            });
        });
      });
  };

  const handleFile = f => {
    const file = f.target.files[0];
    setFile(file);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a Place</DialogTitle>
      <DialogContent>
        <TextField
          label="Location"
          fullWidth
          value={locationName}
          onChange={name => {
            setLocationName(name.target.value);
          }}
        />
        {file && <Typography>{file.name}</Typography>}
        <Button variant="contained" style={{ marginTop: 20 }} component="label">
          Choose a Cover Photo
          <input
            type="file"
            onChange={handleFile}
            style={{ display: "none" }}
          />
        </Button>
        <div>
          This is a place I'd like to visit
          <Checkbox
            value={checkedValue}
            onChange={(e, checked) => {
              setCheckedValue(checked);
            }}
          />
        </div>
        <TextField
          label="Details"
          fullWidth
          value={placeDetails}
          onChange={d => {
            setPlaceDetails(d.target.value);
          }}
        />
        <TextField
          label="Date of Departure (MM/DD/YY)"
          fullWidth
          value={placeDate}
          onChange={date => {
            setPlaceDate(date.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          autoFocus
          onClick={handleSaveLocation}
        >
          Save
        </Button>
        {savingSpinner && (
          <CircularProgress
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12
            }}
            color="secondary"
            size={24}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
