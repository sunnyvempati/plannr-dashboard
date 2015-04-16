var TaskFormNew = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,

    model: React.PropTypes.object
  },
  render: function () {
    var action = "/tasks",
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/tasks";

    return (
      <TaskForm action={action}
                model={this.props.model}
                disableForm={false}
                showButtonList={true}
                routeVerb={routeVerb}
                primaryButtonText={primaryButtonText}
                secondaryButtonText={secondaryButtonText}
                secondaryButtonVisible={true}
                secondaryButtonHref={secondaryButtonHref}
                authToken={this.props.authToken}
                userId={this.props.userId} />
    );
  }
});
