import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import PropType from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import ProfileValueDialog from "../ProfileValueDialog/ProfileValueDialog";
import useStyles from "./ProfileHeadingCardStyles";
import { connect } from "react-redux";
import { uploadProfileImage } from "src/Redux/user/userActions";
import { changeDirect } from "./../../Redux/user/userActions";

const imgPlaceholder =
  "data:image/jpeg;base64,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";

const ProfileHeadingCard = ({
  className,
  style,
  user: {
    displayPhoto,
    name,
    username,
    scanCount,
    description,
    direct = false,
  },
  changeDirect,
  uploadProfileImage,
  data,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const inputRef = React.createRef();

  const fileInputChange = async ({ target: { files } }) => {
    let image = files[0];
    console.log(files[0]);
    uploadProfileImage(image);
  };

  React.useEffect(() => {
    inputRef.current.onchange = fileInputChange;
  }, [inputRef]);

  return (
    <Container
      maxWidth="lg"
      style={{ position: "relative", ...style }}
      className={className}
    >
      <div className={classes.grid}>
        <div>
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            className={classes.avatarBadge}
            overlap="circle"
            invisible={data ? true : false}
            badgeContent={
              <EditIcon
                onClick={() => inputRef.current.click()}
                className={classes.editIco}
              />
            }
            color="primary"
          >
            {!data && (
              <Avatar
                className={classes.avatar}
                src={displayPhoto ? displayPhoto : imgPlaceholder}
              />
            )}
            {data && (
              <Avatar
                className={classes.avatar}
                src={data.displayPhoto ? data.displayPhoto : imgPlaceholder}
              />
            )}
          </Badge>
          {!data && (
            <Typography align="center" className={classes.chip}>
              Swipes: {scanCount || 0}
            </Typography>
          )}
        </div>

        <div className={classes.profileTop}>
          <Typography variant="h4" className={classes.heading}>
            {data ? data.name : name}
          </Typography>
          <Typography className={classes.description}>
            {data ? data.description : description || "Enter description"}
          </Typography>
        </div>
      </div>
      {data && (
        <a href="https://shop-swippy.co/">
          <Button
            fullWidth
            style={{
              maxWidth: 450,
              margin: "auto",
              display: "block",
              marginTop: 10,
            }}
            variant="contained"
            color="primary"
          >
            <i className="fas fa-cart-plus"></i>&nbsp;&nbsp;Tap to get your
            swippy
          </Button>
        </a>
      )}
      {!data && (
        <Grid
          container
          spacing={1}
          style={{ marginTop: 12, maxWidth: 500, margin: "auto" }}
        >
          <Grid item xs={6}>
            <Button
              variant={direct ? "contained" : "outlined"}
              color="primary"
              fullWidth
              className={classes.directBtn}
              onClick={changeDirect}
            >
              Direct {direct ? "On" : "Off"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.directBtn}
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      )}

      <ProfileValueDialog open={open} onClose={() => setOpen(false)} />
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        ref={inputRef}
      />
    </Container>
  );
};

const mapState = (store) => ({
  user: store.user,
});

const actions = {
  uploadProfileImage,
  changeDirect,
};

export default connect(mapState, actions)(ProfileHeadingCard);

ProfileHeadingCard.propTypes = {
  imgSrc: PropType.string,
  name: PropType.string,
  description: PropType.string,
  directFn: PropType.func,
};

ProfileHeadingCard.defaultProps = {
  directFn: () => console.log("Direct Pressed"),
};
