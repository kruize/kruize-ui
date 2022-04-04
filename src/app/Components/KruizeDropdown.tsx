import React from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

class KruizeDropdown extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.options = props.content;

        this.dropdownTitle = props.title;

        this.state = {
            isOpen: false,
            isPlain: true,
            selected: null
        };

        this.onToggle = isOpen => {
            this.setState({
                isOpen
            });
        };

        this.onSelect = (event, selection) => {
            const { selected } = this.state;
            this.setState({
                selected: selection,
                isOpen: false
            });
            console.log('selected:', selection);
        };

        this.clearSelection = () => {
            this.setState({
                selected: null,
                isOpen: false
            });
        };

        this.label = props.label;
    }

    render() {
        const { isOpen, isPlain, selected } = this.state;
        const titleId = 'plain-typeahead-select-id';

        return (
            <div>
        <span className="kruize-yaml-form-label kruize-gradient-text-1" id={titleId}>
            {this.label}
        </span>
                <Select
                    className="small-font"
                    variant={SelectVariant.single}
                    onToggle={this.onToggle}
                    onSelect={this.onSelect}
                    onClear={this.clearSelection}
                    selections={selected}
                    isOpen={isOpen}
                    isPlain={isPlain}
                    aria-labelledby={titleId}
                    placeholderText={this.dropdownTitle}
                >
                    {this.options.map((option, index) => (
                        <SelectOption key={index} value={option.name} />
                    ))}
                </Select>
            </div>
        );
    }
}

export default KruizeDropdown;
