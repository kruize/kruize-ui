import React, { useState, useEffect, useContext } from 'react';
import { Popover, Nav, TextContent, Avatar, Text, TextVariants, NavItem, NavList, Icon } from '@patternfly/react-core';
import Kubernetes_image from '!!url-loader!@app/Assets/images/Kubernetes_image.png';
// import Kruize_logo from '!!url-loader!@app/assets/images/kruize_icon.png';
import Avatar_image from '!!url-loader!@app/Assets/images/Avatar_image.svg';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { getHostname, getPort } from '@app/CentralConfig';

const HorizontalNav = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [autotuneOn, setAutotuneOn] = useState(false);
  const [clusterStatus, setClusterStatus] = useState(false);

  const ip = getHostname();
  const port = getPort();
  const k_url = ip + ':' + port;

  useEffect(() => {
    if (ip) {
      setClusterStatus(true);
    }
  }, []);

  useEffect(() => {
    if (ip === null) {
      console.log(ip, 11);
      setAutotuneOn(false);
    } else {
      setAutotuneOn(true);
    }
  }, []);

  const onSelect = (result) => {
    setActiveItem(result);
  };

  const nav = (
    <Nav onSelect={(_event, result) => onSelect(result)} variant="horizontal" className="nav">
      <NavList>
        <TextContent className="--pf-c-content">
          <Text component={TextVariants.h1}>Kruize</Text>
        </TextContent>

        <NavItem></NavItem>
        <NavItem itemId={0} isActive={activeItem === 9} to="https://github.com/orgs/kruize/people">
          Team
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to="#">
          Blogs
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} to="https://github.com/kruize">
          GitHub
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="https://kruizeworkspace.slack.com/">
          Slack
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="https://www.youtube.com/channel/UCgwhJbGq7NPAkkjgD9cdJXQ">
          YouTube
        </NavItem>
        <NavItem
          itemId={3}
          isActive={activeItem === 3}
          to="https://calendar.google.com/calendar/embed?src=0ccjmebd5q8rgv86ugr8ooc5j0%40group.calendar.google.com&ctz=Asia%2FKolkata"
        >
          Community Call
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="#">
          What's New
        </NavItem>
      </NavList>
    </Nav>
  );
  const rightnav = (
    <React.Fragment>
      <div style={{ margin: '10px' }}>
        {clusterStatus === false ? (
          <Popover
            aria-label="Basic popover"
            headerContent={<div>No Minikube Connection.</div>}
            bodyContent={
              <div>
                <b>Minikube connection is pre requisite for autotune setup.</b>
              </div>
            }
          >
            <Avatar className="pf-c-avatar" src={Avatar_image} alt="Avatar" />
          </Popover>
        ) : (
          <Popover
            aria-label="Basic popover"
            headerContent={<div>Connected to Minikube Cluster!</div>}
            bodyContent={
              <div>
                <b>Cluster Information </b>
                <br />
                <label>Minikube URL : http://{ip}</label>

                <div>
                  <br />
                  <label>Kruize URL : http://{k_url}</label>
                </div>
              </div>
            }
          >
            <Avatar className="pf-c-avatar" src={Kubernetes_image} alt="Kubernetes wheel" />
          </Popover>
        )}
      </div>
      {autotuneOn === true ? (
        <Icon size="lg">
          <CheckCircleIcon color="green" />
        </Icon>
      ) : (
        <Icon size="md">
          <ExclamationCircleIcon color="red" />
        </Icon>
      )}
    </React.Fragment>
  );
  return (
    <div>
      <>
        {nav}
        {rightnav}
      </>
    </div>
  );
};

export default HorizontalNav;
