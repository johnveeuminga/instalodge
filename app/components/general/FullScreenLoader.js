import React, { Component } from 'react';
import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import material from '../../../native-base-theme/variables/material';

export default class FullScreenLoader extends Component {
  render () {
    const { text, visible } = this.props;
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={visible}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalMainContent}>
            <ActivityIndicator 
              color={material.brandSecondary}
              size={'large'}
            />
            <Text style={styles.modalText}>{ text }</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    color: '#fff',
  },
  modalText :{
    color: '#000',
  },
  modalMainContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});