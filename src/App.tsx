import { Routes, Route } from "react-router-dom";
import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import SignInForm from "./_auth/forms/SignInForm";


import "./globals.css";
import ProtectedRoute from "./_auth/ProtectedRoute";
import SignupForm from "./_auth/forms/SignUpForm";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <Saved />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-post/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile/:id"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
