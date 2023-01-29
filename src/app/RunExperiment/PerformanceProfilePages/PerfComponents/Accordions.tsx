import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionToggle } from '@patternfly/react-core';

const Accordions = () => {

    return (
        <Accordion asDefinitionList>
            <AccordionItem>
                <AccordionToggle
                    id="def-list-toggle1"
                >
                    Trial Settings
                </AccordionToggle>
                <AccordionContent id="def-list-expand1">
                    <p>
                        Measurement duration : 15 mins
                    </p>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem>
                <AccordionToggle id="ff">
                    Recommendation Settings
                </AccordionToggle>
                <AccordionContent id="def-list-expand2">
                    <p>
                        threshold: '0.1'
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export { Accordions }
