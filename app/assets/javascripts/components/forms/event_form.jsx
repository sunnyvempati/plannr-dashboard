var EventForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired
  },
  url: '/events.json',
  getInitialState: function() {
    return {
      startDate: this.props.model.start_date ? moment(this.props.model.start_date) : null
    };
  },
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'event': {
        'name': inputs.name,
        'start_date': inputs.start_date,
        'end_date': inputs.end_date,
        'description': inputs.description,
        'location': inputs.location,
        'client_id': inputs.client,
        'budget': inputs.budget
      }
    };
  },
  onSuccess: function (result) {
    location.href = "/events/" + result.event.id + "/";
  },
  setStartDate: function(date) {
    this.setState({startDate: date});
  },
  onSecondaryClick: function() {
    location.href = "/events";
  },
  formatDateAndSubmit: function(data, reset, invalidate) {
    data.event.start_date = data.event.start_date && data.event.start_date.format();
    data.event.end_date = data.event.end_date && data.event.end_date.format();
    this.props.routeVerb == "POST" ? this.postForm(data, reset, invalidate) : this.putForm(data, reset, invalidate);
  },
  render: function () {
    this.putUrl = this.props.model && this.props.model.id && "/events/" + this.props.model.id + ".json";

    var id = 'event_form';
    var endDate = this.props.model.end_date ? moment(this.props.model.end_date) : null;
    var primaryButtonText = this.props.routeVerb == "POST" ? "Create" : "Update";
    return (
      <div className="FormContainer--leftAligned">
        <Form mapping={this.mapInputs}
              onSubmit={this.formatDateAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}
              id={id}>
          <FormInput
            name="name"
            id="event_name"
            autofocus="autofocus"
            placeholder="Give it a unique name"
            type="text"
            label="Name*"
            value={this.props.model.name}
            required
          />
          <DatePickerInput
            name="start_date"
            label="Start Date"
            value={this.state.startDate}
            placeholder="When does it start?"
            onValueSet={this.setStartDate}
            minDate={moment()}
          />
          <DatePickerInput
            name="end_date"
            label="End Date"
            value={endDate}
            placeholder="When does it end?"
            minDate={this.state.startDate}
          />
          <FormInput
            name="location"
            id="event_location"
            type="text"
            label="Location"
            value={this.props.model.location}
            placeholder="Where will it be held?"
          />
          <ClientInput
            name='client'
            value={this.props.model.client_id}
            id='event_client'
            label='Client' />
          <FormInput
            name="budget"
            id="event_budget"
            currencyField={true}
            type="text"
            label="Budget"
            value={this.props.model.budget}
            placeholder="How much will it cost?"
            validationError="Must be a number (no commas)"
          />
          <TextAreaInput
            name="description"
            form={id}
            value={this.props.model.description}
            className="TextAreaInput"
            label="Description"
            placeholder="What else do you need to know?"
          />
          {this.renderFormTwoButtons(primaryButtonText, 'Cancel')}
        </Form>
      </div>
    );
  }
});
