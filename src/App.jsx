import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import AppLayout from "./layouts/appLayout"
import LandingPage from "./pages/landingPage"
import Onboarding from "./pages/onboarding"
import AppliedJobs from "./pages/appliedJobs"
import JobPage from "./pages/job"
import JobsListing from "./pages/jobsListing"
import SavedJobs from "./pages/savedJobs"
import PostJob from "./pages/postJob"
import MyJobs from "./pages/myJobs"
 
import "./App.css"
import ProtectedRoute from "./components/ui/protectedRoute"



const router = createBrowserRouter([
  {  element:  <AppLayout />,
     children: [
       {path: "/", element: <LandingPage />},
       {path: "/onboarding", element: (<ProtectedRoute><Onboarding /></ProtectedRoute>)},
       {path: "/appliedJobs", element: (<ProtectedRoute><AppliedJobs /></ProtectedRoute>)},
       {path: "/job/:id", element: (<ProtectedRoute><JobPage /></ProtectedRoute>)},
       {path: "/jobs", element: (<ProtectedRoute><JobsListing /></ProtectedRoute>)},
       {path: "/savedJobs", element: (<ProtectedRoute><SavedJobs /></ProtectedRoute>)},
       {path: "/postJob", element: (<ProtectedRoute><PostJob /></ProtectedRoute>)},
       {path: "/myJobs", element: (<ProtectedRoute><MyJobs /></ProtectedRoute>)},
    ]
  },
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
