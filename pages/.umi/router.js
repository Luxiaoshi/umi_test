import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/employee/edit/:id",
        "exact": true,
        "component": require('../employee/edit/$id.js').default
      },
      {
        "path": "/attendance/export",
        "exact": true,
        "component": require('../attendance/export.js').default
      },
      {
        "path": "/attendance/upload",
        "exact": true,
        "component": require('../attendance/upload.js').default
      },
      {
        "path": "/attendance/:id",
        "exact": true,
        "component": require('../attendance/$id.js').default
      },
      {
        "path": "/attendance/list",
        "exact": true,
        "component": require('../attendance/list.js').default
      },
      {
        "path": "/employee/list",
        "exact": true,
        "component": require('../employee/list.js').default
      },
      {
        "path": "/employee/new",
        "exact": true,
        "component": require('../employee/new.js').default
      },
      {
        "path": "/employee/show/:id",
        "exact": true,
        "component": require('../employee/show/$id.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "component": () => React.createElement(require('/usr/local/lib/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/","component":"./layouts/index.js","routes":[{"path":"/employee/edit/:id","exact":true,"component":"./pages/employee/edit/$id.js"},{"path":"/attendance/export","exact":true,"component":"./pages/attendance/export.js"},{"path":"/attendance/models/attendance","exact":true,"component":"./pages/attendance/models/attendance.js"},{"path":"/attendance/services/attendance","exact":true,"component":"./pages/attendance/services/attendance.js"},{"path":"/attendance/upload","exact":true,"component":"./pages/attendance/upload.js"},{"path":"/attendance/:id","exact":true,"component":"./pages/attendance/$id.js"},{"path":"/attendance/list","exact":true,"component":"./pages/attendance/list.js"},{"path":"/employee/list","exact":true,"component":"./pages/employee/list.js"},{"path":"/employee/models/employee","exact":true,"component":"./pages/employee/models/employee.js"},{"path":"/employee/new","exact":true,"component":"./pages/employee/new.js"},{"path":"/employee/services/employee","exact":true,"component":"./pages/employee/services/employee.js"},{"path":"/employee/show/:id","exact":true,"component":"./pages/employee/show/$id.js"},{"path":"/","exact":true,"component":"./pages/index.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
