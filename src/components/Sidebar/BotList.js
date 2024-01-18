import React, { useContext, useEffect, useState } from "react";
import "./BotList.css";
import SearchIcon from "@mui/icons-material/Search";
import { collection, onSnapshot } from "firebase/firestore";
import { ChatteContext } from "../../config/context";
import { db } from "../../config/firebase";

function BotList(props) {
  const { currentUser } = useContext(ChatteContext);
  const [searchKey, setSearchKey] = useState("");
  const [botList, setBotList] = useState([]);
  const [filteredBotList, setFilteredBotList] = useState([]);
  const [listState, setListState] = useState("loading");
  //loading, results, filtered

  useEffect(() => {
    setListState("loading");
    let botRef = collection(db, `zee_users/${currentUser?.userId}/bots`);
    let unsub = onSnapshot(botRef, (snapshot) => {
      let lst = [];
      snapshot.forEach((bot) => {
        lst.push({ ...bot.data(), botId: bot.id });
      });
      console.log(lst);
      setBotList(lst);
      setListState("results");
    });
    return unsub;
  }, []);

  const fetchBots = async () => {};

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchKey(value);
  };

  return (
    <>
      <div className="side_search_container flex_center">
        <div className="side_search_wrapper">
          <SearchIcon sx={{ marginRight: "10px" }} />
          <input
            placeholder="Search bots"
            value={searchKey}
            onChange={handleSearch}
          />
        </div>
      </div>
    </>
  );
}

export default BotList;
