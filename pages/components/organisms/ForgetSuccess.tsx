import { MessageCard } from "../molecules/MessageCard";

function ForgetSuccess() {
  return (
    <>
      <div className=" mt-20">
        <MessageCard title="فراموشی رمز عبور" message="لینک تغییر رمز عبور برای شما ایمیل شد. لطفا ایمیل خود را بررسی کنید." />
      </div>
    </>
  )
}
export default ForgetSuccess