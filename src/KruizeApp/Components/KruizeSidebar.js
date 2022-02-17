import React from 'react';
import { Nav, NavExpandable, NavItem, NavItemSeparator, NavList, NavGroup } from '@patternfly/react-core';

class KruizeSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0
        };
        this.onSelect = result => {
            this.setState({
                activeItem: result.itemId
            });
        };
    }

    render() {
        const { activeItem } = this.state;
        return (
            <Nav onSelect={this.onSelect}>
                <NavList>
                    <NavItem className="kruize-sidebar-item" id="default-link1" to="#default-link1" itemId={0} isActive={activeItem === 0}>
                        Create Yaml
                    </NavItem>
                </NavList>
            </Nav>
        );
    }
}

export default KruizeSidebar;