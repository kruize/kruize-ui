import * as React from 'react';
import { useState } from 'react';
import {
  TextContent,
  ExpandableSection,
  Text,
  Flex,
  FlexItem,
  PageSectionVariants,
  TextVariants,
  SearchInput,
  PageSection,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Gallery,
  GalleryItem
} from '@patternfly/react-core';
import faqs from './faq.json';

const FAQs = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggle = (i: boolean) => {
    if (isExpanded == i) {
      setIsExpanded(false);
    }
    setIsExpanded(i);
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Flex direction={{ default: 'column' }}>
        <FlexItem>
          <TextContent className="--pf-c-content --pf-c-content--blockquote--PaddingLeft">
            <Text component={TextVariants.h1}>Frequently Asked Questions !</Text>
            <Text component={TextVariants.p}>Welcome to the FAQs Page. Let's see how can we help you!</Text>
          </TextContent>
        </FlexItem>

        {/* <SearchInput
            placeholder='Find by name'
            value={value}
            onChange={setValue}
            onSearch={setValue}
            onClear={() => setValue('')}
          /> */}

        {faqs.map((faq, i) => (
          <FlexItem>
            <ExpandableSection
              key={faq.id}
              toggleText={isExpanded ? faq.question : faq.question}
              onToggle={onToggle}
              //isExpanded={}
              displaySize="large"
              isWidthLimited
            >
              {faq.answer}
            </ExpandableSection>
          </FlexItem>
        ))}
      </Flex>
    </PageSection>
  );
};

export { FAQs };
