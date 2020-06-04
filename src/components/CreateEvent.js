import React, { useState } from "react";
import { connect } from "react-redux";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Dialog,
} from "@material-ui/core";

import ShowPlayers from './ShowPlayers';

function CreateEvent({ setEvents, eventList, ...props }) {
  const history = useHistory();
  const [newEvent, setNewEvent] = useState({});
  const [eventName, setEventName] = useState("");
  const [mapName, setMapName] = useState("");
  const [playerType, setPlayerType] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [open, setOpen] = useState(false);
  const [showButtonEnable, setShowButtonEnable] = useState(true);
  const [createButtonEnable, setCreateButtonEnable] = useState(true);
  const [eventsVisible, setEventsVisible] = useState(false);

  const handleShow = () => {
    setOpen(true);
    setCreateButtonEnable(true);
    setShowButtonEnable(false);
  };

  const handleShowEvents = () => {
    if (password === "createevent@own") {
      setEventsVisible(true);
      setOpen(false);
    } else {
      setPasswordHelperText("Invalid password");
    }
  };

  const handleEvent = () => {
    setCreateButtonEnable(false);
    setShowButtonEnable(true);
    let registeredEvent = {
      eventName: eventName,
      mapName: mapName,
      playerType: playerType,
      description: description,
    };
    if (
      !isEmpty(eventName) &&
      !isEmpty(mapName) &&
      !isEmpty(playerType) &&
      !isEmpty(description)
    ) {
      setHelperText("");
      let events = [...eventList];
      const available = events.some((event) => event.eventName === eventName);
      if (!available) {
        setNameHelperText("");
        setNewEvent(registeredEvent);
        setOpen(true);
      } else {
        setNameHelperText("Event name already taken");
      }
    } else {
      setHelperText("*Fill all fields");
    }
  };

  const handleCreate = () => {
    if (password === "createevent@own") {
      let events = [...eventList, newEvent];
      setEvents(events);
      setOpen(false);
    } else {
      setPasswordHelperText("Invalid password");
    }
  };

  const isEmpty = (value) => {
    return value === "" || value === undefined || value === null;
  };
  return (
    <Router>
      <div className="content-body">
        <FormControl>
          <div className="margin">
            <TextField
              value={eventName}
              variant="outlined"
              label="Event name"
              required
              onChange={(event) => setEventName(event.target.value)}
            ></TextField>
            <FormHelperText error>{nameHelperText}</FormHelperText>
          </div>

          <div className="margin">
            <TextField
              value={mapName}
              variant="outlined"
              label="Tournament map"
              required
              onChange={(event) => setMapName(event.target.value)}
            ></TextField>
          </div>

          <div className="margin">
            <FormControl className="select">
              <InputLabel required>Type</InputLabel>
              <Select
                required
                variant="outlined"
                value={playerType}
                fullWidth
                onChange={(event) => {
                  setPlayerType(event.target.value);
                }}
              >
                <MenuItem value="SQUAD">SQUAD</MenuItem>
                <MenuItem value="DUO">DUO</MenuItem>
                <MenuItem value="SOLO">SOLO</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="margin">
            <TextareaAutosize
              value={description}
              placeholder="description *"
              rowsMin={3}
              required
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="margin">
            <FormHelperText error>{helperText}</FormHelperText>
          </div>

          <div className="margin">
            <Button variant="contained" color="secondary" onClick={handleEvent}>
              Finish
            </Button>
          </div>
          <div className="margin">
            <Button variant="contained" color="secondary" onClick={handleShow}>
              Show my events
            </Button>
          </div>
        </FormControl>

        <Dialog open={open}>
          <div style={{ padding: "10%" }}>
            <TextField
              variant="outlined"
              label="Password *"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            ></TextField>
            <FormHelperText error>{passwordHelperText}</FormHelperText>
            <Button
              variant="contained"
              color="secondary"
              disabled={createButtonEnable}
              onClick={handleCreate}
            >
              Create
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={showButtonEnable}
              onClick={handleShowEvents}
            >
              Show
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </Dialog>
      </div>
      <ShowTab open={eventsVisible}></ShowTab>
    </Router>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    eventList: state.events,
  };
};
const mapDisptchToProps = (dispatch) => {
  return {
    setEvents: (eventList) => {
      dispatch({
        type: "SET_EVENTS",
        events: eventList,
      });
    },
  };
};
export default connect(mapStateToProps, mapDisptchToProps)(CreateEvent);

function ShowTab({open}) {
  if(open){
      return <ShowPlayers></ShowPlayers>;
  }
  else{
      return null;
  }
}
