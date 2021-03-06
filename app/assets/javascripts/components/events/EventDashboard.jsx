import {RouteHandler, Link, State} from 'react-router';
import EventStore from '../../stores/EventStore';
import RouteStore from '../../stores/RouteStore';
import EventActions from '../../actions/EventActions';
import PageTitleActions from '../../actions/PageTitleActions';
import Event from './Event';
import classNames from 'classnames';

var EventDashboard = React.createClass({
  mixins: [State],
  getInitialState: function() {
    return {
      event: null,
      collapse: false
    };
  },
  navItems: function() {
    return [
      {to: "event_tasks", title: 'tasks', iconClass: "fa fa-check"},
      {to: "event_contacts", title: 'contacts', iconClass: "fa fa-book"},
      {to: "event_vendors", title: 'vendors', iconClass: "fa fa-truck"},
      {to: "event_budget", title: 'budget', iconClass: "fa fa-money"},
      {to: "event_attachments", title: 'attachments', iconClass: "fa fa-paperclip"},
      {to: "event_comments", title: 'comments', iconClass: "fa fa-comments"}
    ]
  },
  componentDidMount: function() {
    EventStore.addChangeListener(this._onEventChange);
    let id = this.props.params.id;
    let event = EventStore.get(id);
    PageTitleActions.setPageTitle(event && event.name, false);
    if (event) this.setState({event: event});
    else EventActions.get(id);
  },
  componentWillUnmount() {
    EventStore.removeChangeListener(this._onEventChange);
  },
  _onEventChange() {
    let event = EventStore.get(this.props.params.id);
    PageTitleActions.setPageTitle(event.name, false);
    this.setState({event: event});
  },
  getNavTitle() {
    let header = "";
    switch(true) {
      case this.isActive('event_app'):
        header = "";
        break;
      case this.isActive('event_tasks'):
        header = "Tasks";
        break;
      case this.isActive('event_contacts'):
        header = "Contacts";
        break;
      case this.isActive('event_vendors'):
        header = "Vendors";
        break;
      case this.isActive('event_budget'):
        header = "Budget";
        break;
      case this.isActive('event_attachments'):
        header = "Attachments";
        break;
      case this.isActive('event_comments'):
        header = "Comments";
        break;
      default:
    }
    return header;
  },
  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  },
  renderNavBar() {
    let event = this.state.event;
    let navItems = this.navItems().map((item) => {
      return (
        <Link to={item.to} params={{id: event && event.id || 0}} className="NavIconWithName" key={item.title}>
          <i className={item.iconClass + " Nav-icon"}></i>
          <div className="Nav-name">{item.title}</div>
        </Link>
      );
    });
    let toggleClasses = classNames({
      'toggleIcon': true,
      'fa': true,
      'fa-caret-up': !this.state.collapse,
      'fa-caret-down': this.state.collapse
    });
    return (
      <div className="EventDashboard-navContainer">
        <div className="EventApp-nav">
          <Link to='event_app' params={{id: event && event.id || 0}} className="NavIconWithName home">
            <i className="fa fa-th Nav-icon"></i>
          </Link>
          <div className="EventApp-title">
            {this.getNavTitle()}
          </div>
          <div className="EventApp-navItemContainer">
            <div className="EventApp-navItems">
              {navItems}
            </div>
          </div>
          <div className="EventApp-navToggle" onClick={this.toggleCollapse}>
            <i className={toggleClasses}></i>
          </div>
        </div>
      </div>
    );
  },
  render: function() {
    let event = this.state.event;
    let eventClasses = classNames({
      'EventDashboard-event': true,
      'collapse': this.state.collapse
    });
    return (
      <div className="EventDashboardContainer" id="mainDashboard">
        <div className={eventClasses}>
          <Event model={event || {}} />
        </div>
        {this.renderNavBar()}
        <div className="EventDashboard-router">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

export default EventDashboard;
