import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import { injectIntl } from 'react-intl';
import { dismissNotices } from '../../../actions/appActions';
import { CloseButton } from '../IconButton';
import AppNotice from './AppNotice';
import { LEVEL_ERROR } from '../Notice';

const localMessages = {
  dismiss: { id: 'notices.dismiss', defaultMessage: 'dismiss' },
};

class AppNoticesContainer extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { notices } = this.props;
    // if there any new notices, scroll to top so user can see them
    if (nextProps.notices.length > notices.length) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { notices, handleDismiss } = this.props;
    const { formatMessage } = this.props.intl;
    let content = null;
    if (notices.length > 0) {
      const isNotAllErrors = notices.map(({ level }) => level === LEVEL_ERROR).includes(false);
      content = (
        <div id="app-notice-list" className={`app-notice-list-${isNotAllErrors ? 'warnings' : 'errors'}`}>
          <Grid>
            <Row>
              <Col lg={10}>
                {notices.map((notice, idx) => <AppNotice key={idx} info={notice} />)}
              </Col>
              <Col lg={2}>
                <CloseButton
                  onClick={handleDismiss}
                  tooltip={formatMessage(localMessages.dismiss)}
                  backgroundColor="#000000"
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
    return content;
  }

}

AppNoticesContainer.propTypes = {
  // from parent
  // from context
  intl: PropTypes.object.isRequired,
  // state
  notices: PropTypes.array,
  // from dispatch
  handleDismiss: PropTypes.func.isRequired,
};

AppNoticesContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  notices: state.app.notices,
});

const mapDispatchToProps = dispatch => ({
  handleDismiss: () => {
    dispatch(dismissNotices());
  },
});

export default
  injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(
      AppNoticesContainer
    )
  );
