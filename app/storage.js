import Store from 'react-native-fs-store';
import { AsyncStorage } from 'react-native';

let store;

if (__DEV__) {
  store = new Store('default');
} else {
  store = AsyncStorage;
}

export default store;