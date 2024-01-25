export const emailUrl = "https://sendemail-api-cjhq.onrender.com";

export const avatarUrls = [
  "https://firebasestorage.googleapis.com/v0/b/chatify--chat.appspot.com/o/bot_avatars%2Favatar1.png?alt=media&token=23a241fb-58e3-420a-a0ed-b48f12401322",
  "https://firebasestorage.googleapis.com/v0/b/chatify--chat.appspot.com/o/bot_avatars%2Favatar2.png?alt=media&token=6d774f2d-5adc-4f8e-9dcc-62e765721827",
  "https://firebasestorage.googleapis.com/v0/b/chatify--chat.appspot.com/o/bot_avatars%2Favatar3.png?alt=media&token=d27cd845-93c0-4b8a-9eb1-fa5b39b0814f",
  "https://firebasestorage.googleapis.com/v0/b/chatify--chat.appspot.com/o/bot_avatars%2Favatar4.png?alt=media&token=7694fcbf-2fb5-4cd6-a03b-7e27d9481281",
  "https://firebasestorage.googleapis.com/v0/b/chatify--chat.appspot.com/o/bot_avatars%2Favatar5.png?alt=media&token=de7b7555-659a-4618-82aa-48efa0041950",
];

export const defaultBots = [
  {
    content:
      "You are an educational assistant, You will help with school stuff",
    dateCreated: "1705559634333",
    description: "Educational assistant",
    photoUrl: avatarUrls[1],
    role: "system",
    name: "Zephy",
  },
  {
    content:
      "You are a travel planner. You will assist in travel destinations and packing lists",
    dateCreated: "1705559634333",
    description: "Travel planner",
    photoUrl: avatarUrls[3],
    role: "system",
    name: "Astra",
  },
  {
    content: "You are a general assistant. You can answer to all prompts.",
    dateCreated: "1705559634333",
    description: "General assistant",
    photoUrl: avatarUrls[2],
    role: "system",
    name: "Zee",
  },
];

export const mainWidthBreak = 850;

export const getRandomAvatar = () => {
  return avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
};

export const Time = {
  getTime: (nanoSeconds) => {
    // console.log(nanoSeconds);
    let nano = parseInt(nanoSeconds);
    let d = new Date(nano);
    return d
      .toLocaleTimeString("en-US", { hour12: true, timeStyle: "short" })
      .toLowerCase();
  },

  relativeDate: (nanoSeconds) => {
    let nano = parseInt(nanoSeconds);
    let now = Date.now();
    let diff = now - nano;
    let t = new Date(nano);

    if (diff < 5 * 60 * 1000) {
      return "Now";
    } else if (Time.isToday(nanoSeconds)) {
      return Time.getTime(nanoSeconds);
    } else if (Time.isYesterday(nanoSeconds)) {
      return "Yesterday";
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      return t.toLocaleDateString("en-GB", { weekday: "long" });
    } else {
      return Time.formatDate(t);
    }
  },

  formatDate: (date) => {
    let dd = ("0" + date.getDate()).slice(-2);
    let mm = ("0" + (date.getMonth() + 1)).slice(-2);
    let yy = date.getFullYear();
    return `${dd}/${mm}/${yy}`;
  },

  bubbleRelativeDate: (nanoSeconds) => {
    if (!nanoSeconds) return "";
    let nano = parseInt(nanoSeconds);
    let now = Date.now();
    let diff = now - nano;
    let t = new Date(nano);

    if (Time.isToday(nanoSeconds)) {
      return Time.getTime(nanoSeconds);
    } else if (Time.isYesterday(nanoSeconds)) {
      return "Yesterday, " + Time.getTime(nanoSeconds);
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      return (
        t.toLocaleDateString("en-GB", { weekday: "long" }) +
        ", " +
        Time.getTime(nanoSeconds)
      );
    } else {
      return Time.formatDate(t) + ", " + Time.getTime(nanoSeconds);
    }
  },

  getDateTime: (nanoSeconds) => {
    let nano = parseInt(nanoSeconds);
    let t = new Date(nano);
    return Time.formatDate(t) + ", " + Time.getTime(nanoSeconds);
  },

  formatLastSeen: (nanoSeconds) => {
    if (nanoSeconds.toLowerCase() === "online") return nanoSeconds;
    let nano = parseInt(nanoSeconds);
    let now = Date.now();
    let diff = now - nano;
    let t = new Date(nano);

    if (Time.isToday(nanoSeconds)) {
      return "Last seen today at " + Time.getTime(nanoSeconds);
    } else if (Time.isYesterday(nanoSeconds)) {
      return "Last seen yesterday at " + Time.getTime(nanoSeconds);
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      return `Last seen on ${t.toLocaleDateString("en-GB", {
        weekday: "long",
      })} at ${Time.getTime(nanoSeconds)}`;
    } else {
      return `Last seen on ${Time.formatDate(t)} at  ${Time.getTime(
        nanoSeconds
      )}`;
    }
  },

  msSinceDayStarted: () => {
    let now = new Date();
    let then = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    let diff = now.getTime() - then.getTime(); // difference in milliseconds
    return diff;
  },

  isToday: (nanoSeconds) => {
    let nano = parseInt(nanoSeconds);
    let now = Date.now();
    let diff = now - nano;
    let t = new Date(nano);
    let msSinceDayStarted = Time.msSinceDayStarted();
    // let diffInHours = diff / (1 * 60 * 60 * 1000);
    // console.log(diff, msSinceDayStarted);
    return diff <= msSinceDayStarted;
  },

  isYesterday: (nanoSeconds) => {
    let nano = parseInt(nanoSeconds);
    let now = Date.now();
    let diff = now - nano;
    let t = new Date(nano);
    let hoursSinceYesterdayStarted = new Date(now).getHours() + 24;
    let diffInHours = diff / (1 * 60 * 60 * 1000);

    return diffInHours < hoursSinceYesterdayStarted;
  },
};
