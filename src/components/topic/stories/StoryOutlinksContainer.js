import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { fetchStoryOutlinks } from '../../../actions/topicActions';
import composeAsyncContainer from '../../common/AsyncContainer';
import messages from '../../../resources/messages';
import StoryTable from '../StoryTable';
import DataCard from '../../common/DataCard';
import DownloadButton from '../../common/DownloadButton';

class StoryOutlinksContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { fetchData } = this.props;
    if (nextProps.timespanId !== this.props.timespanId) {
      fetchData(nextProps.timespanId);
    }
  }
  downloadCsv = () => {
    const { storiesId, topicId, timespanId } = this.props;
    const url = `/api/topics/${topicId}/stories/${storiesId}/outlinks.csv?timespanId=${timespanId}`;
    window.location = url;
  }
  render() {
    const { outlinkedStories, topicId } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <DataCard>
        <div className="actions">
          <DownloadButton tooltip={formatMessage(messages.download)} onClick={this.downloadCsv} />
        </div>
        <h2><FormattedMessage {...messages.outlinks} /></h2>
        <StoryTable stories={outlinkedStories} topicId={topicId} />
      </DataCard>
    );
  }
}

StoryOutlinksContainer.propTypes = {
  // from context
  intl: React.PropTypes.object.isRequired,
  // from parent
  storiesId: React.PropTypes.number.isRequired,
  timespanId: React.PropTypes.number.isRequired,
  topicId: React.PropTypes.number.isRequired,
  // from mergeProps
  asyncFetch: React.PropTypes.func.isRequired,
  // from dispatch
  fetchData: React.PropTypes.func.isRequired,
  // from state
  fetchStatus: React.PropTypes.string.isRequired,
  outlinkedStories: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  fetchStatus: state.topics.selected.story.outlinks.fetchStatus,
  outlinkedStories: state.topics.selected.story.outlinks.list,
  timespanId: state.topics.selected.filters.timespanId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: (timespanId) => {
    dispatch(fetchStoryOutlinks(ownProps.topicId, timespanId, ownProps.storiesId)); // fetch the info we need
  },
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    asyncFetch: () => {
      dispatchProps.fetchData(stateProps.timespanId);
    },
  });
}

export default
  injectIntl(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(
      composeAsyncContainer(
        StoryOutlinksContainer
      )
    )
  );
