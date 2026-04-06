import { PortableText } from "@portabletext/react";

const components = {
  types: {
    image: ({ value }: any) => (
      <img src={value.asset.url} alt="" className="rounded-xl my-8 border" />
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg leading-8 mb-6 text-gray-800">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg">{children}</ol>
    ),
  },
};

export default function BlogContent({ content }: any) {
  return (
    <div className="max-w-3xl mx-auto">
      <PortableText value={content} components={components} />
    </div>
  );
}
