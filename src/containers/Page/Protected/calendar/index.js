import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, DatePicker, Popover, Radio } from 'antd';
import BigCalendar from 'react-big-calendar';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { each } from 'lodash';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { openModal } from '../../../../redux/App/actions';
import { fetchWithDoctor } from '../../../../redux/Departments/actions';
import { fetchAll } from '../../../../redux/Appointments/actions';
import { Spinner, Space } from '../../../../components/ui-components';
import './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
moment.updateLocale('en', {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
});
BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
class CalendarPage extends React.Component {
  state = {
    current_date: moment(),
    current_view: 'week',
    toolbarLabel: '',
  };
  componentWillMount() {
    this.updateTimes(this.state.current_date, this.state.current_view);
    this.props.fetchAll(
      moment()
        .startOf('isoWeek')
        .format('DD-MM-YYYY'),
      moment()
        .add(7, 'days')
        .format('DD-MM-YYYY'),
    );
  }

  componentDidMount() {
    this.props.fetchWithDoctor();
  }

  onView = (view) => {
    this.setState({
      current_view: view,
    });
    this.updateTimes(this.state.current_date, view);
  };
  onSelectEvent = (event) => {
    this.props.openModal('AppointmentEdit', {
      data: event.appointment,
      startDateTime: event.start,
    });
  };
  onSelectSlot = (slotInfo) => {
    this.props.openModal('AppointmentAdd', {
      startDateTime: slotInfo.start,
      endDateTime: slotInfo.end,
    });
  };
  onNavigate = (date, view) => {
    const newDate = moment(date);
    this.setState({
      current_date: newDate,
    });
    this.updateTimes(newDate, view);
    if (view === 'month') {
      this.props.fetchAll(
        newDate.startOf('month').format('DD-MM-YYYY'),
        newDate.endOf('month').format('DD-MM-YYYY'),
      );
    } else {
      this.props.fetchAll(
        newDate.startOf('isoWeek').format('DD-MM-YYYY'),
        newDate.endOf('isoWeek').format('DD-MM-YYYY'),
      );
    }
  };
  onCancel = (event) => {
    this.props.openModal('AppointmentCancel', {
      data: event.appointment,
      start: event.start,
    });
  };
  onDelete = (event) => {
    this.props.openModal('AppointmentDelete', {
      data: event.appointment,
      start: event.start,
    });
  };
  moveEvent = ({ event, start, end }) => {
    this.props.openModal('AppointmentReschedule', {
      data: event.appointment,
      start,
      end,
    });
  };

  updateTimes(date = this.state.current_date, view = this.state.current_view) {
    let start;
    let label;
    let end;
    // if view is day: from moment(date).startOf('day') to moment(date).endOf('day');
    if (view === 'day') {
      start = moment(date).startOf('day');
      end = moment(date).endOf('day');
      label = start.format('ddd MMM DD');
    } else if (view === 'week') {
      start = moment(date).startOf('isoWeek');
      end = moment(date).endOf('isoWeek');
      label = `${start.format('DD MMM YY')} - ${end.format('DD MMM YY')}`;
    } else if (view === 'month') {
      start = moment(date)
        .startOf('month')
        .subtract(7, 'days');
      end = moment(date)
        .endOf('month')
        .add(7, 'days');
      label = `${moment(date).format('MMM YY')}`;
    } else if (view === 'agenda') {
      start = moment(date).startOf('day');
      end = moment(date)
        .endOf('day')
        .add(1, 'month');
      label = `${start.format('DD MMM YY')} - ${end.format('DD MMM YY')}`;
    }
    this.setState({
      toolbarLabel: label,
    });
  }

