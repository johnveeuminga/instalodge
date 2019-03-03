import React, { Component } from 'react';
import { Button, Text } from 'native-base';

import { logout } from '../../auth';

export default class LogOutButton extends Component {
	async onLogoutPress () {
		this.props.beforeLogout();
		await logout();
		this.props.afterLogout();
	}

	render () {
		return (
			<Button 
				danger
				onPress={() => this.onLogoutPress()}
			>
				<Text>Logout</Text>
			</Button>
		);
	}
}

