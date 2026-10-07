export function audienceItems(chrome: {
  retailStore: string;
  architect: string;
  interiorDesign: string;
  wholesalers: string;
}) {
  return [
    { href: '/retail', label: chrome.retailStore, testId: 'link-nav-retail' },
    { href: '/architects', label: chrome.architect, testId: 'link-nav-architect' },
    { href: '/interiors', label: chrome.interiorDesign, testId: 'link-nav-interiors' },
    { href: '/export', label: chrome.wholesalers, testId: 'link-nav-wholesalers' },
  ] as const;
}
