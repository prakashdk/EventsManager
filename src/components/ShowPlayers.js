import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

function ShowPlayers({eventList,playerList,setEvents,setPlayers,...props}) {
  const [open, setOpen] = useState(false);

  const handleShow = () => {
    setOpen(!open);
  };

  const handleRemove = (eventName) => {
    let withoutRemovedEvents = eventList.filter(
      (event) => event.eventName !== eventName
    );
    setEvents(withoutRemovedEvents);
    let withoutRemovedPlayers = playerList.filter(
      (player) => player.eventName !== eventName
    );
    setPlayers(withoutRemovedPlayers);
  };

  return (
    <div>
      {eventList.map((event) => {
        return (
          <div className="content-body">
            <ul key={event.eventName}>
              <List>
                <ListItem>
                  <ListItemText primary={event.eventName}></ListItemText>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleRemove(event.eventName);
                    }}
                  >
                    Remove Event
                  </Button>
                </ListItem>
              </List>
              <ListItem button onClick={handleShow}>
                <ListItemText primary="Teams/Players" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {playerList.map((player, index) => {
                    return (
                      <ul key={index.toString()}>
                        {player.eventName === event.eventName && (
                          <ListItem>
                            <ListItemText
                              primary={player.teamName}
                            ></ListItemText>
                          </ListItem>
                        )}
                      </ul>
                    );
                  })}
                </List>
              </Collapse>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

const mapDisptchToProps = (dispatch) => {
  return {
    setEvents: (eventList) => {
      dispatch({
        type: "SET_EVENTS",
        events: eventList,
      });
    },
    setPlayers: (players) => {
      dispatch({
        type: "SET_PLAYERS",
        players: players,
      });
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    eventList: state.events,
    playerList: state.players,
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(ShowPlayers);

