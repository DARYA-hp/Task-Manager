import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { Link } from "../atoms/Link";
import { useTheme } from "@/pages/contexts/ThemeContext";
function ForgetForm() {
  const {primaryColor}=useTheme()
  return (
    <>
      <form action="" className="flex flex-col gap-5 mt-16">
        <h2 className="text-3xl font-medium text-center text-gray-800 mb-2">
          فراموشی رمز عبور
        </h2>

        <FormField label="ایمیل خود را وارد کنید" id="email" type="email" />

        <Button type="submit">
          <Link href="/forget2">دریافت ایمیل بازیابی رمز عبور</Link>
        </Button>

        {/* <Link  href="/"  className="font-bold  text-center hover:underline">
          بازگشت
        </Link> */}
      </form>
    </>
  )
}
export default ForgetForm