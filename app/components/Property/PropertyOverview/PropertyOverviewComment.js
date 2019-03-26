import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Text, Icon } from 'native-base';
import material from '../../../../native-base-theme/variables/material';
import { getUserFromUID } from '../../../lib/user'

class PropertyOverviewComment extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
    }
  }

  componentDidMount () {
    this.getUserDetails();
  }

  async getUserDetails () {
    const { comment } = this.props;
    const user = await getUserFromUID(comment.user_id);

    this.setState((prevState) => {
      return {
        ...prevState,
        user,
      }
    });
  }

  render () {
    const { comment } = this.props;
    const { user } = this.state;
    return (
      <View
        style={styles.container}
      >
        {
          user && 
          <View>
            <View
              style={styles.userDetails}
            >
              <Image 
                source={{ uri: user.photoURL }}
                resizeMode={'cover'}
                style={{ width: 32, height: 32, borderRadius: 32 }}
              />
              <View
                style={{ marginBottom: 12 }}
              >
                <Text style={{ ...styles.userDetailsText, ...styles.userDetailsText }}>{ user.name }</Text>
                <Text style={ styles.userDetailsText}>{ comment.date }</Text>
                {
                  <View style={{ flexDirection: 'row' }}>
                  {
                    [...Array(Math.floor(comment.rating))].map((_, index) => (
                      <Icon
                        name='star'
                        style={{ 
                          color: material.brandSecondary,
                          fontSize: 16,
                          marginRight: 0,
                          width: null,
                        }}
                        key={ index }
                      />
                    )
                  ) }
                </View>
                }
              </View>
            </View>
            <View>
              <Text>{ comment.comment }</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    marginLeft: 5,
  },
  userDetailsText: {
    fontSize: 12,
  },
  userName: {
    fontWeight: '700',
  },
});

export default PropertyOverviewComment;
