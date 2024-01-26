import React, { useContext, useEffect, useRef, useState } from "react";
import "./BotList.css";
import SearchIcon from "@mui/icons-material/Search";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ChatteContext } from "../../config/context";
import { db } from "../../config/firebase";
import { Avatar, Skeleton } from "@mui/material";
import CustomColors from "../../config/colors";

function BotList({ closeDrawer }) {
  const { currentUser, selectedBot, setSelectedBot } =
    useContext(ChatteContext);
  const [searchKey, setSearchKey] = useState("");
  const [botList, setBotList] = useState([]);
  const [filteredBotList, setFilteredBotList] = useState([]);
  const [listState, setListState] = useState("loading");
  //loading, results, filtered, no-filtered

  useEffect(() => {
    setListState("loading");
    let botRef = collection(db, `zee_users/${currentUser?.userId}/bots`);
    let botQuery = query(botRef, orderBy("dateCreated", "desc"));
    let unsub = onSnapshot(botQuery, (snapshot) => {
      let lst = [];
      snapshot.forEach((bot) => {
        lst.push({ ...bot.data(), botId: bot.id });
      });
      // console.log(lst);
      updateSelectedBot(lst);
      setBotList(lst);
      setListState("results");
    });
    return unsub;
  }, []);

  const updateSelectedBot = (bots) => {
    if (!selectedBot) return;
    let updated = bots.find((bot) => bot.botId === selectedBot.botId);
    setSelectedBot(updated);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchKey(value);
    value = value.trim();
    value = value.toLowerCase();
    let filtered = botList.filter((bot) =>
      bot.name.toLowerCase().includes(value)
    );
    setFilteredBotList(filtered);
    if (filtered.length) {
      setListState("filtered");
    } else {
      setListState("no-filtered");
    }
  };

  return (
    <>
      {listState === "results" ||
      listState === "filtered" ||
      listState === "no-filtered" ? (
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
      ) : listState === "loading" ? (
        Array(3)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <Skeleton
                variant="circular"
                sx={{ margin: "0 5px 0 20px", width: "40px", height: "40px" }}
              />
              <div style={{ flex: 1 }}>
                <Skeleton
                  sx={{ width: "90%", margin: "5px auto" }}
                  variant="rounded"
                  height={10}
                />
                <Skeleton
                  sx={{ width: "90%", margin: "5px auto" }}
                  variant="rounded"
                  height={10}
                />
              </div>
            </div>
          ))
      ) : (
        <></>
      )}
      {listState === "results" ? (
        <div className="bot_results">
          {botList.map((bot) => (
            <BotListItem
              key={bot.botId}
              botObj={bot}
              selected={selectedBot?.botId === bot.botId}
              closeDrawer={closeDrawer}
            />
          ))}
        </div>
      ) : listState === "filtered" ? (
        <div className="bot_results">
          {filteredBotList.map((bot) => (
            <BotListItem
              key={bot.botId}
              botObj={bot}
              selected={selectedBot?.botId === bot.botId}
              closeDrawer={closeDrawer}
            />
          ))}
        </div>
      ) : listState === "no-filtered" ? (
        <p className="no_bots">No results found</p>
      ) : (
        <></>
      )}
    </>
  );
}

const BotListItem = ({ botObj, selected, closeDrawer }) => {
  const { setSelectedBot } = useContext(ChatteContext);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setSelectedBot(botObj);
    if (closeDrawer) closeDrawer();
  };
  return (
    <div
      className="bot_item"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      style={
        hovered
          ? { backgroundColor: CustomColors.backPurple }
          : selected
          ? { backgroundColor: CustomColors.backPurple2 }
          : {}
      }
      onClick={handleClick}
    >
      <div className="bot_item_left">
        <Avatar
          src={botObj?.photoUrl}
          sx={{ margin: "0 5px", backgroundColor: CustomColors.grey300 }}
        />
      </div>
      <div className="bot_item_right">
        <h4 className="bot_item_name">{botObj?.name}</h4>
        <p className="bot_item_desc">{botObj?.description}</p>
      </div>
    </div>
  );
};

export default BotList;
