import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRenderInterface {
  content: string;
}

const MarkdownRender = (props: MarkdownRenderInterface) => {
  const { content } = props;

  return (
    <div className="max-w-none prose prose-h1:text-2xl prose-h1:my-4 prose-h2:text-xl prose-h2:my-3 prose-h3:text-lg prose-h3:my-2 prose-h4:text-md prose-h4:my-2 prose-a:text-primary prose-a:no-underline prose-blockquote:my-1 prose-li:my-1 prose-img:my-4 prose-p:my-3 prose-pre:my-4 prose-hr:my-5 prose-pre:p-0 prose-code:text-gray-800 prose-pre:text-base">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={vscDarkPlus}
                language={'javascript'}
                PreTag="div"
                customStyle={{
                  marginTop: '0',
                  marginBottom: '0',
                  fontSize: '14px',
                }}
                codeTagProps={{
                  style: {
                    color: 'white',
                  },
                }}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
