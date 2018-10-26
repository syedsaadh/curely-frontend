// @flow
import React from 'react';
import { Layout, LocaleProvider } from 'antd';
import { match } from 'react-router';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { Debounce } from 'react-throttle';
import { WindowResizeListener } from 'react-window-resize-listener';
import { logOutUser } from '../../redux/Authentication/actions';
import { toggleAll, toggleCollapsed } from '../../redux/App/actions';
import { getProfile } from '../../redux/Profile/actions';
import { Sidebar, Topbar } from '../../components';
import AppRouter from './AppRouter';
import ModalRoot from '../../helpers/ModalSelector';

const { Content } = Layout;

type props = {
  match: match,
  toggleAll: toggleAll,
  toggleCollapsed: toggleCollapsed,
};

export class AppContainer extends React.Component<props> {
  componentWillMount = () => {
    this.props.getProfile();
  };

  render() {
    const { url } = this.props.match;
    const { modal } = this.props.app;
    return (
      <LocaleProvider locale={enUS}>
        <Layout className="layout-container">
          {this.props.app.modal ? <ModalRoot {...modal} /> : null}
          <Debounce time={300} handler="onResize">
            <WindowResizeListener
              onResize={windowSize =>
                this.props.toggleAll(windowSize.windowWidth, windowSize.windowHeight)
              }
            />
          </Debounce>
          <Sidebar />
          <div className="main-container">
            <Topbar history={this.props.history} />
            <div className="content-wrapper">
              <AppRouter url={url} />
            </div>
          </div>
        </Layout>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { App } = state;
  return {
    app: App,
  };
};
const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logOutUser()),
  getProfile: () => dispatch(getProfile()),
  toggleAll: (width, height) => dispatch(toggleAll(width, height)),
  toggleCollapsed: () => dispatch(toggleCollapsed()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
