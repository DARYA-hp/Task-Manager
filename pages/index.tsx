import { AuthLayout } from "./components/templates/AuthLayout";
import { LoginForm } from "./components/organisms/LoginForm";

export default function Home() {
  return (
    <>
      <AuthLayout linkText="ثبت‌نام نکرده‌ای؟" linkHref="/Register" buttonText="ثبت‌نام" buttonHref="/Register" >
        <LoginForm />
      </AuthLayout>
    </>
  );
}