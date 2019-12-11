import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./firebase";

export default function PlaceCard(props) {
  const deleteTask = task_id => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("places")
      .doc(props.place.id)
      .delete();
  };

  return (
    <div>
      <Card style={{ maxWidth: 700, marginRight: 10, marginTop: 10 }}>
        <CardMedia
          style={{ height: 300, width: 450 }}
          image={props.place.image}
          title={props.place.name}
          id={props.place.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.place.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.place.details}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.place.date}
          </Typography>
        </CardContent>
        <CardActions>
          {props.type === "gone" ? (
            <Button
              to={"/app/Places_I've_Gone/" + props.place.id + "/"}
              component={Link}
            >
              Reflect and Remember
            </Button>
          ) : (
            <Button
              to={"/app/Places_To_Go/" + props.place.id + "/"}
              component={Link}
            >
              Explore Excursions
            </Button>
          )}
          <IconButton
            onClick={() => {
              deleteTask(props.place.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
