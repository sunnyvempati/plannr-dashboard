var EventTaskListTile = React.createClass({
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    $.get("tasks", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.tasks
        })
      }
    }.bind(this))
  },
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    return (
      <div className="EventTaskListTile">
        <Link to="tileAll">Zoom Out</Link>
        <Link to='tileNewTask'>New Event Task</Link>
        <EventTaskTable data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});
