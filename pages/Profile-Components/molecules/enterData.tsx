import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/pages/store"; 
import { setUser } from "@/pages/store/features/profile/profileSlice"; // مسیر دقیق را چک کنید
import { useTheme } from "@/pages/contexts/ThemeContext";
import VerifyBtn from "../atoms/verify";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required("نام الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(10, "نام نباید بیشتر از ۱۰ کاراکتر باشد"),
  lastName: Yup.string()
    .required("نام خانوادگی الزامی است")
    .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(10, "نام خانوادگی نباید بیشتر از ۱۰ کاراکتر باشد"),
  phone: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
});

function EnterData({ onColorSelect }: { onColorSelect?: (color: string) => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { primaryColor } = useTheme();
  
  const user = useSelector((state: RootState) => state.profile.user);

  const initialValues = {
    name: user?.name !== 'کاربر مهمان' ? user?.name?.split(' ')[0] || "" : "",
    lastName: user?.name !== 'کاربر مهمان' ? user?.name?.split(' ')[1] || "" : "",
    phone: user?.email !== 'guest@example.com' ? user?.email?.split('@')[0] || "" : "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          const fullName = `${values.name} ${values.lastName}`;
          
          dispatch(setUser({
            name: fullName,
            email: values.phone + "@example.com", 
            avatar: user?.avatar || '/girl.jpg',
          }));
          
          if (onColorSelect) {
             onColorSelect(primaryColor);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">نام</label>
              <Field name="name" type="text" className="border-2 rounded-md border-[#a7a7aa] p-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName">نام خانوادگی</label>
              <Field name="lastName" type="text" className="border-2 rounded-md border-[#a7a7aa] p-2" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">شماره موبایل</label>
              <Field name="phone" type="text" className="border-2 rounded-md border-[#a7a7aa] p-2" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>
            <VerifyBtn selectedColor={primaryColor} isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default EnterData;