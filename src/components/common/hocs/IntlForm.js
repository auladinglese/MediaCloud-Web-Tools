import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete, { AsyncAutocomplete } from '../form/Autocomplete';

/**
 * Helpful compositional wrapper for forms that want to use Material-UI, react-intl and redux-form.
 * This exposes render methods that you can use with redux-form's <Field> tag.  Pass in message objects
 * instead of strings for anything you want localized (error messages, hint text, etc.).
 */
function withIntlForm(Component) {
  class IntlFormForm extends React.Component {
    intlIfObject = (value) => {
      if (typeof value === 'object') {
        return <FormattedMessage {...value} />;
      }
      return value;
    };

    intlCustomProps = (customProps) => {
      const intlCustom = Object.assign({}, customProps);
      ['label', 'helpertext', 'error', 'disabled'].forEach((prop) => {
        if ((prop in customProps)) {
          intlCustom[prop] = this.intlIfObject(customProps[prop]);
        }
      });
      return intlCustom;
    };

    renderTextField = ({ input, meta: { touched, error, asyncValidating }, ...custom }) => {
      const intlCustom = this.intlCustomProps(custom);
      if (intlCustom && intlCustom.helpertext !== undefined) {
        intlCustom.helpertext = intlCustom.helpertext;
      }
      return (
        <TextField
          className={`form-field-text ${asyncValidating ? 'async-validating' : ''}`}
          {...input}
          {...intlCustom}
          error={Boolean(touched && error)}
          helpertext={touched ? this.intlIfObject(error) : ''}
          margin="normal"
        />
      );
    };

    renderTextFieldWithFocus = ({ input, saveRef, meta: { touched, error, warning }, ...custom }) => {
      const intlCustom = this.intlCustomProps(custom);
      if (intlCustom.helpertext !== undefined) {
        intlCustom.helpertext = intlCustom.helpertext;
      }
      return (
        <React.Fragment>
          <TextField
            className="form-field-text"
            error={error !== undefined}
            ref={saveRef}
            {...input}
            {...intlCustom}
            helpertext={touched ? this.intlIfObject(error) : ''}
          />
          {warning && (<div className="textfield-warning">{warning}</div>)}
        </React.Fragment>
      );
    };

    renderCheckbox = ({ input, label, disabled, initialValues }) => (
      <FormControlLabel
        control={(
          <Checkbox
            name={input.name}
            className="form-field-checkbox"
            label={this.intlIfObject(label)}
            checked={input.value === true || input.value === 1 || initialValues === 'checked'}
            onChange={input.onChange}
            disabled={this.intlIfObject(disabled)}
          />
        )}
        label={this.intlIfObject(label)}
      />
    );

    renderSelect = ({ input, meta: { touched, error }, children, ...custom }) => {
      const intlCustom = this.intlCustomProps(custom);
      if (intlCustom && intlCustom.helpertext !== undefined) {
        intlCustom.helpertext = intlCustom.helpertext;
      }
      return (
        <Select
          className="form-field-select"
          error={touched && (error ? this.intlIfObject(error) : null)}
          {...input}
          onChange={event => input.onChange(event.target.value)}
          {...intlCustom}
        >
          {children}
        </Select>
      );
    }

    renderAutocomplete = ({ input, ...custom }) => {
      const intlCustom = this.intlCustomProps(custom);
      return (
        <Autocomplete
          className="form-field-autocomplete"
          onSelected={value => input.onChange(value)}
          {...intlCustom}
        />
      );
    }

    renderAsyncAutocomplete = ({ input, ...custom }) => {
      const intlCustom = this.intlCustomProps(custom);
      return (
        <AsyncAutocomplete
          className="form-field-autocomplete"
          onSelected={value => input.onChange(value)}
          {...intlCustom}
        />
      );
    }

    render() {
      const helpers = {
        renderTextField: this.renderTextField,
        renderCheckbox: this.renderCheckbox,
        renderSelect: this.renderSelect,
        renderTextFieldWithFocus: this.renderTextFieldWithFocus,
        renderNewAutoComplete: this.renderNewAutoComplete,
        renderAutocomplete: this.renderAutocomplete,
        renderAsyncAutocomplete: this.renderAsyncAutocomplete,
      };
      return (
        <Component {...this.props} {...helpers} />
      );
    }
  }

  IntlFormForm.propTypes = {
    intl: PropTypes.object.isRequired,
  };

  return injectIntl(IntlFormForm);
}

export default withIntlForm;
