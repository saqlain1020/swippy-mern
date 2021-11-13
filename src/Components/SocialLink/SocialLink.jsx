import React from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIco from "src/Assets/icon/link.png";
import Instagram from "src/Assets/icon/instagram.png";
import Snapchat from "src/Assets/icon/snapchat.png";
import Twitter from "src/Assets/icon/twitter.png";
import Linkedin from "src/Assets/icon/linkedin.png";
import Message from "src/Assets/icon/message.png";
import Spotify from "src/Assets/icon/spotify.png";
import Tiktok from "src/Assets/icon/tiktok.png";
import Whatsapp from "src/Assets/icon/whatsapp.png";
import Facebook from "src/Assets/icon/facebook.png";
import Messenger from "src/Assets/icon/messenger.png";
import Youtube from "src/Assets/icon/youtube.png";
import Pinterest from "src/Assets/icon/pinterest.png";
import Email from "src/Assets/icon/email.png";
import SoundCloud from "src/Assets/icon/soundcloud.png";
import Paypal from "src/Assets/icon/paypal.png";
import Website from "src/Assets/icon/website.png";
import Address from "src/Assets/icon/address.png";
import AppleMusic from "src/Assets/icon/applemusic.png";
import ContactCard from "src/Assets/icon/contactcard.png";
import Text from "src/Assets/icon/text.png";
import Facetime from "src/Assets/icon/facetime.png";
import Tinder from "src/Assets/icon/tinder.png";
import Podcast from "src/Assets/icon/podcast.png";
import Linktree from "src/Assets/icon/linktree.png";
import Onlyfans from "src/Assets/icon/onlyfans.png";
import Clubhouse from "src/Assets/icon/clubhouse.png";
import Telegram from "src/Assets/icon/telegram.png";
import Call from "src/Assets/icon/call.png";
import { Link } from "react-router-dom";
import AddSocialDialog from "./../AddSocialDialog/AddSocialDialog";
import { connect } from "react-redux";
import { deleteSocial, changePrimary } from "src/Redux/user/userActions";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
  },
  img: {
    borderRadius: 30,
    overflow: "hidden",
    boxShadow: theme.custom.shadow.icon,
  },
  text: {
    fontSize: 16,
    color: "black",
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: 1,
    fontWeight: 400,
    marginTop: 10,
  },
  activeIcon: {
    color: "#ff8400",
    transform: "scale(1.1)",
  },
}));

const SocialLink = ({
  icon,
  title,
  url,
  contactCard,
  isPrimary,
  index,
  deleteSocial,
  changePrimary,
}) => {
  const classes = useStyles();
  const [src, setSrc] = React.useState(Link);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    switch (icon) {
      case "instagram":
        setSrc(Instagram);
        break;
      case "snapchat":
        setSrc(Snapchat);
        break;
      case "twitter":
        setSrc(Twitter);
        break;
      case "call":
        setSrc(Call);
        break;
      case "linkedin":
        setSrc(Linkedin);
        break;
      case "message":
        setSrc(Message);
        break;
      case "spotify":
        setSrc(Spotify);
        break;
      case "tiktok":
        setSrc(Tiktok);
        break;
      case "whatsapp":
        setSrc(Whatsapp);
        break;
      case "facebook":
        setSrc(Facebook);
        break;
      case "messenger":
        setSrc(Messenger);
        break;
      case "youtube":
        setSrc(Youtube);
        break;
      case "pinterest":
        setSrc(Pinterest);
        break;
      case "email":
        setSrc(Email);
        break;
      case "soundcloud":
        setSrc(SoundCloud);
        break;
      case "paypal":
        setSrc(Paypal);
        break;
      case "website":
        setSrc(Website);
        break;
      case "address":
        setSrc(Address);
        break;
      case "applemusic":
        setSrc(AppleMusic);
        break;
      case "contactcard":
        setSrc(ContactCard);
        break;
      case "text":
        setSrc(Text);
        break;
      case "facetime":
        setSrc(Facetime);
        break;
      case "tinder":
        setSrc(Tinder);
        break;
      case "podcast":
        setSrc(Podcast);
        break;
      case "linktree":
        setSrc(Linktree);
        break;
      case "onlyfans":
        setSrc(Onlyfans);
        break;
      case "clubhouse":
        setSrc(Clubhouse);
        break;
      case "telegram":
        setSrc(Telegram);
        break;
      default:
        setSrc(LinkIco);
    }
  }, []);

  const handleDelete = () => {
    deleteSocial(index);
  };

  return (
    <div className={classes.root}>
      <a
        href={url}
        className={classes.root}
      >
        <img
          width="130px"
          height="130px"
          className={classes.img}
          src={src}
          alt="social"
        />
        {console.log(title,icon)}
        <Typography align="center" className={classes.text}>
          {/* Capitalizing first letter */}
          {title ? title : `${icon[0].toUpperCase() + icon.slice(1)}`}
        </Typography>
      </a>
      {index !== undefined && (
        <div className="center">
          {isPrimary && (
            <IconButton size="small" className={classes.activeIcon}>
              <StarIcon />
            </IconButton>
          )}
          {!isPrimary && (
            <IconButton size="small" onClick={() => changePrimary(index)}>
              <StarBorderIcon />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => setOpen(true)}>
            <BorderColorIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      <AddSocialDialog
        open={open}
        onClose={() => setOpen(false)}
        edit={true}
        social={{ icon, title, url, index, contactCard }}
      />
    </div>
  );
};

const actions = {
  deleteSocial,
  changePrimary,
};

export default connect(null, actions)(SocialLink);

SocialLink.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
};

SocialLink.defaultProps = {
  icon: "link",
  url: "",
  id: null,
};
