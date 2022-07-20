import React, { useState, useEffect } from "react";
import {
  Popover,
  Card,
  CardBody,
  Nav,
  ProgressStepper,
  TextContent,
  Avatar,
  Text,
  ProgressStep,
  TextVariants,
  NavItem,
  NavList,
} from "@patternfly/react-core";
import { get_ip, get_port } from "env";

const HorizontalNav: React.FunctionComponent = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [avtarImg, setAvtarImg] = useState("");
  const [autotuneOn, setAutotuneOn] = useState("");
  const ip = get_ip();
  const port = get_port();

  useEffect(() => {
    
     if( ip ){
        setAvtarImg("https://upload.wikimedia.org/wikipedia/labs/b/ba/Kubernetes-icon-color.svg")
     }
    else{
          setAvtarImg("https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg")
        }
      },[]);

  useEffect(() => {
    if(ip && port)
      {
        setAutotuneOn(ip+port)
      }
      else{
        setAutotuneOn("") ;
      }
      }, []);


  const onSelect = (result) => {
    setActiveItem(result);
  };

  const nav = (
    <Nav onSelect={onSelect} variant="horizontal">
      <NavList>
        <span>
          <TextContent className="--pf-c-content">
            <Text component={TextVariants.h1}>Kruize Autotune</Text>
          </TextContent>
        </span>

        <NavItem></NavItem>
        <NavItem
          itemId={0}
          isActive={activeItem === 9}
          to="https://github.com/orgs/kruize/people"
        >
          Team
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to="#">
          Blogs
        </NavItem>
        <NavItem
          itemId={2}
          isActive={activeItem === 2}
          to="https://github.com/kruize"
        >
          GitHub
        </NavItem>
        <NavItem
          itemId={3}
          isActive={activeItem === 3}
          to="https://kruizeworkspace.slack.com/"
        >
          Slack
        </NavItem>
        <NavItem
          itemId={3}
          isActive={activeItem === 3}
          to="https://www.youtube.com/channel/UCgwhJbGq7NPAkkjgD9cdJXQ"
        >
          YouTube
        </NavItem>
        <NavItem
          itemId={3}
          isActive={activeItem === 3}
          to="https://calendar.google.com/calendar/embed?src=0ccjmebd5q8rgv86ugr8ooc5j0%40group.calendar.google.com&ctz=Asia%2FKolkata"
        >
          Community Call
        </NavItem>
        <NavItem
          itemId={3}
          isActive={activeItem === 3}
          to="https://calendar.google.com/calendar/embed?src=0ccjmebd5q8rgv86ugr8ooc5j0%40group.calendar.google.com&ctz=Asia%2FKolkata"
        >
          What's New
        </NavItem>
      </NavList>
    </Nav>
  );
  const rightnav = (
    <React.Fragment>
      <div style={{ margin: "10px" }}>
        {avtarImg == "https://www.patternfly.org/v4/images/avatarImg.668560cdf25a4932ef9f711b4acad52d.svg" ?   
        <Popover
          aria-label="Basic popover"
          headerContent={<div>No Minikube Connection.</div>}
          bodyContent={
            <div>
              <b>Minikube connection is pre requisite for autotune setup.</b>
            </div>
          }
        >
          <Avatar className="pf-c-avatar" src={avtarImg} alt="Avatar" />
        </Popover>
        
        : <Popover
          aria-label="Basic popover"
          headerContent={<div>Connected to Minikube Cluster!</div>}
          bodyContent={
            <div>
              <b>Cluster Information </b>
              <br />
              Minikube URL : http://{ip}
              {port == '' ? <></> :
              <div>
              <br />
              Autotune URL : http://{ip}:{port}
              </div>
              } 
              
            </div>
          }
        >
          <Avatar className="pf-c-avatar" src={avtarImg} alt="Avatar" />
        </Popover>
        }
        
      </div>

      <Card>
        <CardBody>
        
          {autotuneOn != "" ? (
            <ProgressStepper isCenterAligned><ProgressStep variant="success" description="Autotune Status"></ProgressStep></ProgressStepper>
          ) : (
            <ProgressStepper isCenterAligned><ProgressStep variant="danger" description="Autotune Status"></ProgressStep></ProgressStepper>
          )}

        </CardBody>
      </Card>
    </React.Fragment>
  );
  return (
    <div>
      {nav}
      {rightnav}
    </div>
  );
};

export default HorizontalNav;
