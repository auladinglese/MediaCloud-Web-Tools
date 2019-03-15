import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import Link from 'react-router/lib/Link';
import AppButton from '../common/AppButton';

const localMessages = {
  createVersion: { id: 'topics.versions.generation.newVersion', defaultMessage: 'Create New Version' },
  createVersionAndGenerate: { id: 'topics.versions.generation.generate', defaultMessage: 'Generate New Version, don\'t Spider' },
  createVersionGenerateAndStartSpider: { id: 'topics.versions.generation.generate', defaultMessage: 'Generate New Version and Spider' },
  // startSpidering: { id: 'focalSets.manage.about', defaultMessage: 'Spider after generating new version.' },
};
const TopicVersionGenerationOptions = (props) => {
  const { topicInfo, handleCreateVersionAndStartSpider, formValues } = props;
  const { formatMessage } = props.intl;
  const topicId = topicInfo.topics_id;
  return (
    <React.Fragment>
      <h3>Placeholder: Your topic has new updates - you can do the following</h3>
      <Link to={`/topics/${topicId}/snapshot/foci/create`}>
        <AppButton
          type="submit"
          label={formatMessage(localMessages.createVersion)}
          onClick={() => handleCreateVersionAndStartSpider(topicId, formValues)}
        />
      </Link>
      <Link to={`/topics/${topicId}/snapshot/foci/create`}>
        <AppButton
          type="submit"
          label={formatMessage(localMessages.createVersionAndGenerate)}
          onClick={() => handleCreateVersionAndStartSpider(topicId, formValues)}
        />
      </Link>
      <Link to={`/topics/${topicId}/snapshot/foci/create`}>
        <AppButton
          type="submit"
          label={formatMessage(localMessages.createVersionGenerateAndStartSpider)}
          onClick={() => handleCreateVersionAndStartSpider(topicId, formValues)}
        />
      </Link>
    </React.Fragment>
  );
};

TopicVersionGenerationOptions.propTypes = {
  intl: PropTypes.object.isRequired,
  topicInfo: PropTypes.object.isRequired,
  handleCreateVersionAndStartSpider: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
};

export default injectIntl(TopicVersionGenerationOptions);
