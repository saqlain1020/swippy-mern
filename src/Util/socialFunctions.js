export const userNameToUrl = (username, type) => {
  let url = "";
  switch (type) {
    case "spotify":
      url = `https://spoti.fi/${username}`;
      break;
    case "facebook":
      url = `https://www.facebook.com/${username}`;
      break;
    case "linkedin":
      url = `https://www.linkedin.com/in/${username}`;
      break;
    case "message":
      url = `12345678`;
      break;
    case "whatsapp":
      url = `12345678`;
      break;
    case "call":
      url = `12345678`;
      break;
    case "link":
      url = `https://link.com`;
      break;
    case "messenger":
      url = `http://m.me/${username}`;
      break;
    case "telegram":
      url = `http://t.me/${username}`;
      break;
    case "youtube":
      url = `http://youtube.com/channel/${username}`;
      break;
    case "paypal":
      url = `http://paypal.com/${username}`;
      break;
    case "applemusic":
      url = `http://itunes.apple.com/profile/${username}`;
      break;
    case "pinterest":
      url = `http://cz.pinterest.com/${username}`;
      break;
    case "address":
      url = `https://www.google.cz/maps/place/address-on-map@49.1943166...`;
      break;
    case "facetime":
      url = `number/email/username`;
      break;
    case "clubhouse":
      url = "https://clubhouse.com/mylink123";
      break;
    case "tinder":
      url = `https://tinder.com/profile`;
      break;
    case "podcast":
      url = "Your podcast link";
      break;
    case "text":
      url = "Enter text";
      break;
    case "contactcard":
      url = "contactcard";
      break;
    case "email":
      url = "test@mail.com";
      break;
    case "website":
      url = "https://www.google.com";
      break;
    default:
      url = `${username}`;
  }

  return url;
};

export const shapeUrl = (type, initial) => {
  let url = "";
  switch (type) {
    case "instagram":
      url = `https://www.instagram.com/${initial}`;
      break;
    case "snapchat":
      url = `https://www.snapchat.com/add/${initial}`;
      break;
    case "twitter":
      url = `https://www.twitter.com/${initial}`;
      break;
    case "message":
      url = `sms:${initial}`;
      break;
    case "call":
      url = `tel:${initial}`;
      break;
    case "tiktok":
      url = `https://tiktok.com/@${initial}`;
      break;
    case "whatsapp":
      url = `https://wa.me/${initial}`;
      break;

    case "email":
      url = `mailto:${initial}`;
      break;
    case "soundcloud":
      url = `https://soundcloud.com/${initial}`;
      break;
    case "text":
      url = `/text/${initial}`;
      break;
    case "linktree":
      url = `https://linktr.ee/${initial}`;
      break;
    case "onlyfans":
      url = `https://onlyfans.com/${initial}`;
      break;
    case "facetime":
      url = `facetime://${initial}`;
      break;
    default:
      url = initial;
  }
  return url;
};

export const generateVCFUrl = (contactCard = {}) => {
  let { name = "", email = "", phoneNumber = "" } = contactCard;
  let str = `BEGIN:VCARD\nFN:${name}\nEMAIL;TYPE=internet,pref:${email}\nTEL;TYPE=work,voice:${phoneNumber}\nEND:VCARD`;
  var url = "data:text/vcard;charset=utf-8," + encodeURIComponent(str);
  console.log(url);
  return url;
};

function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType, fileName });
  var a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}
