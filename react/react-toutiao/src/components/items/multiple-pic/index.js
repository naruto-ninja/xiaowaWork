/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';
import {itemFy, clickAble} from '../decorators';
import style from './style.css';

@itemFy(true)
export default class MultiplePic extends Component {

	static classes = 'multiple-pic';

	render() {
		// console.log('props:::', this.props);
    const {title, imageList} = this.props.data;
    const ImageComponents = imageList.map(image => (<img src={image} />));
		return (<React.Fragment>
				<h3>{title}</h3>
				{/* <ImageComponents /> */}
			</React.Fragment>);
	}
}