import { AuthLayout } from "../components/templates/AuthLayout";
import ResetPasswordForm  from "../components/organisms/ResetPasswordForm";

 function Forget3() {
  return (
    <AuthLayout  linkText="قبلا ثبت‌نام کرده‌ای؟"  linkHref="/"  buttonText="ورود"  buttonHref="/">
      <ResetPasswordForm />
    </AuthLayout>
  )
}
export default Forget3