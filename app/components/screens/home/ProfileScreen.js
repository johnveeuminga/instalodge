import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Text, Content, Icon, Button } from 'native-base';
import { connect } from 'react-redux';

import FullScreenLoader from '../general/FullScreenLoader';
import LogOutButton from '../../auth/LogOutButton';
import material from '../../../../native-base-theme/variables/material';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, horizontal, tintColor}) => {
      return (
        <Icon
          name='md-contact'
          style={{ color: tintColor }}
          vertical={!horizontal}
        />
      );
    },
    header: null,
  }

  constructor (props) {
		super(props);
		this.state = {
			loaderText: '',
      showLoader: false,
    };

  }

  onUpgradePressed () {
    this.props.navigation.navigate('Upgrade');
	}

	navigateToHome () {
		this.toggleLoader();
		this.props.navigation.navigate('Auth');
	}

  toggleLoader () {
		this.setState((prevState) => {
			let text = '';

			if (!prevState.showLoader) {
				text = 'Logging you out';
			}

      return {
				...prevState,
				text,
        showLoader: !prevState.showLoader,
      }
    });
  }

  render () {
    const { user } = this.props;

    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: material.brandPrimary }}>
					<FullScreenLoader 
						text={this.state.loaderText}
						visible={this.state.showLoader}
					/>
					<Image 
            source={{ uri: user.photoURL }}
            style={{ borderRadius: 75, marginBottom: 16, width: 150, height: 150 }}
          />
          <View
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 16 }}
          >
            <Text style={{ color: '#efefef', fontSize: 14 }}>{ user.email }</Text>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 16 }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>{ user.name }</Text>
          </View>
          {
            !user.isHomeowner && 
              <View
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}
              >
                <Button
                  onPress={ () => this.onUpgradePressed() }
                  style={{ backgroundColor: material.brandSecondary }}
                  textStyle={{ fontWeight: 700 }}
                >
                  <Text>Upgrade to Homeowner</Text>
								</Button>
							</View>
					}
					<View style={{ display: 'flex', width: '100%', marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
						<LogOutButton
							afterLogout={() => this.navigateToHome()}	
							beforeLogout={() => this.toggleLoader()}
						/>
					</View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, () => ({}))(ProfileScreen);
