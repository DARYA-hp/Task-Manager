interface VerifyBtnProps {
    selectedColor: string;
    isSubmitting?: boolean;
}
import { useRouter } from "next/router";
function VerifyBtn({ selectedColor, isSubmitting = false }: VerifyBtnProps) {
    const router=useRouter()
    return (
        <button onClick={()=>router.push('/board')}
            type="submit"
            disabled={isSubmitting}
            className="mt-2 py-2 px-6 text-white cursor-pointer rounded-md font-bold transition-colors duration-300"
            style={{
                backgroundColor: selectedColor,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
        >
            {isSubmitting ? 'در حال ذخیره...' : 'ثبت تغییرات'}
        </button>
    );
}

export default VerifyBtn;