/**
 * @file entry file
 * @author yuanxin
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import Tab from './tab';
import * as components from './components/items';
import TabContext from './tab-context';
import store from './store';
import { Provider, connect } from 'react-redux';
// import { Provider, connect } from './fake-react-redux';

const TABS = [
	{
		id: '__all__',
		name: '推荐'
	},
	{
		id: 'video',
		name: '视频'
	}
];

const ALL_TAB = [
	{
		id: '__all__',
		name: '推荐'
	},
	{
		id: 'video',
		name: '视频'
	},
	{
		id: 'sport',
		name: '体育'
	},
	{
		id: 'history',
		name: '历史'
	}
];

class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			list: [],
			showSetting: false
		};

		this.getList()
			.then(({data}) => {
				this.setState({
					list: data
				});
      });
    this.reactiveList();
	}

	getList() {
		return fetch('http://localhost:9000/list')
			.then(res => res.json());
  }
  
  updateList(dispatch) {

    // applymiddleware
    // return this.getList()
    //   .then(({data}) => {
    //       return {
    //         type: 'PUSH_LIST',
    //         data
    //       };
    //   });

      // thunk
       return this.getList()
       .then(({data}) => {
           return dispatch({
             type: 'PUSH_LIST',
             data
           });
       });
  }

  reactiveList() {
    // store.subscribe(() => {
    //   this.setState({
    //     list: store.getState().list
    //   })
    // })

    // this.updateList()
    //   .then(data => {
    //     // store.dispatch({
    //     //   type: 'PUSH_LIST',
    //     //   data
    //     // })
    //     this.props.listUpdate(data)
    //   });
    this.props.listUpdate(this.updateList.bind(this))
    window.onscroll = () => {
      // this.updateList()
      //   .then(data => {
      //     this.props.listUpdate(data)
      //   });
      this.props.listUpdate(this.updateList.bind(this))
    }
  }

	render() {
		return (<div className="container">
				<TabContext.Provider value={ALL_TAB}>
					<Tab tabs={TABS}></Tab>
					<List
						dataSource={this.state.list}
						renderItem={item => {
							const type = item.type.replace(/^\w/, code => code.toUpperCase());
							const ItemComponent = components[type];
							return <ItemComponent
									onClick={this.skip}
									data={item.data}
								/>;
						}}
					/>
				</TabContext.Provider>
			</div>);
	}

	skip() {
		console.log('开始跳转!');
	}

}

const App = connect(
  function mapStateToProps(state) {
      return {
        list: state.list
      }
  },
  function mapDispatchToProps(dispatch) {
    return {
      listUpdate: task => {
        // dispatch({
        //   type: "PUSH_LIST",
        //   data
        // })

        // applymiddleware
        dispatch(task);
      }
    }
  }
  // state => ({
  //   list: state.list
  // }),
  // dispatch => {
  //   return {
  //     listUpdate: task => {
  //       // dispatch({
  //       //   type: "PUSH_LIST",
  //       //   data
  //       // })

  //       // applymiddleware
  //       dispatch(task);
  //     }
  //   }
  // }
)(Main);

ReactDOM.render(
  <Provider store={store}>
    	<App />
  </Provider>,
	document.getElementById('app')
);