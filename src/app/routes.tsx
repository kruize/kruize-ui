import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { About } from '@app/About/About';
import  RE  from '@app/RunExperiment/RE';
import { ExperimentStatus } from '@app/ExperimentStatus/ExperimentStatus';
import { Analytics } from '@app/Analytics/Analytics';
import { ObjectiveFunction } from '@app/Advanced User/ObjectiveFunction';
import { LayerDefination } from '@app/Advanced User/LayerDefination';
import { TrialSettings } from '@app/Advanced User/TrialSettings';
import { InstallationGuide } from '@app/Documentation/InstallationGuide';
import { FAQs } from './Documentation/FAQs';
import { Glossary } from './Documentation/Glossary';
import { CommunityCall } from './Documentation/CommunityCall';
import { MoreExperimentDetails } from './ExperimentStatus/MoreExperimentDetails';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: About,
    exact: true,
    label: 'About Autotune',
    path: '/',
    title: 'PatternFly Seed | Main About',
  },
 
  {
    component: RE,
    exact: true,
    isAsync: true,
    label: 'Run Experiment',
    path: '/run_experiment',
    title: 'PatternFly Seed | Run Experiment',
  },
 
  {
    component: ExperimentStatus,
    exact: true,
    isAsync: true,
    label: 'Experiment Status',
    path: '/experiment_status',
    title: 'PatternFly Seed | Status Page',
  },
  {
    component: MoreExperimentDetails,
    exact: true,
    isAsync: true,
    label: 'More Experiment Details',
    path: '/more_experiment_details',
    title: 'PatternFly Seed | Status Page',
  },
  {
    component: Analytics,
    exact: true,
    isAsync: true,
    label: 'Analytics',
    path: '/analytics',
    title: 'PatternFly Seed | Analytics Page',
  },
  {
    label: 'Advanced User',
    routes: [
      {
        component: ObjectiveFunction,
        exact: true,
        label: 'ObjectiveFunction',
        path: '/advanceduser/objectivefunction',
        title: 'PatternFly Seed | Objective Function',
      },
      {
        component: LayerDefination,
        exact: true,
        label: 'LayerDefination',
        path: '/advanced_user/layerdefination',
        title: 'PatternFly Seed | Layer Defination',
      },
      {
        component: TrialSettings,
        exact: true,
        label: 'TrialSettings',
        path: '/advanced_user/trialsettings',
        title: 'PatternFly Seed | Trial Settings',
      },
    ],
  },
  {
    label: 'Documentation',
    routes: [
      {
        component: InstallationGuide,
        exact: true,
        label: 'InstallationGuide',
        path: '/documentation/installationguide',
        title: 'PatternFly Seed | Installation Guide',
      },
      {
        component: Glossary,
        exact: true,
        label: 'Glossary',
        path: '/documentation/glossary',
        title: 'PatternFly Seed | Layer Defination',
      },
      {
        component: FAQs,
        exact: true,
        label: 'FAQs',
        path: '/documentation/faqs',
        title: 'PatternFly Seed | FAQs',
      },
      {
        component: CommunityCall,
        exact: true,
        label: 'Community Call',
        path: '/documentation/communitycall',
        title: 'PatternFly Seed | Community Call',
      },
    ]
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest}/>;
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

