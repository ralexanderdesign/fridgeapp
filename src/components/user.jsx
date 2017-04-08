import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/profile/profile.js';
import axios from 'axios';

class Form extends Component {

  OnSubmit(field, data) {
    this.props.updateProfile(field, data);
    this.refs.newData.placeholder = this.refs.newData.value;
    // "/api/users/1"
  }

  profileSubmit(id, field, add) {
    axios.put('/api/users/', {
      key: field,
      value: add,
      id,
    },
  );
  }
  // componentWillMount() {
  //   axios.get('/api/users/1')
  //   .then(data => {
  //     //console.log(data)
  //     this.setState(data)
  //     console.log("STATE",this.state)
  //   })
  // }

  render() {
    return (
      <form>
        <label>
          <div className="formField">{this.props.field}</div>
        </label><br />
        <input
          className={this.props.dbField}
          ref='newData'
          type="text"
          placeholder={this.props.data}
          autoFocus="true"
        />
        <button
          className={this.props.dbField} onClick={() => {
            this.OnSubmit(this.profileSubmit(1, this.props.dbField, this.refs.newData.value));}} type="Submit">Edit</button>
        <br />
      </form>);
  }
}

Form.propTypes = {
  profileSubmit: React.PropTypes.func,
  OnSubmit: React.PropTypes.func,
  updateProfile: React.PropTypes.func,
  field: React.PropTypes.string,
  data: React.PropTypes.string,
  dbField: React.PropTypes.string,
};

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer,
});

export default connect(
  mapStateToProps,
  {
    updateProfile,
  },
)(Form);
