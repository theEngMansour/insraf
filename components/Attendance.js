import clsx from "clsx";

export default function Attendance({ attendance }) {
    return (
        <table className="w-full text-md text-left text-gray-500 font-medium">
            <thead className="text-md font-regular text-gray-600 text-center bg-white rounded-lg shadow-lg">
                <tr>
                    <th scope="col" className="px-4 py-3">المادة</th>
                    <th scope="col" className="px-4 py-3">عدد</th>
                    <th scope="col" className="px-4 py-3">الحالة</th>
                </tr>
            </thead>
            <tbody className="text-md font-regular text-gray-600 text-center">
                <tr>
                    <th scope="col" className="px-4 py-3 font-sans text-right"></th>
                    <th scope="col" className="px-4 py-3 font-sans text-right"></th>
                </tr>
            </tbody>
            <tfoot className="text-md font-regular text-gray-600 text-center bg-white rounded-lg shadow-lg selection:bg-blue-700 selection:text-white">
                {attendance?.map((data, index) =>
                    <tr key={index}>
                        <th scope="col" className="px-4 py-3 font-sans text-right">{data?.subject}</th>
                        <th scope="col" className="px-4 py-3 text-blue-700 font-sans">{data?.dayNubmer}</th>
                        <th scope="col" className={clsx("px-4 py-3 font-sans",
                            data?.status == "طبيعي" ? "text-green-700" : null,
                            data?.status == "مستهنج" ? "text-red-700" : null,
                            data?.status == "بعذر" ? "text-blue-700" : null
                        )}>{data?.status}</th>
                    </tr>
                )}
            </tfoot>
        </table>
    )
}
