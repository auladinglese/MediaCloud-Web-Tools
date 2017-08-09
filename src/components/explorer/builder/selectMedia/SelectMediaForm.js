import React from 'react';
import { injectIntl } from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import composeIntlForm from '../../../common/IntlForm';
// import MetadataPickerContainer from '../../../common/MetadataPickerContainer';
// import AppButton from '../../../common/AppButton';
// import { TAG_SET_PUBLICATION_COUNTRY, TAG_SET_PUBLICATION_STATE, TAG_SET_PRIMARY_LANGUAGE } from '../../../../lib/tagUtil';

const SelectMediaForm = (props) => {
  const { initialValues, handleSubmit, onSearch, renderTextField } = props;

  const cleanedInitialValues = initialValues ? { ...initialValues } : {};
  if (cleanedInitialValues.keyword === undefined) {
    cleanedInitialValues.keyword = '';
  }
  return (
    <form className="select-media-container" onSubmit={handleSubmit(onSearch.bind(this))}>
      <Field
        name="keyword"
        defaultValue={cleanedInitialValues.keyword}
        component={renderTextField}
      />
    </form>
  );
};


SelectMediaForm.propTypes = {
  intl: React.PropTypes.object.isRequired,
  onSearch: React.PropTypes.func,
  isEditable: React.PropTypes.bool,
  initialValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  renderTextField: React.PropTypes.func.isRequired,
};

const reduxFormConfig = {
  form: 'selectMediaForm',
  enableReinitialize: true,
};

export default
  injectIntl(
    composeIntlForm(
      reduxForm(reduxFormConfig)(
        SelectMediaForm
      )
    )
  );

