import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import BallotStore from '../../stores/BallotStore';
import BallotItem from '../../components/Ballot/BallotItem';
import BallotActions from '../../actions/BallotActions';

export default class Ballot extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    BallotStore.initialize( function(ballot_list){
      if (ballot_list.length === 0){
        this.props.history.push('settings/location');
      } else {
        this.setState({ballot_list});
      }
    }.bind(this));
  }

  render () {
    var { ballot_list } = this.state;

    return (<div className="ballot-list">
      {
        ballot_list ? ballot_list
          .map( item =>
            <BallotItem key={item.we_vote_id} {...item} />
          ) : (
            <div className="box-loader">
              <i className="fa fa-spinner fa-pulse"></i>
              <p>Loading ... One Moment</p>
            </div>
          )
      }
    </div>);
  }
}
