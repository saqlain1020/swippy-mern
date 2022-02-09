import React from "react";
import {
  Button,
  Dialog,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { addSocial, updateSocials } from "src/Redux/user/userActions";
import { userNameToUrl } from "./../../Util/socialFunctions";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const socials = [
  { variant: "category", text: "Social Media" },
  { variant: "item", text: "facebook" },
  { variant: "item", text: "instagram" },
  { variant: "item", text: "snapchat" },
  { variant: "item", text: "twitter" },
  { variant: "item", text: "linkedin" },
  { variant: "item", text: "messenger" },
  { variant: "item", text: "tiktok" },
  { variant: "item", text: "tinder" },
  { variant: "item", text: "pinterest" },
  { variant: "category", text: "Contact" },
  { variant: "item", text: "call" },
  { variant: "item", text: "telegram" },
  { variant: "item", text: "whatsapp" },
  { variant: "item", text: "facetime" },
  { variant: "item", text: "address" },
  { variant: "item", text: "contactcard" },
  { variant: "item", text: "message" },
  { variant: "item", text: "email" },
  { variant: "category", text: "Music" },
  { variant: "item", text: "spotify" },
  { variant: "item", text: "soundcloud" },
  { variant: "item", text: "applemusic" },
  { variant: "category", text: "Payment" },
  { variant: "item", text: "paypal" },
  { variant: "category", text: "Others" },
  { variant: "item", text: "youtube" },
  { variant: "item", text: "website" },
  { variant: "item", text: "link" },
  { variant: "item", text: "podcast" },
  { variant: "item", text: "text" },
  { variant: "item", text: "linktree" },
  { variant: "item", text: "onlyfans" },
  { variant: "item", text: "clubhouse" },
];

const AddSocialDialog = ({
  open,
  onClose,
  social,
  addSocial,
  updateSocials,
  _id,
  edit = false,
}) => {
  const classes = useStyles();
  const [icon, setIcon] = React.useState(social?.icon || "");
  const [url, setUrl] = React.useState(social?.url || "");
  const [title, setTitle] = React.useState(social?.title || "");
  const [placeholder, setPlaceholder] = React.useState("");
  const [contactCard, setContactCard] = React.useState({
    name: social?.contactCard?.name || "",
    email: social?.contactCard?.email || "",
    phoneNumber: social?.contactCard?.phoneNumber || "",
  });

  const submit = async (e) => {
    e.preventDefault();
    let obj = {
      icon,
      url,
      title,
      contactCard,
    };

    if (edit) {
      // update
      await updateSocials({ ...obj,_id:social?._id  });
    } else {
      await addSocial(obj);
    }
    onClose();
  };

  const urlFocusOut = (e, ico) => {
    let link = userNameToUrl("username", ico ? ico : icon);
    setPlaceholder(link);
  };
  const handleSelect = (e) => {
    setIcon(e.target.value);
    urlFocusOut(null, e.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      open={open}
      onClose={onClose}
      className={classes.root}
      maxWidth="xs"
    >
      <form onSubmit={submit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              <b>Add Link</b>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Link*</InputLabel>
              <Select
                value={icon}
                onChange={handleSelect}
                required
                fullWidth
                label="Link Type"
                labelWidth={200}
              >
                {socials.map((item) => {
                  if (item.variant === "item")
                    return (
                      <MenuItem key={uuid()} value={item.text}>
                        {item.text}
                      </MenuItem>
                    );
                  else if (item.variant === "category")
                    return (
                      <ListSubheader key={uuid()}>{item.text}</ListSubheader>
                    );
                  else return;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              label="Title"
            />
          </Grid>
          {icon !== "contactcard" && (
            <Grid item xs={12}>
              <TextField
                value={url}
                type="text"
                inputProps={
                  {
                    // pattern: "(http|https)://(.)+[.](.)+",
                  }
                }
                placeholder={`eg.  ${placeholder}`}
                onChange={(e) => setUrl(e.target.value)}
                required
                fullWidth
                onBlur={urlFocusOut}
                label={`eg.  ${placeholder}`}
              />
            </Grid>
          )}

          {icon === "contactcard" && (
            <>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Your Name"
                  value={contactCard.name}
                  required
                  fullWidth
                  onChange={({ target: { value } }) =>
                    setContactCard({ ...contactCard, name: value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="tel"
                  label="Your Phone"
                  value={contactCard.phoneNumber}
                  required
                  fullWidth
                  onChange={({ target: { value } }) =>
                    setContactCard({ ...contactCard, phoneNumber: value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="mail"
                  label="Your Email"
                  value={contactCard.email}
                  required
                  fullWidth
                  onChange={({ target: { value } }) =>
                    setContactCard({ ...contactCard, email: value })
                  }
                />
              </Grid>
            </>
          )}
          {/* button */}
          <Grid item xs={12}>
            <Typography align="right">
              <Button variant="outlined" color="primary" onClick={onClose}>
                Close
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

const actions = {
  addSocial,
  updateSocials,
};

export default connect(null, actions)(AddSocialDialog);
