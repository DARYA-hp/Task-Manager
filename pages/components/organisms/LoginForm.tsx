import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../atoms/Button";
import { Link } from "../atoms/Link";
import AuthLinks from "../molecules/AuthLinks";
import { useRouter } from "next/navigation";
import { useTheme } from "@/pages/contexts/ThemeContext";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});

export function LoginForm() {
  const router = useRouter();
  const { primaryColor } = useTheme();

  return (
    <>
      <Formik 
        initialValues={{ username: "", password: "" }}  
        validationSchema={LoginSchema}  
        validateOnChange={false}  
        validateOnBlur={true}
        onSubmit={(values) => {
          console.log("Submitted:", values);
          router.push("/profile");
        }}  >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-3">
            <h2 className="text-3xl font-medium text-center text-gray-800 mb-2">
              به تسک منیجر خوش برگشتی :)
            </h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-gray-700 font-medium">
                نام کاربری
              </label>
              <Field  id="username"  name="username"  type="text" 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                style={{ '--primary-color': primaryColor } as React.CSSProperties}/>
              {touched.username && errors.username && (
                <div className="text-red-500 text-xs text-center">
                  {errors.username}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-700 font-medium">
                رمز عبور
              </label>
              <Field  id="password"  name="password"  type="password" 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                style={{ '--primary-color': primaryColor } as React.CSSProperties}/>
              {touched.password && errors.password && (
                <div className="text-red-500 text-xs text-center">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Link href="/forget" className="text-sm hover:text-[var(--primary-color)] transition">
                رمز عبور خود را فراموش کرده‌اید؟
              </Link>
            </div>
            <Button type="submit"> ورود</Button>
            <AuthLinks text="ثبت‌نام نکرده‌ای؟" linkText="ثبت‌نام" linkHref="/Register" />
          </Form>
        )}
      </Formik>
    </>
  )
}