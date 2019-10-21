/**
 * @file entry file
 * @author yuanxin
 */
import React, {Component} from 'react';
import style from './setting.css';
import TabContext from './tab-context';
import { connect } from 'react-redux';

class Set extends Component {

	static contextType = TabContext;

	render() {
    // console.log('state-in-setting', this.props.list);
		return (<div className="setting">
				{this.context.map(tab => {
					return <li>{tab.name}</li>
				})}
			</div>);
	}
}

const Setting = connect(
  state => ({
    list: state.list
  }),
  dispatch => {}
)(Set);

export default Setting;