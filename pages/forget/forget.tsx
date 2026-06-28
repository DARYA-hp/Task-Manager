import { AuthLayout } from "../components/templates/AuthLayout";
import ForgetForm from "../components/organisms/ForgetForm";

 function Forget() {
  return (
    <AuthLayout linkText="قبلا ثبت‌نام کرده‌ای؟" linkHref="/" buttonText="ورود" buttonHref="/" >
      <ForgetForm />
    </AuthLayout>
  )
}
export default Forget