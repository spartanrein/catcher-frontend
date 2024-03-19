import {
    createBrowserRouter,
    Navigate
} from "react-router-dom"
import App from "../App"
import TopScores from "../pages/TopScores"
import CatcherGame from "../pages/CatcherGame"
import Error from "../pages/Error"

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement:<Error/>
    },
    {
        path:'/leaderboard',
        element: <TopScores/>
    },
    {
        path:'/game',
        element: <CatcherGame/>,
    },
    {
        path: '*',
        element:<Navigate to='/'/>
    }
])

export default router
