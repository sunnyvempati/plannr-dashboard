import RouteActions from '../../actions/RouteActions';
import TaskActions from '../../actions/TaskActions';
import TaskStore from '../../stores/TaskStore';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import TaskCheckboxRows from './TaskCheckboxRows';
import SessionStore from '../../stores/SessionStore';
import PageTitleActions from '../../actions/PageTitleActions';

const TaskList = React.createClass({
  mixins: [
    TaskCheckboxRows,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'deadline_asc'},
      filter: {with_status: 1}
    };
  },
  componentDidMount() {
    PageTitleActions.setPageTitle("Tasks", "tasks");
    TaskStore.addChangeListener(this._onViewTasksChange);
  },
  componentDidUpdate: function() {
    if (!TaskStore.tasksLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    TaskStore.removeChangeListener(this._onViewTasksChange);
  },
  _onViewTasksChange() {
    this.setState({data: TaskStore.viewTasks});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (TaskStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      TaskStore.addCachedTasksToView(params);
      this.setState({data: TaskStore.viewTasks});
    } else TaskActions.getTasks(params);
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "deadline_icon", grow: 1, header: ""},
      {name: "deadline", grow: 4, header: "Due Date"},
      {name: "status", grow: 4, header: "Status"},
      {name: "assigned_to", grow: 4, header: "Assigned to"},
      {name: "event", grow: 10, header: "Event"}
    ];
  },
  sortItems: function() {
    return [
      {entity: "deadline", display: "Due Date", default: true},
      {entity: "name", display: "Name"},
      {entity: "status", display: "Status"}
    ]
  },
  actionItems: function() {
    return [
      // global means the action is available as a mass action
      {name: "Edit", handler: this.handleEdit, massAction: false},
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  filterItems: function () {
    return [
      {name: "All Tasks - To do", handler: this.filter.bind(this, {with_status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.filter.bind(this, {with_status: 2})},
      {name: "My Tasks - To do", handler: this.filter.bind(this, {with_assigned_to: SessionStore.userId, with_status: 1})},
      {name: "My Tasks - Completed", handler: this.filter.bind(this, {with_assigned_to: SessionStore.userId, with_status: 2})}
    ]
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openCreateTaskModal}
                    label='Create Task'
                    svgClass='createTask'
                    extraPad={true} />
    );
  },
  render: function() {
    return (
      <Table
        columns={this.getColumns()}
        showHeaders={true}
        useCustomRowComponent={true}
        customRows={this.getCustomRows(true, this.goToTask)}
        sortItems={this.sortItems()}
        handleSortClick={this.sort}
        handleSearch={this.search}
        showActions={false}
        tableActionClass="taskList"
        actionItems={this.actionItems()}
        extraPadding={true}
        filterable={true}
        filterItems={this.filterItems()}
        searchPlaceholder="Search..."
        onClick={this.goToTask}
        actionButton={this.getActionButton()}
      />
    );
  }
});

export default TaskList;