  changeCalendarView = (type) => {
    this.toolbar.onViewChange(type);
  };
  popOverContent = (event) => {
    const { appointment } = event;
    const { patient } = appointment;
    if (!patient) return null;
    return (
      <div className="popover-event-content">
        <div className="patient-popover-card">
          <div className="main-content">
            <div className="body-2">{appointment.patient.name}</div>
            <div className="body-1">P{appointment.patient.id}</div>
            <Space h={8} />
            <div className="body-1">
              <i className="ion-android-call" /> &nbsp;{' '}
              {patient.mobile ? patient.mobile : 'Not Available'}
            </div>
            <div className="body-1">
              <i className="ion-android-mail" /> &nbsp;{' '}
              {patient.email ? patient.email : 'Not Available'}
            </div>
          </div>
          <div className="footer">
            <Button size="small" onClick={() => this.onSelectEvent(event)}>
              {appointment.cancelled ? 'Reschedule' : 'Edit'}
            </Button>

            {appointment.cancelled ? (
              <Button size="small" type="danger" onClick={() => this.onDelete(event)}>
                Delete
              </Button>
            ) : (
              <Button size="small" type="danger" onClick={() => this.onCancel(event)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };
  renderToolbar = (toolbar) => {
    this.toolbar = toolbar;
    return null;
  };

  render() {
    const { current_view, toolbarLabel } = this.state;
    const events = [];
    const { lists, loading } = this.props;
    each(lists, (item) => {
      let title = item.patient.name;
      if (item.cancelled) title = <strike>{item.patient.name}</strike>;
      events.push({
        id: item.id,
        title,
        start: moment(item.scheduled_from).toDate(),
        end: moment(item.scheduled_to).toDate(),
        appointment: item,
      });
    });
    return (
      <div className="calendar-page">
        <div className="calendar-page__header">
          <div className="left">
            <div className="page-heading">Calendar</div>
          </div>
          <div className="center">
            <div className="calendar-date-range-select">
              <Button
                style={{ cursor: 'pointer', marginRight: 16 }}
                onClick={() => this.toolbar.onNavigate('PREV')}
              >
                <i className="ion-chevron-left" />
              </Button>
              <span>{toolbarLabel}</span>
              <Button
                style={{ cursor: 'pointer', marginLeft: 16 }}
                onClick={() => this.toolbar.onNavigate('NEXT')}
              >
                <i className="ion-chevron-right" />
              </Button>
            </div>
          </div>
          <div className="right">
            <Button style={{ marginRight: 8 }} onClick={() => this.toolbar.onNavigate('TODAY')}>
              Today
            </Button>
            <RadioGroup
              className="tab-radio-group"
              defaultValue="week"
              size="middle"
              onChange={e => this.changeCalendarView(e.target.value)}
            >
              <RadioButton value="day">Day</RadioButton>
              <RadioButton value="week">Week</RadioButton>
              <RadioButton value="month">Month</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div className="calendar-page__body">
          <div className="__sidebar-left" />
          <div className="__calendar-wrapper">
            <Spinner spinning={loading} />
            <DragAndDropCalendar
              defaultView={current_view}
              selectable
              onEventDrop={this.moveEvent}
              events={events}
              step={15}
              timeslots={1}
              formats={{
                dayFormat: (date, culture, localizer) =>
                  localizer.format(date, 'ddd DD MMM', culture),
              }}
              onNavigate={this.onNavigate}
              onView={this.onView}
              defaultDate={new Date()}
              onSelectEvent={this.onSelectEvent}
              onSelectSlot={this.onSelectSlot}
              components={{
                toolbar: this.renderToolbar,
                week: {
                  event: event => (
                    <Popover
                      openClassName="pop-open-class"
                      overlayClassName="popup-overlay--patient-info"
                      content={this.popOverContent(event.event)}
                      placement="right"
                    >
                      <div style={{ width: '100%', height: '100%' }}>{event.title}</div>
                    </Popover>
                  ),
                },
              }}
            />
          </div>
          <div className="__sidebar-right" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Appointments,
  loading: state.Appointments.isFetching,
});
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchWithDoctor: () => dispatch(fetchWithDoctor()),
  fetchAll: (fromDate, toDate) => dispatch(fetchAll(fromDate, toDate)),
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));
