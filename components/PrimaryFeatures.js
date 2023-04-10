"use client";
import Image from "next/image";
import clsx from "clsx";
import Container from "./ContainerLoading";
import screenshotExpenses from "@/public/images/screenshots/expenses.png";
import screenshotPayroll from "@/public/images/screenshots/payroll.png";
import screenshotReporting from "@/public/images/screenshots/reporting.png";
import screenshotVatReturns from "@/public/images/screenshots/vat-returns.png";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

const features = [
  {
    title: "الإحصائيات",
    description:
      "هو نظام يتم استخدامه لتحليل البيانات المتعلقة بالمستخدمين، التصنيفات، نسبة الحضور و نسبة الغياب",
    image: screenshotPayroll,
  },
  {
    title: "التصنيفات",
    description:
      "هو نظام يساعد في تنظيم وترتيب الطلاب على الموقع كلاً حسب المستوى والقسم الذي ينتمي له لتوفير الوقت والجهد في البحث عنهم كما يساعد في تحسين تجربة المستخدم وزيادة فاعلية الموقع",
    image: screenshotExpenses,
  },
  {
    title: "نظام الطلاب",
    description:
      "نظام البحث يعتبر من الأدوات الأساسية التي تساعد مسؤولين الموقع على الوصول إلى اسم الطالب الذي يبحثون عنه بسرعة وسهولة. فهو يقوم بتحليل محتوى المواقع وفهرستها بطريقة تجعلها متاحة للبحث والوصول إليها بكل سهولة",
    image: screenshotReporting,
  },
  {
    title: "التحضير",
    description:
      "تحليل الوثت - وقت دخول وخروج الطالب",
    image: screenshotVatReturns,
  },
];

export default function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-700 pb-28 pt-20 sm:py-32"
    >
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl font-bolder">
            كل ماتحتاج لإدارة الطلاب
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100 font-regular">
            أهم مايميز إنصراف عن غيرة من التطبيقات
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full px-4 py-1 lg:rounded-r-xl lg:rounded-l-none lg:p-6 font-bolder",
                        selectedIndex === featureIndex
                          ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10"
                          : "hover:bg-white/10 lg:hover:bg-white/5"
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none outline-none",
                            selectedIndex === featureIndex
                              ? "text-blue-700 lg:text-white"
                              : "text-blue-100 hover:text-white lg:text-white"
                          )}
                        >
                          <span className="absolute inset-0 rounded-full font-bolder lg:rounded-r-xl lg:rounded-l-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          "mt-2 hidden text-sm lg:block font-regular",
                          selectedIndex === featureIndex
                            ? "text-white"
                            : "text-blue-100 group-hover:text-white"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
