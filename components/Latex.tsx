import React from 'react';
import katex from 'katex';

const Latex = ({ children }: { children: string }) => {
    const html = katex.renderToString(children, {
        throwOnError: false,
    });

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Latex;