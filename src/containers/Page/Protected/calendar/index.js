import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, DatePicker, Radio } from 'antd';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
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
class CalendarPage extends React.Component {
  state = {
    current_date: moment(),
    current_view: 'week',
    toolbar_label: '',
  };
  componentWillMount() {
    this.updateTimes(this.state.current_date, this.state.current_view);
  }
  changeCalendarView = (type) => {
    this.toolbar.onViewChange(type);
  };
  onView = (view) => {
    this.setState({
      current_view: view,
    });
    this.updateTimes(this.state.current_date, view);
  };
  onNavigate = (date, view) => {
    const new_date = moment(date);
    this.setState({
      current_date: new_date,
    });

    this.updateTimes(new_date, view);
  };
  renderToolbar = (toolbar) => {
    console.log(toolbar);
    this.toolbar = toolbar;
    return null;
  };
  updateTimes(date = this.state.current_date, view = this.state.current_view) {
    let start,
      label,
      end;
    // if view is day: from moment(date).startOf('day') to moment(date).endOf('day');
    if (view === 'day') {
      start = moment(date).startOf('day');
      end = moment(date).endOf('day');
      label = start.format('ddd MMM DD');
    } else if (view === 'week') {
      // if view is week: from moment(date).startOf('isoWeek') to moment(date).endOf('isoWeek');
      start = moment(date).startOf('isoWeek');
      end = moment(date).endOf('isoWeek');
      label = `${start.format('DD MMM YY')} - ${end.format('DD MMM YY')}`;
    } else if (view === 'month') {
      // if view is month: from moment(date).startOf('month').subtract(7, 'days') to moment(date).endOf('month').add(7, 'days'); i do additional 7 days math because you can see adjacent weeks on month view (that is the way how i generate my recurrent events for the Big Calendar, but if you need only start-end of month - just remove that math);
      start = moment(date)
        .startOf('month')
        .subtract(7, 'days');
      end = moment(date)
        .endOf('month')
        .add(7, 'days');
      label = `${moment(date).format('MMM YY')}`;
    } else if (view === 'agenda') {
      // if view is agenda: from moment(date).startOf('day') to moment(date).endOf('day').add(1, 'month');
      start = moment(date).startOf('day');
      end = moment(date)
        .endOf('day')
        .add(1, 'month');
      label = `${start.format('DD MMM YY')} - ${end.format('DD MMM YY')}`;
    }
    this.setState({
      toolbar_label: label,
    });
    console.log(start.date(), end.date());
  }
  render() {
    const { current_view, toolbar_label } = this.state;
    return (
      <div className="calendar-page">
        <div className="calendar-page__header">
          <div className="left">
            <div className="page-heading">Calendar</div>
          </div>
          <div className="center">
            <div className="calendar-date-range-select">
              <span
                style={{ cursor: 'pointer', paddingRight: 16 }}
                onClick={() => this.toolbar.onNavigate('PREV')}
              >
                <i className="ion-chevron-left" />
              </span>
              {/* <DatePicker
                className="calendar-date-range-picker"
                format="DD MMM YY"
                defaultValue={moment()}
                allowClear={false}
                onChange={date => this.toolbar.onNavigate(null, date.toDate())}
              /> */}
              <span>{toolbar_label}</span>
              <span
                style={{ cursor: 'pointer', paddingLeft: 16 }}
                onClick={() => this.toolbar.onNavigate('NEXT')}
              >
                <i className="ion-chevron-right" />
              </span>
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
            <BigCalendar
              defaultView={current_view}
              selectable
              events={[]}
              step={15}
              timeslots={1}
              formats={{
                dayFormat: (date, culture, localizer) =>
                  localizer.format(date, 'ddd DD MMM', culture),
              }}
              onNavigate={this.onNavigate}
              onView={this.onView}
              defaultDate={new Date()}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={slotInfo =>
                alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    `\nend: ${slotInfo.end.toLocaleString()}` +
                    `\naction: ${slotInfo.action}`)
              }
              components={{
                toolbar: this.renderToolbar,
              }}
            />
          </div>
          <div className="__sidebar-right" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
