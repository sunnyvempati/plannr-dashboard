var TaskFormNew = React.createClass({
  render: function () {
    var action = "/tasks",
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/tasks",
      returnHtml;

    if (!!this.props.model){
       returnHtml = <TaskForm
                      action= {action}
                      model={this.props.model}
                      disableForm={false}
                      showButtonList={true}
                      routeVerb={routeVerb}
                      primaryButtonText={primaryButtonText}
                      secondaryButtonText={secondaryButtonText}
                      secondaryButtonVisible={true}
                      secondaryButtonHref={secondaryButtonHref}
                      authToken={this.props.authToken}
                    />;
    } else {
      returnHtml = <div>Loading...</div>;
    };

    return (
      returnHtml
    );
  }
});
