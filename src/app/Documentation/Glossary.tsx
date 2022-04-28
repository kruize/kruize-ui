import React, { useState, useEffect } from 'react';

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

        <div className="pf-c-content">
            <ReactMarkdown >{post}</ReactMarkdown>
        </div>
    );
}

export { Glossary };
