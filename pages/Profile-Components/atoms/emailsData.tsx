import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@/pages/contexts/ThemeContext';
import { useRouter } from 'next/router';
const EmailDataSchema = Yup.object().shape({
  email: Yup.string()
    .email('ایمیل نامعتبر است')
    .required('ایمیل الزامی است'),
  username: Yup.string()
    .required('نام کاربری الزامی است')
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
    .max(20, 'نام کاربری نباید بیشتر از ۱۰ کاراکتر باشد'),
  currentPassword: Yup.string()
    .required('رمز عبور فعلی الزامی است'),
  newPassword: Yup.string()
    .required('رمز عبور جدید الزامی است')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  confirmPassword: Yup.string()
    .required('تکرار رمز عبور الزامی است')
    .oneOf([Yup.ref('newPassword')], 'رمز عبور جدید و تکرار آن یکسان نیستند'),
});

function EmailData() {
  const initialValues = {
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const {primaryColor}=useTheme()
  const router =useRouter()
  return (
    <div className="w-[300px] flex flex-col gap-4 mt-10">
      <Formik initialValues={initialValues} validationSchema={EmailDataSchema}
        onSubmit={(values, { resetForm }) => {
          localStorage.setItem('emailUserData', JSON.stringify(values));
          console.log("اطلاعات در LocalStorage ذخیره شد:", values);
          alert("اطلاعات با موفقیت ذخیره شد!");
          resetForm();
        }}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">ایمیل</label>
              <Field id="email" name="email" type="email" className="border-2 rounded-md border-[#a7a7aa] p-2"/>
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">نام کاربری</label>
              <Field id="username" name="username" type="text" className="border-2 rounded-md border-[#a7a7aa] p-2"/>
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword">رمز عبور فعلی</label>
              <Field id="currentPassword" name="currentPassword" type="password" className="border-2 rounded-md border-[#a7a7aa] p-2"/>
              <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword">رمز عبور جدید</label>
              <Field  id="newPassword"  name="newPassword"  type="password"  className="border-2 rounded-md border-[#a7a7aa] p-2"/>
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">تکرار رمز عبور جدید</label>
              <Field id="confirmPassword"   name="confirmPassword" type="password" className="border-2 rounded-md border-[#a7a7aa] p-2"/>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
            </div>

            <button type="submit" disabled={isSubmitting}  style={{backgroundColor : primaryColor}} 
              className="mt-4 py-2 px-6 text-white rounded-md transition-colors disabled:opacity-50">
              {isSubmitting ? 'در حال ذخیره...' : 'ثبت تغییرات'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EmailData;