import React from 'react';
import {
  Nav, TextContent,Avatar,
  Text, NavExpandable, TextVariants,NavItem, NavItemSeparator, NavList, NavGroup, PageHeader
} from '@patternfly/react-core';

const HorizontalNav: React.FunctionComponent = () => {

  const [activeItem, setActiveItem] = React.useState(0);
  const onSelect = result => {
    setActiveItem(result)
  }
  const nav = (


    <Nav onSelect={onSelect} variant="horizontal">
      <NavList>
        <span>
          <TextContent className="--pf-c-content">
            <Text component={TextVariants.h1}>
              Kruize Autotune
            </Text>
          </TextContent>
          </span>
       
        <NavItem>

        </NavItem>
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
        <NavItem itemId={3} isActive={activeItem === 3} to="https://calendar.google.com/calendar/embed?src=0ccjmebd5q8rgv86ugr8ooc5j0%40group.calendar.google.com&ctz=Asia%2FKolkata">
          Community Call
          
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="https://calendar.google.com/calendar/embed?src=0ccjmebd5q8rgv86ugr8ooc5j0%40group.calendar.google.com&ctz=Asia%2FKolkata">
          What's New
          
        </NavItem>
      </NavList>
    </Nav>

  );
  
  return (
    <div>{nav} </div>
  )
}
export default HorizontalNav;
