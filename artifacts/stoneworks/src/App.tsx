import { lazy, Suspense, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteStoryMotion } from '@/components/motion/SiteStoryMotion';
import { RouteScroll } from '@/components/layout/RouteScroll';
import { CONTENT_LOCALES, I18nProvider } from '@/i18n';
import NotFound from '@/pages/not-found';
import { HomePage } from '@/pages/home-page';

const lazyPage = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, name: K) =>
  lazy(() => load().then((mod) => ({ default: mod[name] })));

const ExportPage = lazyPage(() => import('@/pages/export-page'), 'ExportPage');
const ArchitectsPage = lazyPage(() => import('@/pages/trade-pages'), 'ArchitectsPage');
const InteriorsPage = lazyPage(() => import('@/pages/trade-pages'), 'InteriorsPage');
const RetailersPage = lazyPage(() => import('@/pages/trade-pages'), 'RetailersPage');
const RetailStorePage = lazyPage(() => import('@/pages/retail-page'), 'RetailStorePage');
const ProductsPage = lazyPage(() => import('@/pages/products-page'), 'ProductsPage');
const AboutPage = lazyPage(() => import('@/pages/about-page'), 'AboutPage');
const AtelierPage = lazyPage(() => import('@/pages/atelier-page'), 'AtelierPage');
const EnquirePage = lazyPage(() => import('@/pages/enquire-page'), 'EnquirePage');
const EstimatePage = lazyPage(() => import('@/pages/estimate-page'), 'EstimatePage');
const StonesPage = lazyPage(() => import('@/pages/stones-page'), 'StonesPage');
const CollectionPage = lazyPage(() => import('@/pages/gallery-pages'), 'CollectionPage');
const PiecePage = lazyPage(() => import('@/pages/gallery-pages'), 'PiecePage');
const RoomPage = lazyPage(() => import('@/pages/gallery-pages'), 'RoomPage');
import '@/styles/image-quality.css';
import {
  Route,
  Redirect,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function SiteRoutes() {
  return (
    <Suspense fallback={null}>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/projects"><Redirect to="/products" replace /></Route>
      <Route path="/collection/:room/:piece" component={PiecePage} />
      <Route path="/collection/:room" component={RoomPage} />
      <Route path="/collection" component={CollectionPage} />
      <Route path="/atelier" component={AtelierPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/estimate" component={EstimatePage} />
      <Route path="/enquire" component={EnquirePage} />
      <Route path="/retailers" component={RetailersPage} />
      <Route path="/retail" component={RetailStorePage} />
      <Route path="/architects" component={ArchitectsPage} />
      <Route path="/interiors" component={InteriorsPage} />
      <Route path="/export" component={ExportPage} />
      <Route path="/stones" component={StonesPage} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        {CONTENT_LOCALES.map((locale) => (
          <Route key={locale} path={`/${locale}`} nest>
            <SiteRoutes />
          </Route>
        ))}
        <Route>
          <SiteRoutes />
        </Route>
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <I18nProvider>
              <Router />
              <RouteScroll />
              <SiteStoryMotion />
            </I18nProvider>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
