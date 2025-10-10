import { useSelector } from 'react-redux';
import { ShareLoginState } from '../context/RegisSlice';
import LoginScreen from './LoginScreen';
import TodoListScreen from './TodoListScreen';

const HomeScreen = () => {
  const isLoggedIn = useSelector(ShareLoginState);

  return <>{isLoggedIn ? <TodoListScreen /> : <LoginScreen />}</>;
};

export default HomeScreen;
