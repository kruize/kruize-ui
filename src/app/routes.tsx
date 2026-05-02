import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { LocalMonitoring } from '@app/Analytics/LocalMonitoring/LocalMonitoring';
import { CreateExperiment } from '@app/Analytics/LocalMonitoring/CreateExperiment';
import { Monitoring } from '@app/Analytics/LocalMonitoring/RecommendationsForLocalMonitoring/RemoteMonitoring/Monitoring';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { About } from './About/About';
import { Dashboard } from './modern/Dashboard/Dashboard';
import { ImportMetadata } from './modern/ImportMetadata/ImportMetadata';
import { InstalledConfigs } from './modern/InstalledConfigs/InstalledConfigs';
import { ViewRecommendations } from './modern/ViewRecommendations/ViewRecommendations';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
  menu?: boolean;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
  menu?: boolean;
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: Dashboard,
    exact: true,
    label: 'Dashboard',
    path: '/',
    title: 'Kruize | Modern Dashboard',
    menu: true,
  },
  {
    component: LocalMonitoring,
    exact: true,
    label: 'Explore Cluster',
    path: '/explore-cluster',
    title: 'Kruize | Explore Cluster',
    menu: true,
  },
  {
    component: ViewRecommendations,
    exact: true,
    label: 'View Recommendations',
    path: '/view-recommendations',
    title: 'Kruize | View Recommendations',
    menu: true,
  },
  {
    component: InstalledConfigs,
    exact: true,
    label: 'Installed Configs',
    path: '/installed-configs',
    title: 'Kruize | Installed Configs',
    menu: true,
  },
  {
    component: CreateExperiment,
    exact: true,
    path: '/createExperiment',
    title: 'Kruize | Create Experiment',
  },
  {
    component: Monitoring,
    exact: true,
    path: '/listExperiments',
    title: 'Kruize | Experiment Recommendations',
  },
  {
    component: About,
    exact: true,
    label: 'About',
    path: '/about',
    title: 'Kruize | About',
    menu: true,
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
// may not be necessary if https://github.com/ReactTraining/react-router/issues/5210 is resolved
const useA11yRouteChange = () => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    routeFocusTimer = window.setTimeout(() => {
      const mainContainer = document.getElementById('primary-app-container');
      if (mainContainer) {
        mainContainer.focus();
      }
    }, 50);
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, title, ...rest }: IAppRoute) => {
  useA11yRouteChange();
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title }, idx) => (
        <RouteWithTitleUpdates path={path} exact={exact} component={component} key={idx} title={title} />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };

