var EventsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort,
    InfiniteScrollMixin
  ],
  getInitialState: function() {
    return {
      events: []
    };
  },
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'name_asc'}
    };
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    var params = this.mergeParams();
    Utils.get("/events.json", params, function(result) {
      if (result.events.length == 0) {
        // stop infinite scroll
        this.detachScrollListener();
        return;
      }
      this.setState({
        data: this.state.data.concat(result.events),
        page: this.page
      });
    }.bind(this));
  },
  getCustomRows: function() {
    return this.state.data.map(function(event) {
      return(
        <EventRow
          event={event}
          checkedItems={this.state.checkedItems}
          actionItems={this.actionItems()}
          rowChanged={this.rowChanged}
          key={event.id}
        />
      );
    }, this);
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "start_date", display: "Start Date"}
    ]
  },
  filterItems: function () {
    return [
      {name: "All Events", handler: this.filter.bind(this, {}), default: true},
      {name: "Active Events", handler: this.filter.bind(this, {with_status: 1})},
      {name: "Archived Events", handler: this.filter.bind(this, {with_status: 2})}
    ]
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    Utils.post("/destroy_events", destroyOpts, function(result) {
      this.setState({data: this.spliceResults(this.state.data, deletionIds), checkedItems: []});
      this.toast(deletionIds.length + " events deleted successfully.");
    }.bind(this));
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  handleActionButtonClick: function() {
    location.href = "/events/new";
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.handleActionButtonClick}
                    label='Create Event'
                    svgClass='createEvent'
                    extraPad={true} />
    );
  },
  render: function() {
    return (
      <div className="EventsTableContainer">
        <Table
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
          sortItems={this.sortItems()}
          handleSortClick={this.sort}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={true}
          filterable={true}
          filterItems={this.filterItems()}
          searchPlaceholder="Search Events..."
          actionButton={this.getActionButton()}
          handleCheckAllChanged={this.toggleCheckAll}
        />
      </div>
    );
  }
});
