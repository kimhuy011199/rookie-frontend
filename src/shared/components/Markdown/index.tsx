import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRenderInterface {
  content: string;
}

const MarkdownRender = (props: MarkdownRenderInterface) => {
  const { content } = props;

  return (
    <div className="max-w-none prose prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-primary prose-a:no-underline">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
