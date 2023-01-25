import { PageSection, PageSectionVariants, TextContent, Text, TextVariants, Radio, Flex, FlexItem, FormGroup } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react'

const DefineGoals = (props: { data; setData }) => {

  const [check1, setCheck1] = useState<"predefined" | "custom">(props.data["profile"]);
  useEffect(() => {
    props.setData({ ...{ ...props.data }, profile: check1 })
  }, [check1])

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Flex direction={{ default: 'column' }}>
        <FlexItem>
          <TextContent>
            <Text component={TextVariants.h1}>Define Performance Goals </Text>
          </TextContent>
        </FlexItem>
        <FlexItem>
          <Flex spaceItems={{ default: 'spaceItemsXl' }}>
            <FormGroup role="radiogroup" isStack fieldId="horizontal-form-radio-group" hasNoPaddingTop>

              <Radio id="pre define radio"
                label="Select a Pre-Defined Profile"
                name="A"
                isChecked={check1 === "predefined"}
                description="User can choose from a set of pre configured performance profiles."
                onChange={e => setCheck1("predefined")}

              />

              <Radio id="custom profile radio"
                label="Create your Own Profile"
                name="B"
                //value="custom"
                isChecked={check1 === "custom"}
                description="User can build a profile from scratch."
                onChange={e => setCheck1("custom")}

              />

            </FormGroup>
          </Flex>
        </FlexItem>
      </Flex >
    </PageSection >
  )
}

export { DefineGoals };