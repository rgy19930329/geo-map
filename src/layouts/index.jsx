import styles from './index.less';
import { Icon } from 'antd';

function BasicLayout(props) {
	return (
		<div className={styles.layout}>
			<h1 className={styles.title}>
				地图{' '}
				<a title="github" href="https://github.com/rgy19930329/geo-map" target="_blank">
					<Icon type="github" />
				</a>
			</h1>
			{props.children}
		</div>
	);
}

export default BasicLayout;
