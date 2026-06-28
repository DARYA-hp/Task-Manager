import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";

 function ResetPasswordForm() {
  return (
    <form action="" className="flex flex-col gap-5">
      <h2 className="text-3xl font-medium text-center text-gray-800 mb-2">
        تغییر رمز عبور
      </h2>
      
      <FormField label="رمز عبور جدید را وارد کنید" id="newPassword" type="password" />
      <FormField label="تکرار رمز عبور" id="confirmPassword" type="password" />
      
      <Button type="submit">اعمال تغییرات</Button>
    </form>
  );
}
export default ResetPasswordForm