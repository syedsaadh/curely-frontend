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

import './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
moment.updateLocale('en-us', {
  week: {
    dow: 1, // Saturday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});
moment.locale('en-us');
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
class CalendarPage extends React.Component {
  state = {
    current_date: moment(),
    current_view: 'week',
    toolbarLabel: '',
  };
  componentWillMount() {
    this.updateTimes(this.state.current_date, this.state.current_view);
    this.props.fetchAll();
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
    console.log(event);
    this.props.openModal('AppointmentEdit', {
      data: event.appointment,
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
  };
  moveEvent = ({ event, start, end }) => {
    console.log(event, start, end);
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
  popOverContent = event => (
    <div className="popover-event-content">
      <Button size="small" icon="edit" onClick={() => this.onSelectEvent(event.event)} />
    </div>
  );
  renderToolbar = (toolbar) => {
    this.toolbar = toolbar;
    return null;
  };

  render() {
    const { current_view, toolbarLabel } = this.state;
    const events = [];
    const { lists } = this.props;
    each(lists, item =>
      events.push({
        id: item.id,
        title: item.patient.name,
        start: moment(item.scheduled_from).toDate(),
        end: moment(item.scheduled_to).toDate(),
        appointment: item,
      }));
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
                      overlayClassName="pop-overlay-class"
                      content={this.popOverContent(event)}
                      placement="right"
                      title={event.title}
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
});
const mapDispatchToProps = dispatch => ({
  openModal: (type, props) => dispatch(openModal(type, props)),
  fetchWithDoctor: () => dispatch(fetchWithDoctor()),
  fetchAll: () => dispatch(fetchAll()),
});

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));
