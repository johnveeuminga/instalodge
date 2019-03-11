import React from 'react';
import { 
  View, 
  StyleSheet  
} from 'react-native';
import { 
  Icon, 
  Item, 
  Input 
} from 'native-base';

const PropertySearchBox = ({ currentRefinement, refine }) => (
  <View 
    style={styles.searchBox}
  >
    <Item 
      last
      style={{ borderBottomWidth: 0, }}
    >
      <Icon 
        name={'search'}
      />
      <Input 
        style={{ height: null }} 
        placeholder={'Search for a property'}
        value={ currentRefinement }
        onChangeText={ text => refine(text) }
      />
    </Item>
  </View>
)

const styles = StyleSheet.create({
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowColor: '#000',
    shadowRadius: 1.5,
    elevation: 1.5,
    borderRadius: 2,
    borderTopWidth: 0.3333333333333333,
    borderLeftWidth: 0.3333333333333333,
    borderBottomWidth: 0.3333333333333333,
    borderRightWidth: 0.3333333333333333,
    borderColor: '#ccc',
  },
  searchboxText: {
    color: '#000',
  },
  icon: {
    color:'#000',
    marginRight: 15,
    opacity: .5,
  },
});

export default PropertySearchBox;
