import React, { useState, useEffect } from 'react';
import { Card, PageSectionVariants, PageSection } from '@patternfly/react-core';
import ReactMarkdown from 'react-markdown';

const Glossary = () => {

    const [post, setPost] = useState('');
    useEffect(() => {
        import('./autotune-modules.md')
            .then(res => {
                console.log(res)
                setPost(res.default)
            })
            .catch(err => console.log(err));
    });

    return (
        <PageSection variant={PageSectionVariants.light}>
            <div className="pf-c-content ws-example-flex-item pf-u-ml-xl">
                <ReactMarkdown children={post} />
            </div>
        </PageSection>
    );
}

export { Glossary };
