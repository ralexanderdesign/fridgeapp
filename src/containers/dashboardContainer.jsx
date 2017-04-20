import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import { getAppState } from '../actions/init/init';
import SummaryWidget from '../components/summaryWidget';
import ChoresDashboard from './choresDashboardContainer';
import Tasks from './tasksContainer';
import ThemeDefault from '../styles/theme-default';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.style = {
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    };
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });

    this.props.getAppState()
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <RefreshIndicator
          size={200}
          left={-100}
          top={200}
          loadingColor="#26c6da"
          status="loading"
          style={{ marginLeft: '50%' }}
        />
      );
    }
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div className="container-fluid">
          <div className="row">
            <SummaryWidget
              widgetID="chores"
              icon="assignment"
              count={this.props.chores.incomplete.length}
              headerText="Chores to Do"
              linkTo="/chores"
              footerText="Get to Work"
            />
            <SummaryWidget
              widgetID="tasks"
              icon="feedback"
              count={this.props.tasks.incomplete.length}
              headerText="Tasks Left"
              linkTo="/tasks"
              footerText="See All Tasks"
            />
            <SummaryWidget
              widgetID="bills"
              icon="credit_card"
              count={this.props.expenses.length}
              headerText="Bills This Month"
              linkTo="/bills"
              footerText="Pay Your Bills"
            />
            <SummaryWidget
              widgetID="house"
              icon="group"
              count={this.props.house.users.length - 1}
              headerText="Your Roommates"
              linkTo="/house"
              footerText="See Details"
            />
            {/*<Col md={3}>*/}
              {/*<Paper>*/}
                {/*<ChoresDashboard />*/}
              {/*</Paper>*/}
            {/*</Col>*/}
            {/*<Col md={3}>*/}
              {/*<Paper>*/}
                {/*<Tasks />*/}
              {/*</Paper>*/}
            {/*</Col>*/}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ choresReducer, tasksReducer, expensesReducer, houseReducer }) => ({
  chores: choresReducer,
  tasks: tasksReducer,
  expenses: expensesReducer,
  house: houseReducer,
});

export default connect(mapStateToProps, { getAppState })(Dashboard);
