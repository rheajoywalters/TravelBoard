import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./firebase";

export default function PhotoCard(props) {
  const deleteTask = task_id => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("places")
      .doc(props.place_id)
      .collection("photos")
      .doc(props.photo.id)
      .delete();
  };

  return (
    <div>
      <Card style={{ marginRight: 10, marginTop: 10 }}>
        <CardMedia
          style={{ height: 300, width: 450 }}
          image={props.photo.image}
          title={props.photo.title}
          id={props.photo.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.photo.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.photo.details}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href="https://mail.google.com/mail/u/0/#inbox?compose=new"
          >
            Share
          </Button>
          <Button size="small" color="primary" href={props.photo.website}>
            Website
          </Button>
          <IconButton
            onClick={() => {
              deleteTask(props.photo.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
