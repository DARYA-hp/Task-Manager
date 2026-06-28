function ShareWorkSpace() {
    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <p className="text-[25px] text-center font-[700]">به اشتراک‌گذاری پروژه‌</p>
                <div className="flex mt-4  flex-row rounded-xl justify-between w-full bg-[#F0F1F3]">
                    <input type="text" placeholder="دعوت با ایمیل" className=" placeholder: text-[#6a6c6c] pr-3" />
                    <button className=" text-white rounded-l-xl py-3 px-10 bg-[#208D8E]">ارسال</button>
                </div>
                <div className=" mt-3 w-full flex flex-row justify-between">
                    <div className=" gap-2 flex flex-row items-center justify-center ">
                        <img src="/link-big.png" alt="" />
                        <p>لینک خصوصی</p>
                    </div>
                    <button className=" border-2  px-4 rounded-md border-[#E9EBF0]">کپی لینک</button>
                </div>
                <div className=" w-full flex flex-col gap-2 mt-4">
                    <p className=" text-[18px] text-[#7D828C] pb-2">اشتراک‌گذاشته شده با</p>
                    <div className=" flex flex-row justify-between ">
                        <div className=" flex flex-row gap-2 items-center">
                            <img className=" rounded-full w-[50px] h-[50px]" src="/girl.jpg" alt="" />
                            <p>من</p>
                            <button className="bg-[#D0EBFF] px-5 py-1 rounded-md text-[#228BE6]">مالک ورک‌اسپیس</button>
                        </div>
                        <button className=" border-2 py-1 px-4 rounded-md border-[#E9EBF0]">دسترسی کامل</button>
                    </div>
                    <div className=" flex flex-row items-center justify-between">
                        <div className=" flex flex-row gap-2 justify-center text-center items-center">
                            <div className="flex justify-center text-[17px] items-center w-[50px] h-[50px]  rounded-full bg-[#F27474]">SR</div>
                            <p className=" text-[15px]">Sararahimi@gmail.com</p>
                        </div>
                        <div className=" flex flex-row gap-1">
                            <select name="" id="" className=" border-2 py-1 px-4 rounded-md border-[#E9EBF0]">
                                <option value="">دسترسی کامل</option>
                            </select>
                            <select name="" id="" className=" border-2 py-1 px-4 rounded-md border-[#E9EBF0]">
                                <option value="">همه پروژه‌ها</option>
                            </select>
                        </div>
                    </div>
                    <div className=" flex flex-row items-center justify-between">
                        <div className=" flex flex-row gap-2 justify-center text-center items-center">
                            <div className="flex justify-center text-[17px] items-center w-[50px] h-[50px]  rounded-full bg-[#F27474]">SR</div>
                            <p className=" text-[15px]">Sararahimi@gmail.com</p>
                        </div>
                        <div className=" flex flex-row gap-1">
                            <select name="" id="" className=" border-2 py-1 px-4 rounded-md border-[#E9EBF0]">
                                <option value="">دسترسی ادیت</option>
                            </select>
                            <select name="" id="" className=" border-2 py-1 px-4 rounded-md border-[#E9EBF0]">
                                <option value="">پروژه اول</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ShareWorkSpace