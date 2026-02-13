import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import cookie from 'cookie';
import withRedux from 'next-redux-wrapper';
import { deserialize, serialize } from 'json-immutable/lib';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import GlobalWrap from '../components/global-wrap';
import PageWrap from '../components/page-wrap';
import SidebarCosec from '../containers/sidebar-cosec';
import SidebarCosignatory from '../containers/sidebar-cosignatory';
import Modals from '../containers/modals';

import { init } from '../actions/global.actions';
import { showModal } from '../actions/modal.actions';
import getOrCreateStore from '../lib/with-redux-store';
import { SIGNIN_PATH, INDEX_PATH, RESOLUTION_REPORT_PATH } from '../constants/router.constants';
import { EDIT_COMPANY_MODAL } from '../constants/modal.constants';
import { USER_ROLES } from '../constants/user.constants';
import { isUnregisteredPage } from '../helpers/global.helpers';
import { setResolutionsView } from '../actions/resolutions.actions';
import config from '../utils/config';
import { VIEW_LOCALSTORAGE_PARAM_NAME } from '../constants/global.constants';
import '../assets/global.scss';

if (config.SENTRY_DSN) {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.ENVIRONMENT,
  });
}

const MyApp = ({
  Component, pageProps, store, err,
}) => {
  const isLoggedIn = store.getState().global.get('isLogined');
  const role = store.getState().user.get('role');
  const company = store.getState().user.getIn(['workplaces', '0', 'company']);
  const companyName = company?.name || null;
  const router = useRouter();
  const isReportPage = router.pathname === RESOLUTION_REPORT_PATH;

  if (err) {
    Sentry.captureException(err, {
      extra: {},
    });
    return <Component {...pageProps} />;
  }

  useEffect(() => {
    const resolutionsView = localStorage.getItem(VIEW_LOCALSTORAGE_PARAM_NAME);
    if (resolutionsView) store.dispatch(setResolutionsView(resolutionsView));
  }, []);

  useEffect(() => {
    if (isLoggedIn && !companyName) {
      store.dispatch(showModal(EDIT_COMPANY_MODAL, { info: company, isCosecFirstEnter: true }));
    }
  }, [companyName, isLoggedIn]);

  return (
    <Provider store={store}>
      {isLoggedIn && !isReportPage ? (
        <GlobalWrap>
          {role === USER_ROLES.CO_SEC && <SidebarCosec />}
          {role === USER_ROLES.CO_SIGNATORY && <SidebarCosignatory />}
          <PageWrap>
            <Component {...pageProps} />
          </PageWrap>
        </GlobalWrap>
      ) : <Component {...pageProps} />}
      <Modals />
    </Provider>
  );
};

const redirect = (res, path) => {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    window.location.replace(`${config.CLIENT_URL}${path}`);
  }
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  if (ctx.req && ctx.req.url === '/500/') {
    return {
      pageProps: {},
    };
  }
  let pageProps = {};
  let backError = null;
  const cookies = cookie.parse(ctx?.req?.headers?.cookie || '');

  try {
    await ctx.store.dispatch(init(cookies.Authorization));
    if (isUnregisteredPage(ctx.asPath)) {
      await redirect(ctx.res, INDEX_PATH);
      return {};
    }
  } catch (err) {
    backError = err;
    if (!isUnregisteredPage(ctx.asPath)) {
      await redirect(ctx.res, `${SIGNIN_PATH}?redirect=${ctx.asPath}`);
      return {};
    }
  }

  if (!backError && Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (err) {
      backError = err;
    }
  }

  return { pageProps, backError };
};

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object,
  err: PropTypes.any,
  backError: PropTypes.object,
};

MyApp.defaultProps = {
  pageProps: {},
  store: {},
  err: undefined,
  backError: {},
};

const serializeWrapper = (value, cb) => {
  try {
    value = cb(value);
  } catch (e) {
    // eslint-disable no-empty
  }
  return value;
};

export default withRedux(
  (initialState) => getOrCreateStore(initialState),
  {
    serializeState: (state = {}) => serializeWrapper(state, serialize),
    deserializeState: (state = serialize({})) => serializeWrapper(state, deserialize),
  },
)(MyApp);
