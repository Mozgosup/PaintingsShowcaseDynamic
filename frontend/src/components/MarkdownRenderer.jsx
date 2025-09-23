import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import {defaultSchema} from 'hast-util-sanitize';

const customSchema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        p: [...(defaultSchema.attributes?.p || []), ['className']],
        em: [...(defaultSchema.attributes?.em || []), ['className']],
    },
};

const markdownPlugins = [[rehypeRaw], [rehypeSanitize, customSchema]];

const MarkdownRenderer = ({children}) => (
    <ReactMarkdown rehypePlugins={markdownPlugins}>{children}</ReactMarkdown>
);

export default MarkdownRenderer;
