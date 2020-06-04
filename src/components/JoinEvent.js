import React, { useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import RegistrationForm from './RegistrationForm';

function JoinEvent({ eventList, ...props }) {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [link,setLink]=useState("");

  const handleLink=(passedEventName,passedEventType) => {             
    setEventName(passedEventName);
    setEventType(passedEventType);
    //alert(eventName);
    setLink("/register");
  }
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <RegistrationForm eventName={eventName} eventType={eventType}></RegistrationForm>
        </Route>
        <Route>
          {eventList.length !== 0 ? (
            <div>
              {eventList.map((event, index) => {
                return (
                  <ul className="event-list" key={index}>
                    <h2 className="head">{event.eventName}</h2>
                    <List
                      subheader={
                        <ListSubheader>
                          {"Type : "}
                          {event.playerType}
                        </ListSubheader>
                      }
                    >
                      <ListItem>
                        <ListItemText primary={"Map : " + event.mapName} />
                      </ListItem>
                      <ListItem button onClick={handleClick}>
                        <ListItemText primary="Description" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                          <ListItem>
                            <ListItemText primary={event.description} />
                          </ListItem>
                        </List>
                      </Collapse>
                      <ListItem>
                        <Link
                          onClick={()=>handleLink(event.eventName,event.playerType)}
                          to={link}
                        >
                          Register
                        </Link>
                      </ListItem>
                    </List>
                  </ul>
                );
              })}
            </div>
          ) : (
            <div className="content-body">
              <h1 className="head">No More Events Available</h1>
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    eventList: state.events,
  };
};
export default connect(mapStateToProps)(JoinEvent);
