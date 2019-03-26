import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';

import { logout } from '../../auth';
import { LOGOUT } from '../../constants/actionTypes';

class LogOutButton extends Component {
	async onLogoutPress () {
		this.props.beforeLogout();
		await logout();
		this.props.logoutAction();
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

const mapDispatchToProps = dispatch => ({
	logoutAction: () => {
		dispatch({ type: LOGOUT });
	}
})

export default connect(() => ({}), mapDispatchToProps)(LogOutButton);

