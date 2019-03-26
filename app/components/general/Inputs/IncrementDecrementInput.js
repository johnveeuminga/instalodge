import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
} from 'react-native';
import { Text, Button, Icon } from 'native-base';

export default class IncrementDecrementInput extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: this.props.value || 0,
    };
  }

  async incrementValue () {
    await this.setState((prevState) => {
      if (prevState.value === this.props.maximumVal) {
        console.log('Add');
        return prevState
      }
      return {
        value: prevState.value + 1,
      }
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  async decrementValue () {
    
    await this.setState((prevState) => {
      if (prevState.value === 0) return prevState;
      return {
        value: prevState.value - 1,
      }
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  render () {
    const { label } = this.props
    return (
      <View style={styles.container}>
        <Text>
          { label }
        </Text>
        <View
          style={styles.buttonContainer}
        >
          <Button 
            transparent
            onPress={() => this.incrementValue()}
            style={{ ...styles.button, ...styles.buttonMargin}}
          >
            <Icon
              style={styles.buttonIcon}            
              name='add'
            />
          </Button>
          <Text style={styles.buttonMargin}>{ this.state.value }</Text>
          <Button 
            transparent
            onPress={() => this.decrementValue()}
            style={{ ...styles.button}}
          >
            <Icon
              style={styles.buttonIcon}
              name='remove'
            />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    width: 30,
    height: 30,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
  },
  buttonMargin: {
    marginRight: 16
  },
  buttonIcon: {
    color: '#000',
    marginLeft: 0,
    marginRight: 0,
  },
});
