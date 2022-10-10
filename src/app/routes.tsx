import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { About } from '@app/About/About';
import { RunExperiment } from '@app/RunExperiment/RunExperiment';
import { Analytics } from '@app/Analytics/Analytics';
import { ObjectiveFunction } from '@app/Advanced User/ObjectiveFunction';
import { LayerDefination } from '@app/Advanced User/LayerDefination';
import { TrialSettings } from '@app/Advanced User/TrialSettings';
import { sample } from '@app/Documentation/sample';
import { FAQs } from './Documentation/FAQs';
import { Glossary } from './Documentation/Glossary';
import { CommunityCall } from './Documentation/CommunityCall';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
// import WizardState from './Context_store/WizardState';

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
    component: RunExperiment,
    exact: true,
    isAsync: true,
    label: 'New Experiment',
    path: '/',
    title: 'New Experiment',
  },

  {
    component: Analytics,
    exact: true,
    isAsync: true,
    label: 'Analytics',
    path: '/analytics',
    title: 'Analytics Page',
  },
  {
    label: 'Advanced User',
    routes: [
      {
        component: ObjectiveFunction,
        exact: true,
        label: 'ObjectiveFunction',
        path: '/advanceduser/objectivefunction',
        title: 'Objective Function',
      },
      {
        component: LayerDefination,
        exact: true,
        label: 'LayerDefination',
        path: '/advanced_user/layerdefination',
        title: 'Layer Defination',
      },
      {
        component: TrialSettings,
        exact: true,
        label: 'TrialSettings',
        path: '/advanced_user/trialsettings',
        title: 'Trial Settings',
      },
    ],
  },
  {
    label: 'Documentation',
    routes: [
      {
        component: sample,
        exact: true,
        label: 'InstallationGuide',
        path: '/documentation/installationguide',
        title: 'Installation Guide',
      },
      {
        component: Glossary,
        exact: true,
        label: 'Glossary',
        path: '/documentation/glossary',
        title: 'Layer Defination',
      },
      {
        component: FAQs,
        exact: true,
        label: 'FAQs',
        path: '/documentation/faqs',
        title: 'FAQs',
      },
      {
        component: CommunityCall,
        exact: true,
        label: 'Community Call',
        path: '/documentation/communitycall',
        title: 'Community Call',
      },
    ]
  },
  {
    component: About,
    exact: true,
    label: 'About Autotune',
    path: '/about',
    title: 'Main About',
  }
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
