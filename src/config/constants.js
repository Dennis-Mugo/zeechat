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

export const getRandomAvatar = () => {
  return avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
};
