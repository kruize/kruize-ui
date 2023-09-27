import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  PageSection,
  PageSectionVariants,
  
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';

const InstallationGuide = () => {
  const [post, setPost] = useState('');
  useEffect(() => {
    import('./Installationguide.md')
      .then((res) => {
        console.log(res);
        setPost(res.default);
      })
      .catch((err) => console.log(err));
  });

  return (
    <PageSection variant={PageSectionVariants.light}>
      <div className="pf-c-content">
        <ReactMarkdown>{post}</ReactMarkdown>
      </div>
    </PageSection>
  );
};

export { InstallationGuide };
