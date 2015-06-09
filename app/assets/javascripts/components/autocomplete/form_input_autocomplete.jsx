var FormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    retrieveItemAndSetItem: React.PropTypes.func.isRequired,

  },
  getInitialState: function () {
    return {
      isItemSelected: false,
      itemName: null,
      itemDataArray: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function () {
    var itemId = this.props.value || null;
    if (itemId) {
      this.retrieveItemAndSetItem(itemId);
    }
  },
  searchForAutocompleteData: function (term) {
    this.searchVendorsAsync(term);
  },
  onItemSelected: function (item, term) {
    if (item.id == -1) {
      this.quickCreateItemAndSetItem({vendor: {name: term}});
    }
    else {
      this.setItem(item.id, item.name);
    }
  },
  setItem: function (id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isItemSelected: true, itemName: name});
      } else {
        this.setValue(null);
        this.setState({isItemSelected: false, itemName: null});
      }
    }
  },





  retrieveItemAndSetItem: function (itemId) {
    this.retrieveVendorAsyncAndSetItem(itemId);
  },

  retrieveVendorAsyncAndSetItem: function (id) {
    $.get("/vendors/" + id + ".json", function (result) {
      var item = result.vendor;
      this.setItem(item.id, item.name);
    }.bind(this));
  },
  searchVendorsAsync: function (term) {
    $.post("/vendors/search", {search: {text: term || ""}}, function (result) {
      console.log(result);
      var itemDataArray = result.vendors || [];
      console.log(itemDataArray);
      if (itemDataArray.length == 0) {
        //TODO: what is getNewItem ??
        itemDataArray.push(this.getNewItem("vendor"));
      }
      if (this.isMounted()) {
        this.setState({itemDataArray: itemDataArray});
      }
    }.bind(this));
  },
  quickCreateItemAndSetItem: function (payload) {
    $.post("/vendors.json", payload, function (result) {
      var item = result.vendor;
      this.setItem(item.id, item.name);
    }.bind(this))
  },





  onAutocompleteEditButtonClick: function () {
    var newState = this.getInitialState();
    newState.focus = true;
    if (this.isMounted()){
      this.setState(newState);
    }
  },
  renderAutocomplete: function () {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.searchForAutocompleteData}
                    itemSelected={this.onItemSelected}
                    data={this.state.itemDataArray}
                    focus={this.state.focus}
                    renderItem={this.renderItem}/>
    );
  },
  renderSelectedVendor: function () {
    return (
      <div className="Autocomplete-picked" onClick={this.onAutocompleteEditButtonClick}>
        <div className="Autocomplete-pickedName">
          {this.state.itemName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function () {
    var inputRender = this.state.isItemSelected ? this.renderSelectedVendor() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});