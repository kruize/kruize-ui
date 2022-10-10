import React, { useState, useEffect } from "react";
import { Button, PageSection, PageSectionVariants, Text, TextInput } from "@patternfly/react-core";
import { MathJax, MathJaxContext } from "better-react-mathjax";
const Final_equation = (props: { data; setData }) => {
    //const numerator = props.data.THequation;
    //const denominator = props.data.RUequation + " * " + props.data.RTequation;
    const [net_eq, setNet_eq] = useState(props.data["net_eq"])
    const config = {
        loader: { load: ["input/asciimath"] }
    };

    useEffect(() => {
        props.setData({ ...{ ...props.data }, net_eq: net_eq, allDone: "yes" })

    }, [net_eq])
    const updateEquation = () => {
        setNet_eq(props.data.THequation)
    }
    return (<>
        <PageSection variant={PageSectionVariants.light}>
            Final Equation
            <Text>
                <MathJaxContext config={config}>
                    {/* <MathJax>{"`frac(10)(4x) 2^(12)`"}</MathJax> */}
                    <MathJax dynamic > {net_eq}</MathJax>
                </MathJaxContext>
                {/* <TextInput value={net_eq} type="text" isDisabled aria-label="readonly input example" /> */}
                {/* <hr />
                <TextInput value={denominator} type="text" isDisabled aria-label="readonly input example" /> */}
                <Button onClick={updateEquation}>
                    Update Equation
                </Button>
            </Text>
        </PageSection>

    </>)
}
export { Final_equation };
