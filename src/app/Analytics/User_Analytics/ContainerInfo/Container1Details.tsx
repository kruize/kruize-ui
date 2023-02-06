import React from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionToggle, Slider, Text, TextVariants, TextContent } from '@patternfly/react-core';
import { CostTable } from './CostTable';
import { VerticalSlider } from './VerticalSlider';
import { BalanceTable } from './BalanceTable';
import { PerformanceTable } from './PerformanceTable';

const Container1Details = () => {
    const [expanded, setExpanded] = React.useState('ex-toggle2');

    const onToggle = (id: string) => {
        if (id === expanded) {
            setExpanded('');
        } else {
            setExpanded(id);
        }
    };

    return (
        <>
            <Accordion asDefinitionList={false}>
                <AccordionItem>
                    <AccordionToggle
                        onClick={() => {
                            onToggle('ex-toggle1');
                        }}
                        isExpanded={expanded === 'ex-toggle1'}
                        id="ex-toggle1"
                    >
                        Cost
                    </AccordionToggle>
                    <AccordionContent id="ex-expand1" isHidden={expanded !== 'ex-toggle1'}>
                        <CostTable />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                    <AccordionToggle
                        onClick={() => {
                            onToggle('ex-toggle2');
                        }}
                        isExpanded={expanded === 'ex-toggle2'}
                        id="ex-toggle2"
                    >
                        Balance
                    </AccordionToggle>
                    <AccordionContent id="ex-expand2" isHidden={expanded !== 'ex-toggle2'}>
                        <BalanceTable />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem>
                    <AccordionToggle
                        onClick={() => {
                            onToggle('ex-toggle3');
                        }}
                        isExpanded={expanded === 'ex-toggle3'}
                        id="ex-toggle3"
                    >
                        Performance
                    </AccordionToggle>
                    <AccordionContent id="ex-expand3" isHidden={expanded !== 'ex-toggle3'}>
                        <PerformanceTable />
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </>
    );
};

export { Container1Details }
