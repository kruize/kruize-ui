import React from 'react';
import { Slider } from '@patternfly/react-core';

class KruizeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueContinuous: 50,
            inputValueContinuous: 50
        };

        this.sliderTitle = props.title;

        this.onChangeContinuous = (value, inputValue, setLocalInputValue) => {
            let newValue;
            if (inputValue === undefined) {
                newValue = Math.floor(value);
            } else {
                if (inputValue > 100) {
                    newValue = 100;
                    setLocalInputValue(100);
                } else if (inputValue < 0) {
                    newValue = 0;
                    setLocalInputValue(0);
                } else {
                    newValue = Math.floor(inputValue);
                }
            }
            this.setState({
                inputValueContinuous: newValue,
                valueContinuous: newValue
            });
        };
    }

    render() {
        return (
            <div>
                <label className="kruize-gradient-text-1 kruize-yaml-form-label">{this.sliderTitle}</label>
                <br/>
                <Slider
                    hasTooltipOverThumb={true}
                    value={this.state.valueContinuous}
                    isInputVisible
                    inputValue={this.state.inputValueContinuous}
                    inputLabel="%"
                    onChange={this.onChangeContinuous}
                />
            </div>
        );
    }
}

export default KruizeSlider