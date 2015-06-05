var EventTaskSmallTile = React.createClass({
  getInitialState: function () {
    return {
      count: null
    };
  },
  componentDidMount: function () {
    $.get("tasks.json", function (results) {
      if (this.isMounted()) {
        this.setState({
          count: results.tasks.length
        })
      }
    }.bind(this))
  },
  render: function () {
    return (
        <div className="Tile">
          <div className="Tile-header">
            <Link to="eventTasks" className="Tile-headerLink">
              <div className="Tile-imgTask"></div>
              <div className="Tile-title">Tasks</div>
            </Link>
          </div>
          <div className="Tile-content">
            <div className="TileContent-quickAdd">

            </div>
            <div className="TileContent-count">
              {this.state.count}
            </div>
            <div className="TileContent-title">
              Tasks
            </div>
          </div>
        </div>
    );
  }
});
