import { useEffect } from 'react';

type JsonLdProps = {
  id?: string;
  data: unknown;
};

export function JsonLd({ id = 'page', data }: JsonLdProps) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    const existing = document.getElementById(scriptId);
    existing?.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = json;
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [id, json]);

  return null;
}
