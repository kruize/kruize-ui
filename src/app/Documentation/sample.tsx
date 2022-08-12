import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const sample = () => {

    const [post, setPost] = useState('');
    useEffect(() => {
        import('./Installationguide.md')
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

export { sample };
