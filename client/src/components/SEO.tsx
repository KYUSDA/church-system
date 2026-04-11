import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }: any) {
  const pageTitle = title ? `${title} | KYUSDA` : "KYUSDA";
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
