var EventFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      itemName: null,
      itemDataArray: []
    };
  },
  setItem: function(id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({itemName: name});
      } else {
        this.setValue(null);
        this.setState({itemName: null});
      }
    }
  },
  searchAsync: function(term) {
    $.get("/search_events", {search: {text: term || ""}}, function(result) {
      var itemDataArray = result.events || [];
      if (itemDataArray.length == 0) {
        itemDataArray.push(AutocompleteRenderNew.getNewItem("event"));
      }
      if (this.isMounted()) {
        this.setState({itemDataArray: itemDataArray});
      }
    }.bind(this));
  },
  retrieveItemAndSetItemAsync: function(id) {
    $.get("/events/" + id + ".json", function(result) {
      var item = result.event;
      this.setItem(item.id, item.name);
    }.bind(this));
  },
  quickCreateItemAndSetItemAsync: function(term) {
    var payload = {event: {name: term}};
    $.post("/events.json", payload, function(result) {
      var item = result.event;
      this.setItem(item.id, item.name);
    }.bind(this))
  },
  render: function() {
    return (
      <FormInputAutocomplete id={this.props.id}
                             label={this.props.label}
                             name={this.props.name}
                             value={this.props.value}
                             itemDataArray={this.state.itemDataArray}
                             itemName={this.state.itemName}
                             setItem={this.setItem}
                             retrieveItemAndSetItem={this.retrieveItemAndSetItemAsync}
                             retrieveAutocompleteData={this.searchAsync}
                             quickCreateItemAndSetItem={this.quickCreateItemAndSetItemAsync}
        />
    );
  }
});
