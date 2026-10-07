import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { buildCitationFiles } from './src/data/citation-files';
import {
  FALLBACK_SITE_URL,
  normalizeOrigin,
  renderRobotsTxt,
  renderSitemapXml,
  renderWebManifest,
} from './src/lib/seo';

function siteOrigin(): string {
  return normalizeOrigin(process.env.VITE_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL);
}

function writeFile(directory: string, relativePath: string, contents: string) {
  const fullPath = resolve(directory, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}

function writeAll(directory: string, origin: string) {
  writeFile(directory, 'robots.txt', renderRobotsTxt(origin));
  writeFile(directory, 'sitemap.xml', renderSitemapXml(origin));
  writeFile(directory, 'site.webmanifest', renderWebManifest());
  for (const file of buildCitationFiles()) {
    writeFile(directory, file.path, file.contents);
  }
}

function sendText(
  res: { setHeader: (name: string, value: string) => void; end: (body: string) => void },
  type: string,
  body: string,
) {
  res.setHeader('Content-Type', `${type}; charset=utf-8`);
  res.end(body);
}

export function stoneworksSeoPlugin(): Plugin {
  const publicDir = resolve(import.meta.dirname, 'public');

  return {
    name: 'stoneworks-seo-static',
    configureServer(server) {
      const cited = new Map(buildCitationFiles().map((file) => [`/${file.path}`, file.contents]));
      server.middlewares.use((req, res, next) => {
        const origin = normalizeOrigin(
          process.env.VITE_SITE_URL ||
            (req.headers.host
              ? `${req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http'}://${req.headers.host}`
              : FALLBACK_SITE_URL),
        );
        const url = req.url?.split('?')[0] ?? '';
        if (url === '/robots.txt') return sendText(res, 'text/plain', renderRobotsTxt(origin));
        if (url === '/sitemap.xml') return sendText(res, 'application/xml', renderSitemapXml(origin));
        if (url === '/site.webmanifest') return sendText(res, 'application/manifest+json', renderWebManifest());
        const body = cited.get(url);
        if (body) return sendText(res, url.endsWith('.json') ? 'application/json' : 'text/plain', body);
        return next();
      });
    },
    buildStart() {
      writeAll(publicDir, siteOrigin());
    },
    closeBundle() {
      writeAll(resolve(publicDir, '../dist/public'), siteOrigin());
    },
  };
}
