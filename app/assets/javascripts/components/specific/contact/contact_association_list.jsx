var ContactAssociationList = React.createClass({
  propTypes: {
    associated: React.PropTypes.bool.isRequired,
    associatedObjectId: React.PropTypes.string.isRequired,
    onSuccessCallback: React.PropTypes.func.isRequired
  },
  render: function () {
    var createItem = function (item, index, isAssociated, associatedObjectId, onSuccessCallback, url) {
      if (isAssociated) {
        return <li key={index} value={item.id}>{item.name} [{item.email}]
        <EventAssociationAddRemoveLinkAsync 
          url={url} 
          onSuccessCallback={onSuccessCallback} 
          text='Remove' 
          type='delete'/>
        </li>;
      }
      else{
        return <li key={index} value={item.id}>{item.name} [{item.email}]
        <EventAssociationAddRemoveLinkAsync 
          url={url}
          onSuccessCallback={onSuccessCallback} 
          text='Add' 
          type='post'/></li>;  
      }
    };
    return <ul>{this.props.items.map(function (value, index) { 
      var url = "/event_contacts?contact_id=" + value.id + "&event_id=" + this.props.associatedObjectId;
      return createItem(value, index, !!this.props.associated, this.props.associatedObjectId, this.props.onSuccessCallback, url); 
    }, this)}</ul>;
  }

});
