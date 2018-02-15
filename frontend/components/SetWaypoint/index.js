import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import { addWaypoint } from 'Redux/ac/route';
import { MESSAGE_SET_WAYPOINT } from 'constants';

class SetWaypoint extends Component {
  static propTypes = {
    addWaypoint: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, reset, addWaypoint } = this.props;

    return (
      <Form onSubmit = {handleSubmit(this.handleSubmit(reset, addWaypoint))}>
        <Field
          name = "waypoint"
          component = {inputWaypoint}
          type = "text"
        />
      </Form>
    );
  }

  handleSubmit = (reset, addWaypoint) => values => {
    reset();
    addWaypoint(values.waypoint);
  }
}

const inputWaypoint = ({input}) => (
  <FormGroup>
    <Label>{MESSAGE_SET_WAYPOINT}</Label>
    <Input type = "text" {...input} />
  </FormGroup>
);

export default connect(null, { addWaypoint })(reduxForm({
  form: 'waypoint-form',
  initialValues: {
    waypoint: ''
  }
})(SetWaypoint));
