import 'antd/dist/antd.css';
import AppRouter from './routes/AppRouter';
import { hot } from "react-hot-loader/root";

const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default hot(App);
