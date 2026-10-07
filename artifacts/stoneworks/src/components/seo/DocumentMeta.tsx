import { JsonLd } from '@/components/seo/JsonLd';
import { useDocumentMeta, type DocumentMetaInput } from '@/hooks/use-document-meta';
import { siteGraph } from '@/lib/schema';

type DocumentMetaProps = DocumentMetaInput & {
  jsonLd?: unknown;
  includeSiteGraph?: boolean;
};

export function DocumentMeta({
  jsonLd,
  includeSiteGraph = true,
  ...meta
}: DocumentMetaProps) {
  useDocumentMeta(meta);

  return (
    <>
      {includeSiteGraph ? <JsonLd id="site" data={siteGraph(undefined, meta.locale)} /> : null}
      {jsonLd ? <JsonLd id="page" data={jsonLd} /> : null}
    </>
  );
}
