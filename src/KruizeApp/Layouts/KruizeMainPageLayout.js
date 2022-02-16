import React from 'react';
import {
    Page,
    Masthead,
    MastheadToggle,
    MastheadMain,
    MastheadBrand,
    MastheadContent,
    PageSidebar,
    PageSection,
    PageSectionVariants,
    PageToggleButton,
    Toolbar,
    ToolbarContent,
    ToolbarItem, Divider
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import KruizeSidebar from "../Components/KruizeSidebar";
import KruizeConfig from "../Modules/KruizeConfig";

class KruizeMainPageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: true
        };
        this.onNavToggle = () => {
            this.setState({
                isNavOpen: !this.state.isNavOpen
            });
        };
    }

    render() {
        const { isNavOpen } = this.state;

        const headerToolbar = (
            <Toolbar id="toolbar">
                <ToolbarContent>
                    <ToolbarItem  className="small-font c-pointer kruize-header-options">Experiments</ToolbarItem>
                    <ToolbarItem  className="small-font c-pointer kruize-header-options">HPO</ToolbarItem>
                </ToolbarContent>
            </Toolbar>
        );

        const Header = (
            <Masthead>
                <MastheadToggle>
                    <PageToggleButton
                        variant="plain"
                        aria-label="Global navigation"
                        isNavOpen={isNavOpen}
                        onNavToggle={this.onNavToggle}
                    >
                        <BarsIcon />
                    </PageToggleButton>
                </MastheadToggle>
                <MastheadMain>
                    <MastheadBrand className="no-underline" href="http://kruize.io" onClick={() => console.log('clicked logo')} target="_blank">
                        <label className="kruize-header-title kruize-gradient-text-2 ">Kruize Autotune</label>
                    </MastheadBrand>
                </MastheadMain>
                <MastheadContent>{headerToolbar}</MastheadContent>
            </Masthead>
        );

        const SidebarNav = <KruizeSidebar />
        const Sidebar = (<PageSidebar nav={SidebarNav} isNavOpen={isNavOpen}/>);

        return (
            <Page className="kruize-main-layout" header={Header} sidebar={Sidebar}>
                <PageSection className="pf- pf-m-full-height" variant={PageSectionVariants.light}>
                    <label className="kruize-gradient-text-1 kruize-page-title">Kruize Autotune Config</label>
                </PageSection>
                <Divider component="div" />
                <PageSection>
                    <KruizeConfig />
                </PageSection>
            </Page>
        );
    }
}

export default KruizeMainPageLayout;