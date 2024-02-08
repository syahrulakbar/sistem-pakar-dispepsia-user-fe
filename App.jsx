import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, Router} from './src/config';
import {ToastProvider} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        successColor="white"
        textStyle={{color: 'black', fontSize: 16}}
        dangerColor="white"
        warningColor="white"
        successIcon={
          <Icon
            name="checkmark-circle-sharp"
            size={20}
            style={{color: 'green'}}
          />
        }
        dangerIcon={
          <Icon name="close-circle-sharp" size={20} style={{color: 'red'}} />
        }
        warningIcon={
          <Icon name="warning" size={20} style={{color: 'yellow'}} />
        }>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
};

export default App;
