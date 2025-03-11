import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ markdown, isLoading }) => {
    if (isLoading) {
        return (
            <div className="loader">
                <hr />
                <hr />
                <hr />
            </div>
        );
    }

    if (!markdown || typeof markdown !== 'string') {
        return <p>No content available</p>;
    }

    return (
        <div className="font-light leading-7">
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }) {
                        if (inline) {
                            const text = String(children);
                            const match = /^(note|warning|info|tip|question|danger):\s(.+)$/i.exec(text);

                            if (match) {
                                const [, type, content] = match;
                                const colorMap = {
                                    note: 'bg-blue-100 text-blue-800',
                                    warning: 'bg-yellow-100 text-yellow-800',
                                    info: 'bg-gray-100 text-gray-800',
                                    tip: 'bg-green-100 text-green-800',
                                    question: 'bg-purple-100 text-purple-800',
                                    danger: 'bg-red-100 text-red-800',
                                };
                                return (
                                    <span
                                        className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${
                                            colorMap[type.toLowerCase()] || colorMap.info
                                        }`}
                                    >
                    {content}
                  </span>
                                );
                            }
                            return <code className={className} {...props}>{children}</code>;
                        }

                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match) {

                            //  the copy button approach

                            const codeString = String(children).replace(/\n$/, '');
                            const copyToClipboard = () => {
                                navigator.clipboard.writeText(codeString)
                                    .then(() => alert('Code copied to clipboard!')) // Optional feedback
                                    .catch((err) => console.error('Failed to copy:', err));
                            };

                            return (
                                <div className="relative">
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                            );

                        }
                        return <code className={className} {...props}>{children}</code>;
                    },
                    ol({ node, ...props }) {
                        return <ol className="list-decimal pl-8 space-y-2 my-4" {...props} />;
                    },
                    ul({ node, ...props }) {
                        return <ul className="list-disc pl-8 space-y-2 my-4" {...props} />;
                    },
                    li({ node, ...props }) {
                        return <li className="pl-2" {...props} />;
                    },
                    h1({ node, ...props }) {
                        return <h1 className="text-2xl font-bold my-4" {...props} />;
                    },
                    h2({ node, ...props }) {
                        return <h2 className="text-xl font-bold my-3" {...props} />;
                    },
                    h3({ node, ...props }) {
                        return <h3 className="text-lg font-bold my-2" {...props} />;
                    },
                    strong({ node, ...props }) {
                        return <strong className="font-bold" {...props} />;
                    },
                    p({ node, ...props }) {
                        return <p className="my-2" {...props} />;
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;