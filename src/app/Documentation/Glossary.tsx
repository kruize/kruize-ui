import * as React from 'react';
import marked from "marked";
import { PageSection, TextContent, Title } from '@patternfly/react-core';
// import readme from "https://github.com/kruize/autotune/blob/master/docs/autotune_modules.md"
import dompurify from 'dompurify';
// const readmePath = require("https://github.com/kruize/autotune/blob/master/docs/autotune_modules.md");
      

// const Glossary: React.FunctionComponent = () => {
//   const [readMe, setReadMe] = React.useState('')
//   React.useEffect (() => {
//     const markFile = require("https://raw.githubusercontent.com/kruize/autotune/master/docs/autotune_modules.md")
//     fetch(markFile)
//     .then(response => {
//       return response.text()
//     })
//     .then(text => {
//       setReadMe(marked(text))
//     })
//   }, [])
//   return (
//     <div>
//     {console.log(readMe)}
//     <p>acb</p>
//     </div>
//   )
// }
//   <div>
//   <PageSection>
//   declare global {
//   <article dangerouslySetInnerHTML={{__html: readme}}></article>

// function createMarkup() {
//   const sanitize = dompurify.sanitize
//   return {__html: sanitize(readme)}
//   }


//   <center>
//     <Title headingLevel="h1" size="lg">Glossary Autotune Page!</Title>
//     <p>High-level description of the Autotune architecture and a glossary of common terms.</p>
//     <hr /></center>
//     <br />
   
//     createMarkup()
   
//     <Title headingLevel="h2" size="xl">Autotune Architecture </Title>
//     <p>Shared vocabulary for Kubernetes, Autotune.</p>
//     <br/>
 
//     <br/>
//     <Title headingLevel="h2" size="xl">Autotune Modules </Title>
//     <p>Shared vocabulary for Kubernetes, Autotune.</p>
//     <br/>
//     <Title headingLevel="h2" size="xl">SRE/Networking Terminology </Title>
//     <p>Shared vocabulary for Kubernetes, Autotune.</p>
//     <br/>
//   </PageSection>
//   <script>

//   </script>
 
//   </PageSection>
//   </div>
// )
const Glossary: React.FunctionComponent = () =>(
  <PageSection>
    <Title headingLevel="h1" size="lg">Analytics Autotune Page!</Title>
  </PageSection>
)
export { Glossary };
