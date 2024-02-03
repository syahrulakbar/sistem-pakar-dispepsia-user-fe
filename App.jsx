import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, Router} from './src/config';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
