import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { About } from '@app/About/About';
import { NotFound } from '@app/NotFound/NotFound';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { LocalMonitoring } from './Analytics/LocalMonitoring/LocalMonitoring';
import { ClusterDataTable } from './Analytics/LocalMonitoring/ClusterDataTable';
import { ClusterGroupTables } from './Analytics/LocalMonitoring/ClusterGroupTables';
import { CreateExperiment } from './Analytics/LocalMonitoring/CreateExperiment';
import { Monitoring } from './Analytics/LocalMonitoring/RecommendationsForLocalMonitoring/RemoteMonitoring/Monitoring';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
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
    component: About,
    exact: true,
    label: 'About Kruize',
    path: '/',
    title: 'Main About',
    menu: true
  },

  {
    label: 'SRE Analytics',
    routes: [
      {
        component: LocalMonitoring,
        exact: true,
        label: 'DataSources',
        path: '/local_monitoring',
        title: 'Local Monitoring',
        menu: true
      },
      {
        component: Monitoring,
        exact: true,
        label: 'Experiments',
        path: '/experiments',
        title: 'createexp ',
        menu: true
      }
    ],
    menu: true
  },
  {
    label: 'Datasources',
    routes: [
      {
        component: ClusterGroupTables,
        exact: true,
        label: 'Cluster Group Tables',
        path: '/datasources',
        title: 'cluster group'
      },
      {
        component: ClusterDataTable,
        exact: true,
        label: 'Cluster Details',
        path: '/cluster',
        title: 'cluster '
      },
      {
        component: CreateExperiment,
        exact: true,
        label: 'Experiment create',
        path: '/createexp',
        title: 'createexp '
      }
    ],
    menu: false
  },
];


const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      // routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
