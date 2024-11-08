export enum Routes {
  Home = '/',
  Feed = '/feed',
  SignUp = '/signUp',
  Projects = '/projects',
  Profile = '/profile',
  Splash = '/splash',
  Settings = '/settings',
  Picture = '/picture',
  Logout = '/logout',
}

export const privateRoutes = [
  Routes.Home,
  Routes.Feed,
  Routes.Projects,
  Routes.Profile,
  Routes.Picture,
];
