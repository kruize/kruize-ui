import * as React from 'react';
import {
  TextContent,
  ExpandableSection,
  Text,
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
  const [isExpanded, setIsExpanded] = React.useState(false);

  const onToggle = (isExpanded: boolean) => {
    setIsExpanded(isExpanded);
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent className="--pf-c-content --pf-c-content--blockquote--PaddingLeft">
        <Text component={TextVariants.h1}>Frequently Asked Questions !</Text>
        <Text component={TextVariants.p}>Welcome to the FAQs Page.</Text>
        <Text component={TextVariants.h4}>Let's see how can we help you!</Text>
      </TextContent>

      {/* <SearchInput
            placeholder='Find by name'
            value={value}
            onChange={setValue}
            onSearch={setValue}
            onClear={() => setValue('')}
          /> */}

      {faqs.map((faq) => (
        <ExpandableSection
          key={faq.id}
          toggleText={isExpanded ? 'Show less' : faq.question}
          onToggle={onToggle}
          isExpanded={isExpanded}
          displaySize="large"
          isWidthLimited
        >
          {faq.answer}
        </ExpandableSection>
      ))}
    </PageSection>
  );
};

export { FAQs };
