var EventTileContainer = React.createClass({
  render: function() {
    alert("test");
    return (
      <div className="EventTileContainer" id="EventApp">
        <EventContactSmallTile />
        <EventTaskSmallTile />
      </div>
    );
  }
});
