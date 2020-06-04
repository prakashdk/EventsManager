import React, { useState } from "react";
import { connect } from "react-redux";

import { TextField, FormHelperText, Button } from "@material-ui/core";

function RegistrationForm({
  eventType,
  eventName,
  playerList,
  setPlayers,
  ...props
}) {
  const [teamName, setTeamName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [teamNameHelperText, setTeamNameHelperText] = useState("");
  const [mobileNumberHelperText, setMobileNumberHelperText] = useState(
    "*use valid moblile number"
  );

  const handleRegister = () => {
    let newTeam = {
      eventName: eventName,
      eventType: eventType,
      teamName: teamName,
      mobileNumber: mobileNumber,
    };
    if (!isEmpty(teamName) && !isEmpty(mobileNumber)) {
      setTeamNameHelperText("");
      setMobileNumberHelperText("");
      let players = [...playerList];
      let available = players.some((item) => item.teamName === teamName);
      if (!available) {
        if (mobileNumber.length === 10) {
          if (checkRegistrationAvailabily(eventName, eventType)) {
            players.push(newTeam);
            setPlayers(players);
            alert("Successfully registered");
          } else {
            setTeamNameHelperText("Maximum resgistration acquired");
          }
        } else {
          setMobileNumberHelperText("Invalid number");
        }
      } else {
        setTeamNameHelperText("Team name/Leader name already taken");
      }
    } else {
      setMobileNumberHelperText("Mobile number is required");
      setTeamNameHelperText("Team name/leader name is required");
    }
  };
  const checkRegistrationAvailabily = (eventName, eventType) => {
    let players = [...playerList];
    let count = 0;
    players.map((item) => {
      if (eventType === item.eventType && eventName === item.eventName) {
        count++;
      }
    });
    switch (eventType) {
      case "SOLO":
        if (count < 100) {
          return true;
        } else {
          return false;
        }
      case "SQUAD":
        if (count < 25) {
          return true;
        } else {
          return false;
        }
      case "DUO":
        if (count < 50) {
          return true;
        } else {
          return false;
        }
      default:
        break;
    }
  };
  const isEmpty = (value) => {
    return value === "" || value === undefined || value === null;
  };
  return (
    <div className="content-body">
      <div className="margin">
        <TextField
          value={eventName}
          variant="filled"
          label="Event name"
          disabled
        ></TextField>
      </div>
      <div className="margin">
        <TextField
          value={eventType}
          variant="filled"
          label="Event type"
          disabled
        ></TextField>
      </div>
      <div className="margin">
        <TextField
          value={teamName}
          variant="filled"
          label="Team name/Leader name"
          onChange={(event) => setTeamName(event.target.value)}
        ></TextField>
        <FormHelperText error>{teamNameHelperText}</FormHelperText>
      </div>
      <div className="margin">
        <TextField
          required
          value={mobileNumber}
          type="number"
          variant="filled"
          label="Mobile number"
          onChange={(event) => setMobileNumber(event.target.value)}
        ></TextField>
        <FormHelperText error>{mobileNumberHelperText}</FormHelperText>
      </div>
      <div className="margin">
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    playerList: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlayers: (players) => {
      dispatch({
        type: "SET_PLAYERS",
        players: players,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
