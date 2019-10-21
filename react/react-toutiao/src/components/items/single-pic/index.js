/**
 * @file entry file
 * @author yuanxin
 */
import React, {Component} from 'react';
import {itemFy, clickAble} from '../decorators';

@itemFy(true)
export default class SinglePic extends Component {

	static classes = 'single-pic';

  render() {
		// console.log('props:::', this.props);
		const {title, imageList} = this.props.data;
		return (<React.Fragment>
				<h3>{title}</h3>
				<img src={imageList[0]} />
			</React.Fragment>);
	}
}