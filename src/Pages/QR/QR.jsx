import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import QRCode from "react-qr-code";
import { connect, useDispatch } from "react-redux";
import { Slide } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "reapop";

const useStyles = makeStyles((theme) => ({
  qrContainer: {
    marginTop:20,    
    background: "white",
    boxShadow: theme.custom.shadow.icon,
    padding: 30,
    borderRadius: 30,
    border: "20px solid rgba(200,203,220,0.4)",
    [theme.breakpoints.down("xs")]: {
      padding: 10,
    },
  },
  shareWrapper: {
    position: "relative",
    marginTop:20,
    paddingBottom:100,
  },
}));

const QR = ({ user }) => {
  const classes = useStyles();
  const [url, setUrl] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    const url = `http://${window.location.host}/profile/${user.username}`;
    setUrl(url);
  }, [user]);

  const copySuccess = () => {
    dispatch(notify("Copy Successfull", "success"));
  };

  return (
    <div className={"center"}>
      <Slide direction="up" in={true}>
        <div>
          <div className={classes.qrContainer}>
            <QRCode value={url} size={300} level="Q" />
          </div>
          <center className={classes.shareWrapper}>
            <CopyToClipboard
              onCopy={copySuccess}
              text={`http://${window.location.host}/profile/${user.username}`}
            >
              <Button variant="outlined" color="primary">
                <FileCopyIcon /> &nbsp;&nbsp;Copy profile link
              </Button>
            </CopyToClipboard>
          </center>
        </div>
      </Slide>
    </div>
  );
};

const mapState = (store) => ({
  user: store.user,
});

export default connect(mapState)(QR);
