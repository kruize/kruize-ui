import * as React from 'react';
import {
  TextContent,
  Text,
  TextVariants, SearchInput, PageSection, Card, CardTitle, CardBody, CardFooter, Gallery, GalleryItem
} from '@patternfly/react-core';


const FAQs: React.FunctionComponent = () => {
  const [value, setValue] = React.useState('');
  return (


    <PageSection>
      <section className="pf-c-page__main-section pf-m-limit-width pf-m-light">
        <div className='pf-c-page__main-body'>
          <TextContent className="--pf-c-content --pf-c-content--blockquote--PaddingLeft" >
            
            <Text component={TextVariants.h1}>Frequently Asked Questions !</Text>
            <Text component={TextVariants.p}>Welcome to the FAQs Page.</Text>
            
          </TextContent>
        </div>
      </section>
      <br /><br />
      <section className="pf-c-page__main-section pf-m-limit-width pf-m-light">
        <div className='pf-c-page__main-body'>
          <TextContent><Text component={TextVariants.h4}>How can we help you!</Text></TextContent>
          <SearchInput
            placeholder='Find by name'
            value={value}
            onChange={setValue}
            onSearch={setValue}
            onClear={() => setValue('')}
          />
        </div>
      </section>
      <div className='pf-c-page__main-body'>
        <Gallery hasGutter>
          <GalleryItem>
            <Card>
              <CardTitle>Q. Can this also give information about the cost of a cluster w.r.t money and resources for a customer?</CardTitle>
              <CardBody> A. Working on analyser recc manager to get complete workflow working
                Curr mvp focus is to optimize stack to get best performance at individual pod level. We plan to Horizontally scale in future.
              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. What are the supported SLO classes?
              </CardTitle>
              <CardBody>A. Right now REsp time , throughput , resource usage : arrived mannually.We may add more
              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. How are the tunables specified?

              </CardTitle>
              <CardBody>A. Under manifest/autotune-configs - there are different YAML files in which several layers are 		defined i.e for ex quarkus YAML file contains tunable defined under it

              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. When we run the experiment, do we have several pods receiving multiple requests or is it just single pod since it is cost incurring

              </CardTitle>
              <CardBody>A. Right now we are limited to only one single pod.

              </CardBody>
            </Card>
          </GalleryItem>
        </Gallery>
      </div>

    </PageSection >
  )
}

export { FAQs };
