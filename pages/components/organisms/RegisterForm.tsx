import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useTheme } from '@/pages/contexts/ThemeContext';
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است"),
  email: Yup.string().required("ایمیل الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
  terms: Yup.boolean().oneOf([true], "باید قوانین را بپذیرید"),
});

export default function RegisterForm() {
  const router = useRouter();
    const { primaryColor } = useTheme();
  return (
    <>
    <Formik  initialValues={{ username: "", email: "", password: "", terms: false }}   validationSchema={RegisterSchema}   validateOnChange={false}   validateOnBlur={true}
      onSubmit={(values) => {
        console.log(" ثبت‌نام موفق:", values);
        router.push("/board");
      }}>
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="flex flex-col gap-4">
          <h2 className="text-3xl font-medium text-center text-gray-800 mb-4">
            به ثبت نام تسک منیجر خوش آمدید
          </h2>

          <div>
            <label className="block text-gray-700 mb-1">نام کاربری</label>
            <Field name="username" className="w-full px-3 py-2 border rounded-lg" />
            {touched.username && errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ایمیل</label>
            <Field  name="email"  type="email"  className="w-full px-3 py-2 border rounded-lg"/>
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">رمز عبور</label>
            <Field  name="password"  type="password"  className="w-full px-3 py-2 border rounded-lg"/>
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex gap-2">
            <input  type="checkbox"  checked={values.terms}  onChange={(e) => setFieldValue("terms", e.target.checked)}/>
            <span>قوانین را می‌پذیرم</span>
          </div>
          {touched.terms && errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          <button type="submit" style={{background : primaryColor}} className=" text-white py-2 rounded-lg">
            ثبت‌نام
          </button>
        </Form>
      )}
    </Formik>
    </>
  );
}