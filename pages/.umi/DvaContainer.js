import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'employee', ...(require('/Users/lxs/lxs/test_route/pages/employee/models/employee.js').default) });
app.model({ namespace: 'attendance', ...(require('/Users/lxs/lxs/test_route/pages/attendance/models/attendance.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
