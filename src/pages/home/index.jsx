/* eslint-disable no-undef */
import styles from './index.less';

import React from 'react';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import { Spin, TreeSelect } from 'antd';

import { treeData } from './constant';
import china from './china.json';

class Home extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			code: 'china',
			data: china,
			loading: false,
		};
	}

	componentDidMount() {
		this.updateGeo();
	}

	updateGeo = (code = 'china') => {
		this.setState({ loading: true });
		axios.get(`/api/area?code=${code}`).then(response => {
			const data = response.data;
			this.setState({ code, data, loading: false });
		});
	};

	render() {
		const { code, data, loading } = this.state;
		echarts.registerMap(code, data); // 注册地图

		return (
			<div className={styles.home}>
				<TreeSelect
					style={{ width: 300, position: 'absolute', top: 16, right: 16 }}
					dropdownStyle={{ maxHeight: 500 }}
					value={code}
					treeData={treeData}
					placeholder="请选择"
					onChange={code => this.updateGeo(code)}
					treeDefaultExpandedKeys={[code]}
				/>
				{loading ? (
					<div
						style={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Spin />
					</div>
				) : (
					<ReactEcharts
						style={{ height: '100%' }}
						ref={ref => console.log(ref)}
						option={{
							series: [
								{
									type: 'map',
									map: code,
									label: {
										show: true,
										textStyle: {
											color: '#fff',
											opacity: 1,
											backgroundColor: 'rgba(0,23,11,0.5)',
										},
										emphasis: {
											show: true,
										},
									},
									itemStyle: {
										areaColor: '#800', // 地图板块的颜色
										opacity: 0.3, // 图形的不透明度 [ default: 1 ]
										borderWidth: 2, // 描边后可以更清晰的区分每个区域 [ default: 0 ]
										borderColor: '#800', // 图形描边的颜色 [ default: #333 ]
									},
								},
							],
						}}
					/>
				)}
			</div>
		);
	}
}

export default Home;
