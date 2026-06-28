import { AuthLayout } from "./components/templates/AuthLayout";
import  RegisterForm  from "./components/organisms/RegisterForm";

 function Register() {
  return (
    <AuthLayout linkText="قبلا ثبت‌نام کرده‌ای؟" linkHref="/" buttonText="ورود" buttonHref="/">
      <RegisterForm />
    </AuthLayout>
  )
}
export default Register