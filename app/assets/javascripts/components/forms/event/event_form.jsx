var EventForm = React.createClass({
  hrefRoot: "/events",
  mapInputs: function (inputs) {
    return {
      'name': inputs.name,
      'start_date': inputs.start_date,
      'end_date': inputs.end_date,
      'description': inputs.description,
      'location': inputs.location,
      'client_name': inputs.client_name,
      'budget': inputs.budget,
      'notes': inputs.notes,
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function () {
    location.href = this.hrefRoot;
  },
  render: function () {
    var id = 'event_form';
    return (
      <div className="FormContainer--leftAligned">
        <Form
          url={this.props.action}
          mapping={this.mapInputs}
          onSuccessUrl={this.hrefRoot}
          authToken={this.props.authToken}
          routeVerb={this.props.routeVerb}
          primaryButtonText={this.props.primaryButtonText}
          secondaryButtonVisible={this.props.secondaryButtonVisible}
          secondaryButtonHref={this.props.secondaryButtonHref}
          showButtonList={this.props.showButtonList}
          id={id}>

          <FormInput
            name="name"
            id="event_name"
            autofocus="autofocus"
            placeholder="Give it a unique name"
            type="text"
            label="Event name*"
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />
          <FormInput
            name="start_date"
            id="event_start_date"
            dateField={true}
            type="text"
            label="Start Date"
            value={ util.isoDateToUsFormat(this.props.model.start_date) }
            disabled={this.props.disableForm}
            placeholder="When does it start? (MM/DD/YYYY)"
          />
          <FormInput
            name="end_date"
            id="event_end_date"
            dateField={true}
            type="text"
            label="End Date"
            value={ util.isoDateToUsFormat(this.props.model.end_date) }
            disabled={this.props.disableForm}
            placeholder="When does it end? (MM/DD/YYYY)"
          />
          <FormInput
            name="description"
            id="event_description"
            type="text"
            label="Description"
            value={this.props.model.description}
            disabled={this.props.disableForm}
            placeholder="What can you tell us about this event?"
          />
          <FormInput
            name="location"
            id="event_location"
            type="text"
            label="Location"
            value={this.props.model.location}
            disabled={this.props.disableForm}
            placeholder="Where will it be held?"
          />
          <FormInput
            name="client_name"
            id="event_client_name"
            type="text"
            label="Client"
            value={this.props.model.client_name}
            disabled={this.props.disableForm}
            placeholder="Who's the event for?"
          />
          <FormInput
            name="budget"
            id="event_budget"
            currencyField={true}
            type="text"
            label="Estimated Budget"
            value={this.props.model.budget}
            disabled={this.props.disableForm}
            placeholder="How much will it cost?"
            validations="isNumeric"
            validationError="Must be a number"
          />
          <TextAreaInput
            name="notes"
            form={id}
            className="TextAreaInput"
            label="Notes"
            placeholder="What else do you need to know?"
          />
        </Form>

        <a href={this.hrefRoot }>List</a>
        |
        <a href={this.hrefRoot + "/" + this.props.model.id + "/edit" }>Edit</a>
        |
        <a href={this.hrefRoot + "/" + this.props.model.id  }>Show</a>

      </div>
    );
  }
});
