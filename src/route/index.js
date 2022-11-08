import {Home, Character} from '../pages';
import {
    createBrowserRouter,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: `/character/:id`,
        element: <Character />
    }
])

export default router;