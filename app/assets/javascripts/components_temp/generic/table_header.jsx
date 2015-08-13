var TableHeader = React.createClass({
  render: function() {
    var props = this.props;
    var growClass = "u-flexGrow-" + props.grow;
    var headerClass = "Table-rowItem u-wrapWithEllipsis " + growClass;
    return (
      <div className={headerClass}>{props.name}</div>
    );
  }
});