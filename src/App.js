import React from 'react';

import PropTypes from 'prop-types';
import DatePicker from 'components/DatePicker.jsx';

export default class App extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DatePicker />
      </div>
    );
  }
}