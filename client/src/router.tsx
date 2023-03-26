import {
    createBrowserRouter
} from "react-router-dom";
import App from './App';
import Login from "./Login";

const router = createBrowserRouter([
    {
        path: '/app',
        element: <App/>
    },
    {
        path: '/',
        element: <Login/>
    }
]);

export default router;