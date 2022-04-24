import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRenderInterface {
  content: string;
}

const MarkdownRender = (props: MarkdownRenderInterface) => {
  const { content } = props;

  return (
    <div className="max-w-none prose prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-md prose-a:text-primary prose-a:no-underline">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
