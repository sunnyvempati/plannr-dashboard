var EventTasksTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      eventTasks: []
    };
  },
  componentDidMount: function() {
    // filter and get all to do items
    this.getEventTasks({status: 1});
  },
  getEventTasks: function(filterParams) {
    $.get("tasks.json", {filter: filterParams}, function(results) {
      if (this.isMounted()) {
        this.setState({
          eventTasks: results.tasks
        })
      }
    }.bind(this))
  },
  getUserTasks: function() {
    $.get("/user_tasks", function(results) {
      if (this.isMounted()) {
        this.setState({
          eventTasks: results.tasks
        })
      }
    }.bind(this))
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "deadline", grow: 4, header: "Due Date"},
      {name: "status", grow: 4, header: "Status"},
      {name: "assigned_to", grow: 4, header: "Assigned to"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "deadline", display: "Due Date"},
      {entity: "status", display: "Status"}
    ]
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    $.post('/tasks/mass_delete',destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.state.eventTasks, deletionIds);
      this.setState({eventTasks: newData, checkedItems: []});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('tasks.json', {sort: {entity: entity, order: order}}, function(result) {
      this.setState({eventTasks: result.tasks});
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_event_tasks', {search: {text: term || ""}}, function(result) {
      this.setState({eventTasks: result.tasks});
    }.bind(this));
  },
  filterItems: function() {
    return [
      {name: "Tasks to do", handler: this.getEventTasks.bind(this, {status: 1}), default: true},
      {name: "Completed Tasks", handler: this.getEventTasks.bind(this, {status: 2})},
      {name: "My Tasks", handler: this.getUserTasks}
    ]
  },
  openCreateTaskModal: function() {
    var props = {
      model: {event_id: this.props.eventId},
      authToken: this.props.authToken,
      refreshData: this.getEventTasks
    }
    var modal = React.createElement(CreateTaskModal, props);
    React.render(modal, document.getElementById('modal'));
  },
  render: function() {
    return (
      <Table
        results={this.state.eventTasks}
        showHeaders={true}
        columns={this.getColumns()}
        useCustomRowComponent={false}
        checkedItems={this.state.checkedItems}
        rowChanged={this.rowChanged}
        sortItems={this.sortItems()}
        handleSortClick={this.sortBy}
        handleSearch={this.search}
        showActions={this.state.checkedItems.length > 0}
        actionItems={this.actionItems()}
        filterable={true}
        filterItems={this.filterItems()}
        tableDataClassName="scrollable"
        searchPlaceholder="Search Tasks..."
        actionButtonText="Create Task"
        actionButtonClick={this.openCreateTaskModal}
        actionButtonSVGClass="createTask"
      />
    );
  }
});
