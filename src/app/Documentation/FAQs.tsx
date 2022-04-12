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
            <Text component={TextVariants.h4}>Let's see how can we help you!</Text>
          </TextContent>
        </div>
      </section>
      {/* <SearchInput
            placeholder='Find by name'
            value={value}
            onChange={setValue}
            onSearch={setValue}
            onClear={() => setValue('')}
          /> */}


      <div className='pf-c-page__main-body'>
        <Gallery hasGutter>
          <GalleryItem>
            <Card>
              <CardTitle>Q. Can Autotune give information about the cost of a cluster w.r.t money and resources for a customer?
              </CardTitle>
              <CardBody> A. We are working on the analyser recommendation manager to get complete workflow working. The current mvp focus is to optimize stack to get best performance at individual pod level. We plan to Horizontally scale in the future.
              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. What are the supported SLO classes?
              </CardTitle>
              <CardBody>A. Right now supported classes are Response time, throughput & resource usage. We arrived manually in these classes. We may add more such classes in the future. At a time the objective function caters to only one particular slo class.
              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. How are the tunables specified?

              </CardTitle>
              <CardBody>A. Under autotune/ manifest/ autotune-configs - there are different YAML files in which several layers are defined for eg. hotspot, quarkus. These YAML files contain tunables with their value type and range.

              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. While running the experiment, does autotune has several pods receiving multiple requests or is it just single pod since it is cost incurring ?

              </CardTitle>
              <CardBody>A. Yes, right now we are limited to only one single pod to tune a particular microservice for the mvp (minimum viable product) but we plan to extend it for other microservices/ multiple pods.

              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. Do you have any plans to have companies develop their own forks based on autotune as open source?
              </CardTitle>
              <CardBody>A. Really welcome contributions from other contributors and would preferably want them to jointly look at common/current issues in autotune before they start working with their own forks as autotune is in its initial stages thus needs some time before it can be developed specifically by other companies.

              </CardBody>
            </Card>
          </GalleryItem>
          <GalleryItem>
            <Card>
              <CardTitle>Q. In addition to goals and progress , we see that debug loops and troubleshooting are important parts of the SRE work load. Does autotune look into diagnosing and debugging paths for the SRE?
                Can it find the degraded service and the reason behind degradation? Basically if autotune can work beyond performance tuning and optimization.
              </CardTitle>
              <CardBody>A. We haven't yet looked into autotune specifically from a debugging perspective. In the hands of runtime developers they can pick and choose a tunable and see only the effects of one tunable on overall performance and if that leads into an error autotune can be of use. But debugging in a live environment is not a scenario that we currently have in mind.
                But Autotune helps runtime developers analyze large search space (30-50 tunables) when they are not aware how each tunable will perform over time.


              </CardBody>
            </Card>
          </GalleryItem>

        </Gallery>
      </div>

    </PageSection >
  )
}

export { FAQs };