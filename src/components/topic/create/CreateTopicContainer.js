import React from 'react';
import { push } from 'react-router-redux';
import Title from 'react-title-component';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import TopicForm from './TopicForm';
import { updateFeedback } from '../../../actions/appActions';
import { suggestTopic } from '../../../actions/topicActions';

const localMessages = {
  createTopicTitle: { id: 'topic.create.title', defaultMessage: 'Create a New Topic' },
  createTopicText: { id: 'topic.create.text', defaultMessage: 'You can create a new Topic to add to the MediaCloud system.' },
  createTopic: { id: 'topic.create', defaultMessage: 'Create Topic' },
};

const CreateTopicContainer = (props) => {
  const { handleSave } = props;
  const { formatMessage } = props.intl;
  return (
    <Grid>
      <Title render={formatMessage(localMessages.createTopicTitle)} />
      <Row>
        <Col lg={12}>
          <h1><FormattedMessage {...localMessages.createTopicTitle} /></h1>
          <p><FormattedMessage {...localMessages.createTopicText} /></p>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <TopicForm onSaveTopic={handleSave} initialValues={{ spidered: true }} />
        </Col>
      </Row>
    </Grid>
  );
};

CreateTopicContainer.propTypes = {
  // from context
  intl: React.PropTypes.object.isRequired,
  // from dispatch
  handleSave: React.PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  handleSave: (values) => {
    dispatch(suggestTopic(values)).then(() => {
      dispatch(push('/home'));
      dispatch(updateFeedback({ open: true, message: ' We\'ll fire fire off an email asking our back-end team to review your suggestion.' }));
    });
  },
});

export default
  injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(
      CreateTopicContainer
    )
  );
