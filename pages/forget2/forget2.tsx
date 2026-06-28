import { AuthLayoutSimple } from "../components/templates/AuthLayoutSimple";
import  ForgetSuccess  from "../components/organisms/ForgetSuccess";

 function Forget2() {
  return (
    <AuthLayoutSimple linkText="قبلا ثبت‌نام کرده‌ای؟" linkHref="/"  buttonText="ورود"  buttonHref="/">
      <ForgetSuccess />
    </AuthLayoutSimple>
  );
}
export default Forget2