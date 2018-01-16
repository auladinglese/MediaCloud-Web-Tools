import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Col } from 'react-flexbox-grid/lib';
import AppButton from '../../common/AppButton';

const localMessages = {
  saveSearchDialog: { id: 'explorer.querypicker.saveSearchDialog', defaultMessage: 'Save Your Current Search as...' },
  loadSavedSearches: { id: 'explorer.querypicker.loadSavedSearches', defaultMessage: 'Load Searches...' },
  searchHint: { id: 'explorer.querypicker.searchHint', defaultMessage: 'query names..' },
  saveSearch: { id: 'explorer.querypicker.saveSearch', defaultMessage: 'Save Search' },
};

class QueryPickerCustomQueryHandler extends React.Component {
  state = {
    saveSearchDialogOpen: false,
    searchName: '',  // the actual label they type into the change-label popup dialog
  };

  onSaveRequest = () => {
    this.setState({ saveSearchDialogOpen: true });
    // filter out removed ids...
  }

  onSaveConfirm = () => {
    const { handleSaveSearch } = this.props;
    handleSaveSearch({ label: this.state.searchName });
  };

  handleDialogClose = () => {
    this.setState({ saveSearchDialogOpen: false });
  };

  handleLabelChangeAndClose = () => {
    this.setState({ saveSearchDialogOpen: false });
    this.onSaveConfirm();
  };

  updateTextInDialog = (val) => {
    this.setState({ searchName: val });
  };

  render() {
    const { handleLoadSearch, submitting } = this.props;
    const { formatMessage } = this.props.intl;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.handleLabelChangeAndClose}
      />,
    ];
    return (
      <Col lg={5}>
        <Dialog
          title="Save Query"
          modal={false}
          actions={actions}
          open={this.state.saveSearchDialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          <p><FormattedMessage {...localMessages.saveSearchDialog} /></p>
          <TextField
            className="query-picker-save-search-name"
            id="searchNameInDialog"
            name="searchNameInDialog"
            onChange={(e, val) => {
              this.updateTextInDialog(val);
            }}
            hintText={formatMessage(localMessages.searchHint)}
          />
        </Dialog>
        <AppButton
          style={{ marginTop: 30 }}
          onClick={handleLoadSearch}
          label={formatMessage(localMessages.loadSavedSearches)}
          disabled={submitting}
          secondary
        />
        <AppButton
          style={{ marginTop: 30 }}
          onClick={this.onSaveRequest}
          label={formatMessage(localMessages.saveSearch)}
          disabled={submitting}
          secondary
        />
      </Col>

    );
  }
}

QueryPickerCustomQueryHandler.propTypes = {
  // from parent
  updateQuery: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,

  queryParams: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onLabelEditRequest: PropTypes.func,
  handleSaveSearch: PropTypes.func,
  handleLoadSearch: PropTypes.func,
  // from composition
  intl: PropTypes.object.isRequired,
};


export default
  injectIntl(
    QueryPickerCustomQueryHandler
  );
