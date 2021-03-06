import ModalMixin from '../mixins/ModalMixin';
import EventVendorAutocomplete from './EventVendorAutocomplete';

var AddVendorModal = React.createClass({
  mixins: [ModalMixin],
  closeAndRefreshData: function() {
    this.closeModal();
    this.props.refreshData();
  },
  renderModalContent: function() {
    return (
      <div className="AddEntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-truck"></i>
          </div>
          <div className="EntityModal-title">
            <h1>
              Add Vendor
            </h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <EventVendorAutocomplete
            onAssociation={this.closeAndRefreshData}
            eventId={this.props.eventId}
          />
        </div>
      </div>
    )
  }
});

export default AddVendorModal;
