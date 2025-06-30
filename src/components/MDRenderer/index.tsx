"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SimpleMarkdownRendererProps {
  markdownText: string;
  className?: string;
  isUser?: boolean;
}

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="relative group my-2">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
        <span className="text-xs text-gray-300 font-medium">
          {language || "text"}
        </span>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={language || "text"}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
        showLineNumbers={false}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export const MDRenderer: React.FC<SimpleMarkdownRendererProps> = ({
  markdownText,
  className = "",
  isUser = false,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {!isUser && (
        <div className="absolute top-2 right-2 z-10">
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 backdrop-blur-sm border border-gray-200/60 bg-gray-50 border-gray-300/60 rounded-md "
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      )}

      <div className={`group ${!isUser ? "pr-12" : ""}`}>
        <ReactMarkdown
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: ({ inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              if (inline) {
                return (
                  <code
                    className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200/50"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock language={language}>
                  {String(children).replace(/\n$/, "")}
                </CodeBlock>
              );
            },
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-gray-900 mb-2 mt-3 first:mt-0 pb-1 border-b border-gray-200">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-gray-900 mb-1.5 mt-3 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5 mt-2.5 first:mt-0">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-semibold text-gray-900 mb-1 mt-2 first:mt-0">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-sm font-semibold text-gray-900 mb-1 mt-2 first:mt-0">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-sm font-medium text-gray-700 mb-1 mt-1.5 first:mt-0">
                {children}
              </h6>
            ),
            p: ({ children }) => (
              <p className="text-gray-800 mb-1.5 last:mb-0 leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-0 mb-1.5 last:mb-0 text-gray-800 ml-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal space-y-0 mb-1.5 last:mb-0 text-gray-800 ml-1 pl-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="flex-1">{children}</span>
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 py-1.5 my-2 bg-blue-50/50 rounded-r-lg">
                <div className="text-gray-700 italic">{children}</div>
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 underline-offset-2 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            hr: () => (
              <hr className="my-3 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            ),
            table: ({ children }) => (
              <div className="my-3 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50">{children}</thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-gray-200">{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-gray-50/50 transition-colors duration-150">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2.5 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2.5 text-sm text-gray-700 border-b border-gray-100">
                {children}
              </td>
            ),
            pre: ({ children }) => <div>{children}</div>,
          }}
        >
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
};
