"use client";
import React from "react";
import { useQuery } from '@apollo/client';
import { STUDENT_GET } from "@/hooks/queries";
import { Alert, ShowStudent, Attendance, HeadStudent } from "@/components";

export default function page({ params }) {
   
    const ibn = [
        {
            subject: "Computer Network",
            dayNubmer: 12,
            status: "طبيعي"
        },
        {
            subject: "Elective I: Microcontroller",
            dayNubmer: 3,
            status: "مستهنج"
        },
        {
            subject: "Infromation",
            dayNubmer: 2,
            status: "بعذر"
        }
    ]

    const { loading, error, data } = useQuery(STUDENT_GET, {
        variables: { id: parseInt(params.id) },
    });

    if (loading) return <p> Loading...</p>;
    if (error) return <p>Error :</p>;
  
    return (
        <React.Fragment>
            <div className="m-auto p-2 sm:p-4 flex flex-col items-center lg:w-2/4 w-screen justify-center">
                <HeadStudent />
                <ShowStudent
                    name={data.student.name}
                    regNo={data.student.register}
                    level={data.student.level.name}
                    classification={data.student.classification}
                />
                <div className="flex w-full flex-col justify-center px-0 sm:px-4 mt-4">
                    <Alert
                        title="ملاحظة"
                        textColor="text-blue-50"
                        bgColor="bg-blue-700"
                        body="
                        عدد الحضور إذا كان ثلاث إيام او إقل يعتبر مستنهج ومن خلال 
                        الحالة يتم توضيح حالة الطالب إذا كان مستهنج او بعذر 
                        او في الحالة الطبيعية
                        "
                    />
                    <Attendance 
                        attendance={ibn}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
