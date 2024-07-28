import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSigninAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount } = useSigninAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user is already authenticated
  const isUserAuthenticated = async () => {
    try {
      const isLoggedIn = await checkAuthUser();
      return isLoggedIn;
    } catch (error) {
      console.error("Error checking user authentication:", error);
      return false;
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Check for existing session before sign-in
    const isLoggedIn = await isUserAuthenticated();
    if (isLoggedIn) {
      toast({ title: 'You are already logged in.' });
      return navigate('/');
    }

    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({ title: 'Sign in failed. Please try again.' });
      }

      const isLoggedIn = await checkAuthUser();
      console.log({ isLoggedIn });

      if (isLoggedIn) {
        form.reset();
        console.log('Navigation');
        navigate('/');
      } else {
        toast({ title: 'Sign in failed. Please try again.' });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast({ title: 'An error occurred. Please try again.' });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/mblack.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-black">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-black">Welcome back, Please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-small-regular  text-center mt-2 text-black">
            Don't have an account?
            <Link to="/sign-up" className="text-green-500 text-small-semibold
 ml-1">Sign up</Link>
      </p>
      </form>
      </div>
    </Form>
  )
}

export default SignInForm