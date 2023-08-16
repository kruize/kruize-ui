import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { About } from '@app/About/About';
import { RunExperiment } from '@app/RunExperiment/RunExperiment';
import { SREAnalytics } from '@app/Analytics/SRE_Analytics/SREAnalytics';
import { UserAnalytics } from './Analytics/User_Analytics/UserAnalytics';
import { ObjectiveFunction } from '@app/AdvancedUser/ObjectiveFunction';
import { LayerDefination } from '@app/AdvancedUser/LayerDefination';
import { TrialSettings } from '@app/AdvancedUser/TrialSettings';
import { InstallationGuide } from '@app/Documentation/InstallationGuide';
import { FAQs } from './Documentation/FAQs';
import { Glossary } from './Documentation/Glossary';
import { CommunityCall } from './Documentation/CommunityCall';
import { NotFound } from '@app/NotFound/NotFound';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { ClusterSummary } from '@app/Summarization/ClusterSummary';

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
    component: RunExperiment,
    exact: true,
    isAsync: true,
    label: 'New Experiment',
    path: '/newexperiment',
    title: 'New Experiment',
    menu: false
  },
  {
    label: 'Analytics',
    routes: [
      {
        component: SREAnalytics,
        exact: true,
        label: 'SRE View',
        path: '/analytics_sre',
        title: 'SRE View'
      }
      // {
      //   component: UserAnalytics,
      //   exact: true,
      //   label: 'User View',
      //   path: '/analytics_user',
      //   title: 'User View'
      // } Hiding the component from screen
    ],
    menu: true
  },
  {
    component: ClusterSummary,
    exact: true,
    isAsync: true,
    label: 'Summarization',
    path: '/summarization',
    title: 'Cluster Summary',
    menu: true
  },
  {
    label: 'Advanced User',
    routes: [
      {
        component: ObjectiveFunction,
        exact: true,
        label: 'ObjectiveFunction',
        path: '/advanceduser/objectivefunction',
        title: 'Objective Function'
      },
      {
        component: LayerDefination,
        exact: true,
        label: 'LayerDefination',
        path: '/advanced_user/layerdefination',
        title: 'Layer Defination'
      },
      {
        component: TrialSettings,
        exact: true,
        label: 'TrialSettings',
        path: '/advanced_user/trialsettings',
        title: 'Trial Settings'
      }
    ],
    menu: false
  },
  {
    label: 'Documentation',
    routes: [
      {
        component: InstallationGuide,
        exact: true,
        label: 'InstallationGuide',
        path: '/documentation/installationguide',
        title: 'Installation Guide'
      },
      {
        component: Glossary,
        exact: true,
        label: 'Glossary',
        path: '/documentation/glossary',
        title: 'Layer Defination'
      },
      {
        component: FAQs,
        exact: true,
        label: 'FAQs',
        path: '/documentation/faqs',
        title: 'FAQs'
      },
      {
        component: CommunityCall,
        exact: true,
        label: 'Community Call',
        path: '/documentation/communitycall',
        title: 'Community Call'
      }
    ],
    menu: false
  }
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
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
  // useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  // useDocumentTitle(title);
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
