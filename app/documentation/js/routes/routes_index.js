var ROUTES_INDEX = {
  name: '<root>',
  kind: 'module',
  className: 'AppModule',
  children: [
    {
      name: 'routes',
      filename: 'src/app/app-routing.module.ts',
      module: 'AppRoutingModule',
      children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'user-info/:id', component: 'User_infoComponent' },
        { path: 'team/:id', component: 'TeamComponent' },
        { path: 'team-player/:team_id/:id', component: 'TeamPlayerComponent' },
        { path: 'home', component: 'HomeComponent' },
        { path: 'match', component: 'MatchComponent' },
        { path: 'create-account', component: 'CreateAccountComponent' },
        { path: 'edit-user-info/:id', component: 'EditUserInfoComponent' },
        { path: 'filter-user-info', component: 'FilterUserInfoComponent' },
      ],
      kind: 'module',
    },
  ],
}
