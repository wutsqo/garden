import ProjectForm from "@components/project-form";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from "@payloadcms/richtext-lexical/react";
import slugify from "@utils/slugify";

type NodeTypes = DefaultNodeTypes;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag;
    const slug = slugify(node.children.map((child) => ("text" in child ? child.text : "")).join(""));
    return (
      <Tag id={slug} className={"scroll-mt-24"}>
        <a href={`#${slug}`} className="no-underline hover:underline">
          {nodesToJSX({ nodes: node.children })}
        </a>
      </Tag>
    );
  },
  blocks: {
    "project-form": () => <ProjectForm />,
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { ...rest } = props;
  return <RichTextWithoutBlocks converters={jsxConverters} {...rest} />;
}
