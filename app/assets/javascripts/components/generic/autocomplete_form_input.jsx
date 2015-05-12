var AutocompleteFormInput = React.createClass({
  mixins: [boldAutocompleteItem],
  propTypes: {
    autocompleteSelectedValue: React.PropTypes.objectOf({
      id: React.PropTypes.number,
      name: React.PropTypes.string.isRequired
    }),
    onClickToEdit: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    retrieveData: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,

    itemSelected: React.PropTypes.func,
    autocompleteList: React.PropTypes.array,
    focus: React.PropTypes.bool
  },
  renderAutocompleteListItem: function(item, term) {
    var itemName = this.formatMatchedCharacters(item.name, term);
    var cx = React.addons.classSet;
    var itemClasses = cx({
      'Autocomplete-resultsItem': true,
      'u-italics': item.id == -1
    });
    return (
      <div className={itemClasses}
           dangerouslySetInnerHTML={{__html: itemName}}>
      </div>
    );
  },
  renderSelectedAutocompleteItem: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.props.onClickToEdit}>
        <div className="Autocomplete-pickedName">
          {this.props.autocompleteSelectedValue.name}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.props.retrieveData}
                    itemSelected={this.props.itemSelected}
                    data={this.props.autocompleteList}
                    focus={this.props.focus}
                    renderItem={this.renderAutocompleteListItem}
                    id={this.props.id} />
    );
  },
  render: function() {
    var inputRender = (this.props.autocompleteSelectedValue.name !== '') ? this.renderSelectedAutocompleteItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }

});
