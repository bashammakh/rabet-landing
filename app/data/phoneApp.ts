// Sample content for the clickable phone in the hero (LandingPhoneApp).
// Snapshot taken 2026-10-25 from the same public sources the Rabet app reads:
// ministries + services from abg-system.com (GetGovAdministrations,
// GetADMServices/{id}, GetServiceCompleteData/{id}); news from the app's Google
// Sheet feed. The landing page calls no backend, so this is static.
// Logos and avatars were downloaded to public/images/app/.

export interface Bi { en: string, ar: string }
export interface PhoneMinistry { id: number, name: Bi, logo: string }
export interface PhoneService {
  id: number
  ministry: number
  name: Bi
  fees: number
  previous: number | null
  days: number
  desc: Bi
  docs: Bi[]
  conditions: Bi[]
}
export interface PhoneNews { handle: string, name: Bi, avatar: string, date: string, text: string, url: string }

export const phoneMinistries: PhoneMinistry[] = [
  {
    "id": 7,
    "name": {
      "en": "Ministry of Investment",
      "ar": "وزارة الاستثمار"
    },
    "logo": "/images/app/ministries/7.webp"
  },
  {
    "id": 29,
    "name": {
      "en": "Qiwa Platform",
      "ar": "منصة قوى"
    },
    "logo": "/images/app/ministries/29.webp"
  },
  {
    "id": 33,
    "name": {
      "en": "Muqeem Platform",
      "ar": "منصة مقيم"
    },
    "logo": "/images/app/ministries/33.webp"
  },
  {
    "id": 100,
    "name": {
      "en": "GOSI - Business",
      "ar": "المؤسسة العامة للتأمينات الإجتماعية - أعمال"
    },
    "logo": "/images/app/ministries/100.webp"
  },
  {
    "id": 34,
    "name": {
      "en": "Balady Platform",
      "ar": "منصة بلدي"
    },
    "logo": "/images/app/ministries/34.webp"
  },
  {
    "id": 6,
    "name": {
      "en": "Ministry of Commerce",
      "ar": "وزارة التجارة"
    },
    "logo": "/images/app/ministries/6.webp"
  }
]

export const phoneServices: PhoneService[] = [
  {
    "id": 331,
    "ministry": 7,
    "name": {
      "en": "Services License",
      "ar": "إصدار ترخيص استثماري خدمي"
    },
    "fees": 8280,
    "previous": 7949,
    "days": 2,
    "desc": {
      "en": "The service license includes the following activities: (contracting, high management investments, information technology, tourism, Training, reconciliation, insurance and reinsurance, education, advertising, shipping services and air freight of goods, Organizing exhibitions, catering services, financial services, aviation and handling services,,, etc..)",
      "ar": "يشمل الترخيص الخدمي الأنشطة التالية: المقاولات الاستشارات الإدارية العليا، تقنية المعلومات، السياحة، التدريب، الصحة، التأمين وإعادة التأمين، التعليم، الدعاية و الاعلان، خدمات الشحن البحري والشحن الجوي للبضائع، تنظيم المعارض، خدمات التموين والتغذية، الخدمات المالية، خدمات الطيران والمناولة،،، الخ..)"
    },
    "docs": [
      {
        "en": "The establishment’s commercial register, certified by Saudi Embassy.",
        "ar": "السجل التجاري للمنشأة مصدق من السفارة السعودية."
      },
      {
        "en": "The financial statements for the last financial year of the foreign company requesting a license certified by the Saudi Embassy.",
        "ar": "القوائم المالية لآخر سنة مالية للشركة الأجنبية طالبة الترخيص مصدقة من السفارة السعودية."
      },
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      },
      {
        "en": "Entity's Articles of Association certified by the Saudi Embassy.",
        "ar": "عقد التأسيس للمنشأة مصدق من السفارة السعودية."
      }
    ],
    "conditions": [
      {
        "en": "The total percentage of the Saudi partner/partners and the capital corresponds to the minimum limits specified by the type of activity.",
        "ar": "توافق إجمالي نسبة الشريك أو الشركاء السعوديين ورأس المال حسب الحد الأدنى المحدد بنوع النشاط."
      },
      {
        "en": "In case that one of the partners was previously licensed by the Ministry of Investment, it must be clarified when filling in the partners' data while submitting the electronic application.",
        "ar": "في حال كان أحد الشركاء مرخص له سابقاً من وزارة الاستثمار، يلزم إيضاح ذلك عند تعبئة بيانات الشركاء أثناء تقديم الطلب الإلكتروني."
      },
      {
        "en": "The applicant must fill the data of the Saudi National Identity / Premium Residency / Regular Residency, if one of the partners holds any of them, or filling the commercial registration data for the participating Saudi companies when submitting the electronic application.",
        "ar": "أن يتم إدخال بيانات (الهوية الوطنية السعودية / الإقامة المميزة / الإقامة)، إذا كان أحد الشركاء يحمل أي منها، أو بيانات السجل التجاري للشركات السعودية المشاركة أثناء تقديم الطلب الإلكتروني."
      },
      {
        "en": "Payment of fees within 15 days.",
        "ar": "سداد الرسوم خلال 15 يوم."
      },
      {
        "en": "Required Data: (Email - Absher Phone Number - Service Activities - Partners & Managers IDs - City in which the license is requested).",
        "ar": "بيانات مطلوبة: (البريد الإلكتروني - رقم جوال أبشر - الأنشطة الخدمية - هويات الشركاء والمدراء - المدينة المراد عمل الترخيص بها)."
      }
    ]
  },
  {
    "id": 338,
    "ministry": 7,
    "name": {
      "en": "Issuing a Real Estate Investment License",
      "ar": "إصدار ترخيص استثماري عقاري"
    },
    "fees": 8280,
    "previous": 7949,
    "days": 2,
    "desc": {
      "en": "Licenses for activities that include investments in the field of real estate development, provided that the cost of the project is not less than 30 million Saudi riyals, land and building outside the scope of the cities of Makkah Al-Mukarramah and Al-Madinah Al-Munawwarah.",
      "ar": "ترخيص للأنشطة التي تشمل الاستثمارات في مجال التطوير العقاري على أن لا تقل تكلفة المشروع عن 30 مليون ريال سعودي أرضاً وبناءً خارج نطاق مدينتي مكة المكرمة والمدينة المنورة."
    },
    "docs": [
      {
        "en": "A copy of the establishment’s commercial register, certified by Saudi Embassy.",
        "ar": "السجل التجاري للمنشأة مصدق من السفارة السعودية."
      },
      {
        "en": "The financial statements for the last financial year of the foreign company requesting a license certified by the Saudi Embassy.",
        "ar": "القوائم المالية لآخر سنة مالية للشركة الأجنبية طالبة الترخيص مصدقة من السفارة السعودية."
      },
      {
        "en": "Entity's Articles of Association certified by the Saudi Embassy.",
        "ar": "عقد التأسيس للمنشأة مصدق من السفارة السعودية."
      },
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      }
    ],
    "conditions": [
      {
        "en": "The total percentage of the Saudi partner/partners and the capital corresponds to the minimum limits specified by the type of activity.",
        "ar": "توافق إجمالي نسبة الشريك أو الشركاء السعوديين ورأس المال حسب الحد الأدنى المحدد بنوع النشاط."
      },
      {
        "en": "In case that one of the partners was previously licensed by the Ministry of Investment, it must be clarified when filling in the partners' data while submitting the electronic application.",
        "ar": "في حال كان أحد الشركاء مرخص له سابقاً من وزارة الاستثمار، يلزم إيضاح ذلك عند تعبئة بيانات الشركاء أثناء تقديم الطلب الإلكتروني."
      },
      {
        "en": "Payment of fees within 15 days.",
        "ar": "سداد الرسوم خلال 15 يوم."
      },
      {
        "en": "The applicant must fill the data of the Saudi National Identity / Premium Residency / Regular Residency, if one of the partners holds any of them, or filling the commercial registration data for the participating Saudi companies when submitting the electronic application.",
        "ar": "أن يتم إدخال بيانات (الهوية الوطنية السعودية / الإقامة المميزة / الإقامة)، إذا كان أحد الشركاء يحمل أي منها، أو بيانات السجل التجاري للشركات السعودية المشاركة أثناء تقديم الطلب الإلكتروني."
      },
      {
        "en": "If the licensed activity is related to real estate investment projects, the limit of the value of one project to be established is not less than 30,000,000 Saudi riyals and a building outside the scope of the Two Holy Mosques, and there are no minimum capital limits for projects Real estate investment.",
        "ar": "في حال كhن النشاط المرخص له يختص بمشاريع الاستثمار العقاري، فإن حد قيمة المشروع الواحد المراد إنشاءه لا تقل عن 30,000,000 ريال سعودي وبناء خارج نطاق الحرمين أرضاً ولا يوجد حد أدنى لرأس مال مشاريع الاستثمار العقاري."
      }
    ]
  },
  {
    "id": 340,
    "ministry": 7,
    "name": {
      "en": "Commercial License with Saudi Shareholder",
      "ar": "إصدار ترخيص تجاري بشريك سعودي"
    },
    "fees": 8280,
    "previous": 7949,
    "days": 2,
    "desc": {
      "en": "This service is provided to foreign establishments that wish to engage in wholesale and retail trade activity in Saudi Arabia with a Saudi partner",
      "ar": "تٌقدم الخدمة للمنشآت الأجنبية التي ترغب في ممارسة نشاط تجارة الجملة والتجزئة في المملكة العربية السعودية مع شريك سعودي."
    },
    "docs": [
      {
        "en": "A copy of the establishment’s commercial register, certified by Saudi Embassy.",
        "ar": "صورة السجل التجاري للمنشأة مصدق من السفارة السعودية."
      },
      {
        "en": "The financial statements for the last financial year of the establishment approved and authenticated by Saudi Embassy.",
        "ar": "القوائم المالية لآخر سنة مالية للمنشأة معتمدة ومصدقة من السفارة السعودية."
      },
      {
        "en": "A copy of the national IDs for partners and managers (Either Saudis or residents).",
        "ar": "صور الهويات للشركاء والمدراء السعوديين والمقيمين."
      },
      {
        "en": "Entity's Articles of Association certified by the Saudi Embassy.",
        "ar": "عقد التأسيس للمنشأة مصدق من السفارة السعودية."
      },
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      }
    ],
    "conditions": [
      {
        "en": "The presence of a Saudi partner in the investment license, provided that his dividend in the company is not less than 25%, according to the minimum limits specified by the type of activity. (Premium residency holders are exempted from this condition)",
        "ar": "وجود شريك سعودي بالترخيص الاستثماري على ألا تقل نسبة حصته بالشركة عن %25 حسب الحد الأدنى المحدد بنوع النشاط. (يٌعفى حاملي الإقامة المميزة من هذا الشرط)"
      },
      {
        "en": "In case that one of the partners was previously licensed by the Ministry of Investment, it must be clarified when filling in the partners' data while submitting the electronic application.",
        "ar": "في حال كان أحد الشركاء مرخص له سابقاً من وزارة الاستثمار، يلزم إيضاح ذلك عند تعبئة بيانات الشركاء أثناء تقديم الطلب الإلكتروني ."
      },
      {
        "en": "The applicant must fill the data of the Saudi National Identity / Premium Residency / Regular Residency, if one of the partners holds any of them, or filling the commercial registration data for the participating Saudi companies when submitting the electronic application.",
        "ar": "أن يتم إدخال بيانات (الهوية الوطنية السعودية / الإقامة المميزة / الإقامة)، إذا كان أحد الشركاء يحمل أي منها، أو بيانات السجل التجاري للشركات السعودية المشاركة أثناء تقديم الطلب الإلكتروني."
      },
      {
        "en": "Payment of fees within 15 days.",
        "ar": "سداد الرسوم خلال 15 يوم."
      },
      {
        "en": "For the company's capital not to be less than 27,000,000 SAR.",
        "ar": "ألا يقل رأس المال للشركة عن 27,000,000 ريال سعودي."
      }
    ]
  },
  {
    "id": 348,
    "ministry": 7,
    "name": {
      "en": "Issuing a license for the activity of recruitment agents and renting domestic labor services",
      "ar": "إصدار ترخيص نشاط وكلاء الاستقدام وتأجير خدمات العمالة المنزلية"
    },
    "fees": 9936,
    "previous": 9539,
    "days": 2,
    "desc": {
      "en": "The service is provided to foreign establishments that wish to engage in the activities of domestic labor recruitment services and temporary employment agencies for domest",
      "ar": "تقدم الخدمة للمنشآت الأجنبية التي ترغب في ممارسة أنشطة خدمات استقدام العمالة المنزلية ووكالات التشغيل المؤقت للخدمات المنزلية في المملكة"
    },
    "docs": [
      {
        "en": "A copy of the commercial register of the participating establishment certified by the Saudi Embassy.",
        "ar": "صورة السجل التجاري للمنشأة المشاركة مصدقة من السفارة السعودية."
      },
      {
        "en": "The financial statements for the last 3 financial years of the foreign company requesting the license certified by the Saudi Embassy.",
        "ar": "القوائم المالية لآخر 3 سنوات مالية للشركة الأجنبية طالبة الترخيص مصدقة من السفارة السعودية."
      },
      {
        "en": "A copy of the national IDs for partners and managers (Either Saudis or residents).",
        "ar": "صور الهويات للشركاء والمدراء السعوديين والمقيمين."
      },
      {
        "en": "Entity's Articles of Association certified by the Saudi Embassy.",
        "ar": "عقد التأسيس للمنشأة مصدق من السفارة السعودية."
      },
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      }
    ],
    "conditions": [
      {
        "en": "The obligation to submit a performance evaluation certificate from the authority supervising the activity of exporting the activity in the country of dispatch indicating the applicant’s historical record and the legal notes (if any).",
        "ar": "الالتزام بتقديم شهادة تقييم أداء من الجهة المشرفة على نشاط تصدير النشاط في بلد الإرسال توضح السجل التاريخي لمقدم الطلب والملاحظات القانونية إن وجدت."
      },
      {
        "en": "The obligation to provide a certificate issued by the regulatory authority in the investor’s country that no final judgment has been issued against any of the natural partners convicting him of a crime against honor or trust, or any of the violations related to the provisions regulating the protection of children or combating trafficking in persons, unless he is deemed to have been deemed guilty.",
        "ar": "الالتزام بتقديم شهادة صادرة من الجهة الرقابية في بلد المستثمر بأنه لم يصدر بحق أي من الشركاء الطبيعيين أي حكم نهائي بإدانته في جريمة مخلة بالشرف والأمانة، أو أي من المخالفات المتعلقة بالأحكام المنظمة لحماية الطفولة أو مكافحة الإتجار بالأشخاص، ما لم يرد اعتباره."
      },
      {
        "en": "Commitment to the undertaking that any of the partners has not previously obtained a license to export labor or was a partner in a company practicing this activity and its license has been revoked by a decision or a court ruling, unless at least five years have passed since that.",
        "ar": "الالتزام بالتعهد أن أي من الشركاء لم يسبق له الحصول على ترخيص لتصدير العمالة أو كان شريك في شركة تمارس هذا النشاط وتم إلغاء ترخيصها بقرار أو حكم قضائي مالم يمض على ذلك خمس سنوات على الأقل."
      },
      {
        "en": "Commitment to acknowledge and read and abide by the regulations and instructions in the Kingdom, and the regulations and instructions governing the recruitment activity in the Kingdom.",
        "ar": "الإلتزام بالإقرار بالاطلاع والالتزام بالأنظمة والتعليمات في المملكة والأنظمة والتعليمات المنظمة لنشاط الاستقدام في المملكة."
      },
      {
        "en": "In case that one of the partners was previously licensed by Ministry of Investment, it must be clarified when filling in the partners' data while submitting theelectronic application.",
        "ar": "في حال كون أحد الشركاء مرخص سابقا من وزارة الاستثمار فيلزم إيضاح ذلك عند تعبئة بيانات الشركاء اثناء تقديم الطلب."
      }
    ]
  },
  {
    "id": 259,
    "ministry": 29,
    "name": {
      "en": "Contract management and documentation",
      "ar": "إدارة وتوثيق العقود"
    },
    "fees": 64,
    "previous": 61,
    "days": 0,
    "desc": {
      "en": "A service that enables the facility owner to manage and document employee contracts",
      "ar": "خدمة تُمكن صاحب المنشأة من إدارة وتوثيق عقود العاملين"
    },
    "docs": [
      {
        "en": "ID Photo.",
        "ar": "صورة الهوية."
      },
      {
        "en": "A copy of the commercial register.",
        "ar": "صورة من السجل التجاري."
      }
    ],
    "conditions": [
      {
        "en": "The establishment must be established.",
        "ar": "أن تكون المنشأة قائمة."
      },
      {
        "en": "That the worker does not have a valid contract in Qawia.",
        "ar": "أن لا يكون للعامل عقد ساري في قوى."
      },
      {
        "en": "The worker's work permit must be valid for more than (60) days.",
        "ar": "أن تكون رخصة العمل الخاصة بالعامل سارية لأكثر من (60) يوماً."
      },
      {
        "en": "Required Data: (Email-Absher Phone Number-identity worker-bank statement-contract duration-salary determination-occupation-work qualification-number of working days and hours).",
        "ar": "البيانات المطلوبة:(البريد الإلكتروني-رقم الجوال المرتبط في أبشر- هوية الموظف-الآيبان البنكي-مدة العقد-تحديد الراتب-المهنة-المؤهل العلمي-عددأيام وساعات العمل)."
      }
    ]
  },
  {
    "id": 260,
    "ministry": 29,
    "name": {
      "en": "Instant Visas",
      "ar": "إصدار التأشيرات الفورية"
    },
    "fees": 50,
    "previous": 48,
    "days": 0,
    "desc": {
      "en": "This service is provided to establishments wishing to issue employment visas immediately without the need for paper documents or visiting a ministry branch.",
      "ar": "تُقدم هذه الخدمة للمنشأت التي ترغب في إصدار تأشيرات العمالة المهنية بشكل فوري دون الحاجة لمستندات ورقية أو زيارة أحد فروع الوزارة."
    },
    "docs": [
      {
        "en": "A copy of commercial register.",
        "ar": "صورة من السجل التجاري."
      }
    ],
    "conditions": [
      {
        "en": "1- Validity of work permits in unified number establishments.",
        "ar": "1- سريان رخص العمل في منشآت الرقم الموحد."
      },
      {
        "en": "2- Achieving the percentage of commitment to document contracts.",
        "ar": "2- تحقيق نسبة الإلتزام بتوثيق العقود."
      },
      {
        "en": "3- The validity of the commercial register. Activities that do not require a commercial register are excluded from this condition.",
        "ar": "3- سريان السجل التجاري، ويستثنى من هذا الشرط الأنشطة التي لا تستوجب وجود سجل تجاري."
      },
      {
        "en": "4- Establishment status should be established.",
        "ar": "4- أن تكون حالة المنشأة قائمة."
      },
      {
        "en": "5- Medium Green Business Entity Scope or above (for expansion phase only)",
        "ar": "5- أن يكون نطاق كيان المنشأة الأخضر المتوسط أو أعلى (لمرحلة التوسع فقط)."
      }
    ]
  },
  {
    "id": 262,
    "ministry": 29,
    "name": {
      "en": "Transfer Worker Service",
      "ar": "نقل خدمة عامل"
    },
    "fees": 80,
    "previous": 77,
    "days": 0,
    "desc": {
      "en": "A service that enables the facility owner to transfer the service of a resident employee to it.",
      "ar": "خدمة تُمكن صاحب المنشأة من نقل خدمة موظف مقيم إليها."
    },
    "docs": [
      {
        "en": "A copy of the commercial register.",
        "ar": "صورة من السجل التجاري."
      },
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      },
      {
        "en": "ID Photo.",
        "ar": "صورة الهوية."
      }
    ],
    "conditions": [
      {
        "en": "1- For incorporation facilities: All other entities under the unified number must be in the medium green range at least or very small green except for the entity under incorporation.",
        "ar": "1- لمنشآت التأسيس: يجب أن تكون جميع الكيانات الأخرى تحت الرقم الموحد في النطاق الأخضر المتوسط على الأقل أو الأخضر صغير جداً بإستثناء الكيان تحت التأسيس."
      },
      {
        "en": "2- When transferring services, the employee's approval of the application, including the employment contract, is required.",
        "ar": "2- عند إجراء نقل الخدمات يشترط موافقة الموظف على الطلب متضمناً عقد العمل."
      },
      {
        "en": "3- Your establishments belonging to the same establishment group must not have any expired business licenses.",
        "ar": "3- يجب ألا تمتلك منشأتك التابعة لنفس مجموعة المنشأت أي رخص عمل منتهية الصلاحية."
      },
      {
        "en": "4- Your facility must comply with the Wage Protection System.",
        "ar": "4- يجب أن تمتثل منشأتك لنظام حماية الأجور."
      },
      {
        "en": "5- The transfer of employees must not exceed the permissible recruitment balance (visas and transfers) of the level of the medium green bands (for establishments in the expansion period).",
        "ar": "5- عدم تجاوز نقل الموظفين لرصيد الإستقطاب المسموح به(التأشيرات والنقل) لمستوى نطاقات الأخضر المتوسط (للمنشأت في فترة التوسع)"
      }
    ]
  },
  {
    "id": 310,
    "ministry": 29,
    "name": {
      "en": "Issuance of a work permit",
      "ar": "إصدار رخصة عمل"
    },
    "fees": 64,
    "previous": 61,
    "days": 0,
    "desc": {
      "en": "A service that enables the facility owner to issue work permits for workers",
      "ar": "خدمة تُمكن صاحب المنشأة من إصدار رخص عمل للعاملين."
    },
    "docs": [
      {
        "en": "A copy of the commercial register.",
        "ar": "صورة من السجل التجاري."
      },
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      }
    ],
    "conditions": [
      {
        "en": "Establishment status should be established.",
        "ar": "أن تكون حالة المنشأة قائمة."
      },
      {
        "en": "The scope of the establishment should not be in red.",
        "ar": "أن لا يكون نطاق المنشأة في اللون الأحمر."
      },
      {
        "en": "The establishment must be committed to the wages protection program.",
        "ar": "أن تكون المنشأة ملتزمة ببرنامج حماية الأجور."
      },
      {
        "en": "The worker accepts the contract through individual forces.",
        "ar": "أن يقوم العامل بقبول العقد عن طريق قوى أفراد."
      },
      {
        "en": "Required Data: (Email-Absher Phone Number-National ID or resident ID if the facility owner is a resident).",
        "ar": "بيانات مطلوبة: (البريد الإلكتروني-رقم جوال أبشر-الهوية الوطنية أو هوية مقيم في حال كان صاحب المنشأة مقيم )."
      }
    ]
  },
  {
    "id": 288,
    "ministry": 33,
    "name": {
      "en": "Iqama Issuance",
      "ar": "إصدار إقامة"
    },
    "fees": 113,
    "previous": 108,
    "days": 0,
    "desc": {
      "en": "A service that enables the owner to issue a residence permit for recruited workers",
      "ar": "خدمة تمكن صاحب المنشأة من إصدار إقامة للعمالة المستقدمة."
    },
    "docs": [
      {
        "en": "The border number and passport of the worker.",
        "ar": "رقم الحدود وجواز السفر الخاص بالعامل."
      }
    ],
    "conditions": [
      {
        "en": "A valid work permit for the worker.",
        "ar": "وجود رخصة عمل سارية للعامل."
      },
      {
        "en": "Medical insurance and Medical examination for the worker.",
        "ar": "وجود تأمين طبي وكشف طبي للعامل."
      },
      {
        "en": "Validation period for the residence according to the validation period of the work permit. (Maximum 12 months)",
        "ar": "مدة سريان الإقامة طبقاً لمدة سريان رخصة العمل بحيث تكون نفس المدة. (أقصى مدة 12 شهراً)"
      }
    ]
  },
  {
    "id": 289,
    "ministry": 33,
    "name": {
      "en": "Renewal of residence",
      "ar": "تجديد إقامة"
    },
    "fees": 50,
    "previous": 48,
    "days": 0,
    "desc": {
      "en": "A service that enables the facility owner to renew the employee’s resident ID",
      "ar": "خدمة تُمكن صاحب المنشأة من تجديد هوية مقيم للعمالة"
    },
    "docs": [
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      },
      {
        "en": "ID photo",
        "ar": "صورة الهوية"
      }
    ],
    "conditions": [
      {
        "en": "1- Payment for the desired period for Iqama renewal.",
        "ar": "1- سداد رسوم إصدار الإقامة وغرامة التأخير «إن وجدت»."
      },
      {
        "en": "2- The service enables the establishment owner to renew the resident identity (iqama) for his/ her workers online",
        "ar": "2- تمكين صاحب المنشأة من تجديد هوية مقيم (إقامة) للعامل إلكترونيًا."
      },
      {
        "en": "3- Sponsoree should not have any unpaid traffic violation",
        "ar": "3- سداد المخالفات المرورية المسجلة على العامل «إن وجدت»."
      },
      {
        "en": "4- Sponsoree passport should be valid.",
        "ar": "4- تسجيل بصمة وصورة للعامل وتابعيه."
      },
      {
        "en": "5- Register and pass the medical examination of the worker in approved medical centers",
        "ar": "5- تسجيل واجتياز الفحص الطبي للعامل في المراكز الطبية المعتمدة."
      }
    ]
  },
  {
    "id": 290,
    "ministry": 33,
    "name": {
      "en": "Issuance an Exit Re-entry Visa",
      "ar": "إصدار تأشيرة خروج وعودة"
    },
    "fees": 50,
    "previous": 48,
    "days": 0,
    "desc": {
      "en": "An electronic service provided by the General Directorate of Passports, which enables those who have family members or domestic workers to issue an exit and re-entry visa for them.",
      "ar": "خدمة إلكترونية تقدمها المديرية العامة للجوازات تمكن من لديه أفراد أسرة أو عمالة منزلية من إصدار تأشيرة الخروج والعودة لهم."
    },
    "docs": [
      {
        "en": "A copy of the worker’s ID and passport.",
        "ar": "صورة الهوية وجواز السفر للعامل."
      }
    ],
    "conditions": [
      {
        "en": "Payment of all traffic violations must be paid by the individual to whom it is issued, or by the worker and the employer.",
        "ar": "سداد جميع المخالفات المرورية على الفرد المراد الإصدار له أو العامل وصاحب العمل."
      },
      {
        "en": "The presence of the individual to whom the visa is to be issued is within Saudi territory when the visa is issued.",
        "ar": "وجود الفرد المراد إصدار التأشيرة له داخل الأراضي السعودية عند إصدار التأشيرة."
      },
      {
        "en": "The validity of the passport of the individual to be issued a visa must be 60 days or more.",
        "ar": "أن تكون صلاحية جواز سفر الفرد المراد إصدار التأشيرة 60 يوما فأكثر."
      },
      {
        "en": "Validity of residence permit for the individual to whom a visa is to be issued.",
        "ar": "سريان صلاحية الإقامة للفرد المراد إصدار التأشيرة له."
      },
      {
        "en": "The presence of a fingerprint of the individual to whom the visa is to be issued (for males and females aged 15 years and older).",
        "ar": "وجود بصمة للفرد المراد إصدار التأشيرة له (للذكور والإناث من 15 عاما وأكبر)."
      }
    ]
  },
  {
    "id": 292,
    "ministry": 33,
    "name": {
      "en": "Users Management",
      "ar": "إدارة المستخدمين"
    },
    "fees": 50,
    "previous": 48,
    "days": 0,
    "desc": {
      "en": "A service that enables the facility owner to add a user and give him powers over Muqeem services",
      "ar": "خدمة تُمكن صاحب المنشأة من إضافة مستخدم وإعطائة صلاحيات على خدمات مقيم"
    },
    "docs": [
      {
        "en": "National Address.",
        "ar": "العنوان الوطني."
      },
      {
        "en": "ID photo.",
        "ar": "صورة الهوية."
      }
    ],
    "conditions": [
      {
        "en": "If the user is a resident, the ID must be valid.",
        "ar": "في حال كان المستخدم مقيم يجب أن تكون الهوية سارية."
      },
      {
        "en": "Activate a resident account from email.",
        "ar": "تفعيل حساب مقيم من البريد الإلكتروني."
      },
      {
        "en": "Government fees for the first user are free, after that any additional user is of 150 riyals",
        "ar": "الرسوم الحكومية لأول مستخدم مجاناً بعد ذلك أية إضافة لمستخدم 150 ريال."
      }
    ]
  },
  {
    "id": 572,
    "ministry": 100,
    "name": {
      "en": "Issue Zakat certificate",
      "ar": "إصدار شهادة الزكاة والدخل - أعمال"
    },
    "fees": 113,
    "previous": 108,
    "days": 0,
    "desc": {
      "en": "This service allows issuing a certificate for the purpose of submitting it to the Zakat, Tax and Customs Authority.",
      "ar": "تُتيح هذه الخدمة إصدار شهادة لتقديمها لهيئة الزكاة والضريبة والجمارك."
    },
    "docs": [
      {
        "en": "A copy of commercial register.",
        "ar": "صورة من السجل التجاري."
      }
    ],
    "conditions": [
      {
        "en": "There are no amounts, violations, or fines imposed on the facility.",
        "ar": "لايوجد مبالغ أو مخالفات أو غرامات على المنشأة."
      }
    ]
  },
  {
    "id": 574,
    "ministry": 100,
    "name": {
      "en": "Transfer Credit between Branches",
      "ar": "تحويل الرصيد الدائن بين فروع المنشأة - أعمال"
    },
    "fees": 113,
    "previous": 108,
    "days": 4,
    "desc": {
      "en": "This service allows the transfer of the credit balance between the facility's branches, as funds can easily be transferred between the different branches of the facility.",
      "ar": "تُتيح هذه الخدمة تحويل الرصيد الدائن بين فروع المنشأة، حيث يمكن بسهولة نقل الأموال بين الفروع المختلفة للمنشأة."
    },
    "docs": [
      {
        "en": "An official letter from the establishment requesting the transfer.",
        "ar": "خطاب رسمي من المنشأة بطلب التحويل."
      },
      {
        "en": "A copy of commercial register.",
        "ar": "صورة من السجل التجاري."
      }
    ],
    "conditions": [
      {
        "en": "Ensure that the two facilities are linked automatically in the system.",
        "ar": "التأكد من أن المنشأتين مربوطتين آلياً في النظام."
      },
      {
        "en": "Ensure that there are no notes on the facility.",
        "ar": "التأكد من عدم وجود ملاحظات على المنشأة."
      }
    ]
  },
  {
    "id": 575,
    "ministry": 100,
    "name": {
      "en": "Modify the engagement of an active contributor - Business",
      "ar": "تعديل مدة الاشتراك لمشترك نشط - أعمال"
    },
    "fees": 113,
    "previous": 108,
    "days": 0,
    "desc": {
      "en": "This service allows amending the subscriber's enrollment date, to ensure the accuracy of subscribers' data.",
      "ar": "تُتيح هذه الخدمة تعديل تاريخ الإلتحاق للمشترك، لضمان دقة بيانات المشتركين."
    },
    "docs": [
      {
        "en": "Employment contract.",
        "ar": "عقد العمل للعامل."
      },
      {
        "en": "A copy of commercial register.",
        "ar": "صورة من السجل التجاري."
      }
    ],
    "conditions": []
  },
  {
    "id": 578,
    "ministry": 100,
    "name": {
      "en": "Manage Establishment Owners - Business",
      "ar": "إدارة مُلاك المنشأة - أعمال"
    },
    "fees": 256,
    "previous": 246,
    "days": 5,
    "desc": {
      "en": "This service allows you to easily modify and manage facility owners’ data, which contributes to updating the information accurately and effectively.",
      "ar": "تُتيح هذه الخدمة تعديل وإدارة بيانات ملاك المنشأة بسهولة، مما يساهم في تحديث المعلومات بشكل دقيق وفعّال."
    },
    "docs": [
      {
        "en": "the commercial register/license.",
        "ar": "السجل التجاري/الترخيص."
      },
      {
        "en": "a Memorandum of Association (for companies only).",
        "ar": "عقد تأسيس (للشركات فقط)."
      },
      {
        "en": "ID photo.",
        "ar": "صورة الهوية."
      }
    ],
    "conditions": []
  },
  {
    "id": 300,
    "ministry": 34,
    "name": {
      "en": "Issuance of a Commercial License",
      "ar": "إصدار رخصة تجارية"
    },
    "fees": 400,
    "previous": 384,
    "days": 10,
    "desc": {
      "en": "Through this service, you can start doing business by issuing a commercial activity license in addition to a safety permit issued by the General Directorate of Civil Defense for all commercial activities approved by the Ministry of Municipalities and Housing.",
      "ar": "من خلال هذه الخدمة يمكنك البدء بممارسة العمل التجاري من خلال إصدار رخصة نشاط تجاري بالإضافة إلى تصريح السلامة الصادر من المديرية العامة للدفاع المدني لجميع الأنشطة التجارية المعتمدة لدى وزارة البلديات والإسكان."
    },
    "docs": [
      {
        "en": "An external photo of the store, with the store sign highlighted.",
        "ar": "صورة خارجية للمحل ويتم إبراز لوحة المحل."
      },
      {
        "en": "The lease contract, title deed, or investment contract for the site from the municipality or other government agencies.",
        "ar": "عقد الإيجار أو صك الملكية أو عقد الاستثمار للموقع من البلدية أو الجهات الحكومية الأخرى."
      },
      {
        "en": "Cleaning contract (optional depending on the contract and type of activity).",
        "ar": "عقد النظافة (اختياري حسب التعاقد ونوع النشاط)."
      },
      {
        "en": "Safety equipment invoice or safety report from civil defense for immediate activities.",
        "ar": "فاتورة أدوات السلامة أو تقرير سلامة من الدفاع المدني للأنشطة الفورية."
      },
      {
        "en": "A copy of the building permit.",
        "ar": "صورة من رخصة البناء."
      },
      {
        "en": "A copy of the Commercial Register in a pdf file.",
        "ar": "صورة السجل التجاري بصيغة Pdf."
      }
    ],
    "conditions": [
      {
        "en": "Government fees are calculated according to activity.",
        "ar": "يتم حساب الرسوم الحكومية حسب النشاط."
      },
      {
        "en": "For the Commercial Register to be valid.",
        "ar": "أن يكون السجل التجاري ساري."
      },
      {
        "en": "The existence of a rental contract and cleaning contract registered with the Commercial Register.",
        "ar": "وجود عقد إيجار وعقد نظافة تابعين للسجل التجاري."
      },
      {
        "en": "Locate the location and fill in the details of the shop or vehicle",
        "ar": "تحديد الموقع وتعبئة تفاصيل المحل أو العربة"
      }
    ]
  },
  {
    "id": 301,
    "ministry": 34,
    "name": {
      "en": "Renewal of a Commercial License",
      "ar": "تجديد رخصة تجارية"
    },
    "fees": 80,
    "previous": 77,
    "days": 10,
    "desc": {
      "en": "Through this service, you can enhance the continuity of your business, as this service enables you to renew your commercial license, and you can also renew and amend the license data. There are two types of renewal, immediate and non-immediate, depending on the activity and location of your facility.",
      "ar": "من خلال هذه الخدمة يمكنك تعزيز استمرارية عملك التجاري حيث تمكنك هذه الخدمة من تجديد رخصتك التجارية، كما يمكنك تجديد مع تعديل بيانات الرخصة. وهنالك نوعين من التجديد فوري وغير فوري حسب النشاط وموقع منشأتك."
    },
    "docs": [
      {
        "en": "The lease contract, title deed, or investment contract for the site from the municipality or other government agencies.",
        "ar": "عقد الإيجار أو صك الملكية أو عقد الاستثمار للموقع من البلدية أو الجهات الحكومية الأخرى."
      },
      {
        "en": "Cleaning contract (optional depending on the contract and type of activity).",
        "ar": "عقد النظافة (اختياري حسب التعاقد ونوع النشاط)."
      },
      {
        "en": "Providing a safety equipment certificate through safety companies, a technical report through engineering offices accredited by the General Directorate of Civil Defense, or a safety permit depending on the nature of the activity in the commercial license.",
        "ar": "توفر شهادة أدوات سلامة من خلال شركات السلامة أو تقرير فني من خلال المكاتب الهندسية المعتمدة لدى المديرية العامة للدفاع المدني أو تصريح سلامة حسب طبيعة النشاط بالرخصة التجارية."
      },
      {
        "en": "Picture of the storefront.",
        "ar": "صورة واجهة المحل."
      },
      {
        "en": "The Commercial Register in pdf file.",
        "ar": "صورة السجل التجاري بصيغة pdf."
      },
      {
        "en": "A copy of the National Address.",
        "ar": "صورة العنوان الوطني."
      }
    ],
    "conditions": [
      {
        "en": "Government fees are calculated according to activity and number of renewal years.",
        "ar": "يتم حساب الرسوم الحكومية حسب النشاط وعدد سنوات التجديد."
      },
      {
        "en": "For the Commercial Register to be valid.",
        "ar": "أن يكون السجل التجاري ساري."
      },
      {
        "en": "The rental contract and cleaning contract must be registered with the Commercial Register.",
        "ar": "وجود عقد إيجار وعقد نظافة تابعين للسجل التجاري."
      }
    ]
  },
  {
    "id": 302,
    "ministry": 34,
    "name": {
      "en": "Cancellation of a Commercial Activity License",
      "ar": "إلغاء رخصة نشاط تجاري"
    },
    "fees": 80,
    "previous": 77,
    "days": 10,
    "desc": {
      "en": "At the stage of terminating the practice of commercial business, the beneficiary must cancel his/ her commercial license associated with the facility, and through this service, you can cancel the license for the following activities, for example, but not limited to: A business license, environment licenses, an industrial company license, a medical company license, a food company license, a tourism company license, and a professional institution license. etc.",
      "ar": "في مرحلة إنهاء ممارسة العمل التجاري يتوجب على المستفيد إلغاء رخصته التجارية المرتبطة بالمنشأة، ومن خلال هذه الخدمة يمكنك عمل ذلك للأنشطة التالية على سبيل المثال لا الحصر: رخصة أعمال، تراخيص البيئة، ترخيص شركة صناعية، ترخيص شركة طبية، ترخيص شركة أطعمة، ترخيص شركة سياحة، ترخيص مؤسسة احترافية .. إلخ."
    },
    "docs": [
      {
        "en": "A copy of the Commercial Register",
        "ar": "صورة السجل التجاري."
      },
      {
        "en": "A copy of the Commercial License needed to be cancelled.",
        "ar": "صورة الرخصة التجارية المطلوب إلغائها."
      },
      {
        "en": "A copy of the ID.",
        "ar": "صورة الهوية."
      }
    ],
    "conditions": [
      {
        "en": "The Commercial License must be cancelled before the commercial register is cancelled.",
        "ar": "يجب أن يتم إلغاء رخصة النشاط التجاري قبل شطب السجل التجاري."
      },
      {
        "en": "The license will be automatically revoked one year after the license expires.",
        "ar": "سوف يتم إلغاء الرخصة بشكل آلــي بعد مرور سنة وأكثر من انتهاء الرخصة."
      },
      {
        "en": "Delayed cancellation of license exposes you to pay renewal fees upon cancellation in accordance with the Executive Regulation of Municipal Licensing Procedures AED 1438.",
        "ar": "تأخرك في إلغاء الرخصة يعرضك لدفع رسوم تجديد عند الإلغاء وذلك وفقًــا للائحة التنفيذية لإجراءات التراخيص البلدية 1438 هـ."
      },
      {
        "en": "Cancellation fee is 20 SAR with the license required to be valid.",
        "ar": "رسوم الإلغاء 20 ريال مع ضرورة أن تكون الرخصة سارية."
      }
    ]
  },
  {
    "id": 303,
    "ministry": 34,
    "name": {
      "en": "Transfer of Commercial License Ownership",
      "ar": "نقل ملكية رخصة تجارية"
    },
    "fees": 160,
    "previous": 154,
    "days": 10,
    "desc": {
      "en": "Transfer of Trade License Ownership Through this service, the old owner can submit a request to transfer his trade license to another owner.",
      "ar": "من خلال هذه الخدمة يمكن للمالك القديم تقديم طلب بنقل ملكية رخصته التجارية إلى مالك آخر، وذلك للأنشطة التالية على سبيل المثال لا الحصر: رخصة أعمال، تراخيص البيئة، ترخيص شركة صناعية، ترخيص شركة طبية، ترخيص شركة أطعمة، ترخيص شركة سياحة، ترخيص مؤسسة احترافية .. إلخ."
    },
    "docs": [
      {
        "en": "Copy of the Commercial Register.",
        "ar": "صوره السجل التجاري."
      },
      {
        "en": "A copy of the new owner's ID.",
        "ar": "صوره هوية المالك الجديد."
      },
      {
        "en": "A copy of the trade license to be transferred.",
        "ar": "صورة الرخصة التجارية المراد نقلها."
      }
    ],
    "conditions": [
      {
        "en": "Existence of a commercial license, as it is not permitted to transfer the ownership of a mobile vehicle license.",
        "ar": "وجود رخصة تجارية حيث لا يسمح بنقل ملكية رخصة عربات متنقلة."
      }
    ]
  },
  {
    "id": 63,
    "ministry": 6,
    "name": {
      "en": "Application for amending a commercial agency",
      "ar": "طلب تعديل قيد وكالة تجارية"
    },
    "fees": 4000,
    "previous": 3840,
    "days": 1,
    "desc": {
      "en": "This service enables you to amend the data in the terms of the contract, whether you are the agent or the principal with the agreement of both parties.",
      "ar": "تُمكّنك هذه الخدمة من تعديل البيانات في بنود العقد سواء كنت الوكيل أو الموكل باتفاق الطرفين."
    },
    "docs": [
      {
        "en": "1- A copy of the amended contract.",
        "ar": "1- نسخة من العقد المعدَل."
      },
      {
        "en": "2- A letter from the foreign client stating that the contract has been amended if (the client is a foreigner).",
        "ar": "2- خطاب من الموكل الأجنبي يفيد بتعديل العقد إذا كان (الموكل أجنبي)."
      },
      {
        "en": "3- A letter from the Saudi client stating that the contract has been amended if it is between (two Saudi parties).",
        "ar": "3- خطاب من الموكل السعودي يفيد بتعديل العقد إذا كان بين (طرفين سعوديين)."
      },
      {
        "en": "4- If both parties to the contract are Saudis, the contract shall be attested by the Chamber of Commerce and Industry in the Kingdom.",
        "ar": "4- خطاب من الموكل السعودي على مطبوعاته يفيد بتعديل العقد بناء على ما ذكر في العقد المبرم بين الطرفين."
      },
      {
        "en": "5- If the article “amending the basic contract” is not mentioned, the amendment shall be made according to the conclusion of a new contract between the two parties.",
        "ar": "5- خطاب من الموكل الأجنبي يفيد بتعديل العقد بالإشارة إلى البند المُعدّل وإثبات التعديل الجديد أو بإثبات الإضافة فقط إذا كان الأمر مُجرّد إضافة."
      },
      {
        "en": "6- A copy of the authorization, if any.",
        "ar": "6- صورة من التفويض إن وجد."
      }
    ],
    "conditions": [
      {
        "en": "1- Ministry of Foreign Affairs - Chamber of Commerce in the client's country \"if any\"- Saudi Embassy in the client's country - Saudi Ministry of Foreign Affairs - Saudi Chamber of Commerce and Industry",
        "ar": "1- إذا كان الموكل أجنبي يتم تصديق العقد الأصلي من جهات الاختصاص التالية: وزارة الخارجية-الغرفة التجارية في بلد الموكل \"إن وجدت\" -السفارة السعودية في بلد الموكل- أو تصديق أبوستيل إذا كان (الموكل أجنبي).\""
      },
      {
        "en": "2- If both parties to the contract are Saudis, the contract shall be attested by the Chamber of Commerce and Industry in the Kingdom.",
        "ar": "2- إذا كان طرفي العقد سعوديين يتم تصديق العقد من الغرفة التجارية بالمملكة."
      }
    ]
  },
  {
    "id": 65,
    "ministry": 6,
    "name": {
      "en": "Application for renewal of Commercial Agency",
      "ar": "طلب تجديد قيد وكالة تجارية"
    },
    "fees": 1200,
    "previous": 1152,
    "days": 1,
    "desc": {
      "en": "This service enables the agent or distributor to continue carrying out the tasks entrusted to him by foreign companies or Saudi companies.",
      "ar": "تمكن هذه الخدمة من استمرار الوكيل أو الموزع في مهامه الموكلة إليه من الشركات الأجنبية أو الشركات السعودية ."
    },
    "docs": [
      {
        "en": "1- A copy of the expired commercial agency.",
        "ar": "1 صورة عن الوكالة التجارية المنتهية."
      },
      {
        "en": "2- A letter from the foreign principal stating the renewal of the contract based on what was mentioned in the contract concluded between the two parties, and the letter is attested by the Ministry of Foreign Affairs in the client’s country and the Saudi embassy in the client’s country.",
        "ar": "2- خطاب من الموكل الأجنبي يفيد بتجديد العقد إذا كان الموكل أجنبي."
      },
      {
        "en": "3- A letter from the Saudi client stating the renewal of the contract if it is between (two Saudi parties).",
        "ar": "3- خطاب من الموكل السعودي يفيد بتجديد العقد إذا كان بين (طرفيين سعوديين)."
      }
    ],
    "conditions": [
      {
        "en": "1- A letter from the foreign principal stating the renewal of the contract based on what was mentioned in the contract concluded between the two parties. The letter is attested by the Ministry of Foreign Affairs in the client’s country and the Saudi embassy in the client’s country or an apostille attestation",
        "ar": "1- خطاب من الموكل الأجنبي يفيد بتجديد العقد بناءً على ما ذكر في العقد المبرم بين الطرفين و يتم تصديق الخطاب من وزارة الخارجية ببلد الموكل والسفارة السعودية في بلد الموكل أو تصديق ابوستيل."
      },
      {
        "en": "2- A letter from the Saudi principal stating the renewal of the contract based on what was mentioned in the contract concluded between the two parties, and the letter is endorsed by the Chamber of Commerce and Industry in the Kingdom",
        "ar": "2- خطاب من الموكل السعودي يفيد بتجديد العقد بناءً على ما ذكر في العقد المبرم بين الطرفين ويصادق على الخطاب من الغرفة التجارية الصناعية بالمملكة."
      }
    ]
  },
  {
    "id": 66,
    "ministry": 6,
    "name": {
      "en": "Application for registering a Commercial Agency",
      "ar": "طلب تسجيل قيد وكالة تجارية"
    },
    "fees": 4000,
    "previous": 3840,
    "days": 1,
    "desc": {
      "en": "This service enables the agent or distributor the right to engage in commercial agency activity on behalf of Saudi companies or establishments or foreign companies contracted with in the Kingdom under a commercial agency contract between the two parties.",
      "ar": "تمكن هذه الخدمة للوكيل أو الموزع حق مزاولة نشاط الوكالات التجارية عن الشركات أو المؤسسات السعودية أو الشركات الأجنبية المتعاقد معها في المملكة بموجب عقد وكالة تجارية بين الطرفين.."
    },
    "docs": [
      {
        "en": "1- A Copy of the Commercial Register.",
        "ar": "1- صورة من السجل التجاري."
      },
      {
        "en": "2- The Contract, and its attachments (If any).",
        "ar": "2- صورة العقد، وملحقاته (إن وجدت)."
      },
      {
        "en": "3- National Address.",
        "ar": "3- العنوان الوطني."
      },
      {
        "en": "4- Required Data: (ID Number - Email - Absher Phone Number).",
        "ar": "4- البيانات المطلوبة: (رقم الهوية - البريد الإلكتروني - رقم جوال أبشر)"
      },
      {
        "en": "5- A copy of the authorization, if any",
        "ar": "5- صورة من التفويض ان وجد"
      }
    ],
    "conditions": [
      {
        "en": "1- Existence of a commercial register identical to the agency's activity.",
        "ar": "1- وجود سجل تجاري مطابق لنشاط الوكالة."
      },
      {
        "en": "2- The agent companies or institutions must be entirely Saudi with 100% Saudi capital.",
        "ar": "2- أن تكون الشركات أو المؤسسات الوكيلة سعودية بالكامل برأس مال سعودي 100%."
      },
      {
        "en": "3- If both parties to the contract are Saudis, the contract shall be attested by the Chamber of Commerce and Industry in the Kingdom for both parties.",
        "ar": "3- إذا كان طرفي العقد سعوديين يتم تصديق العقد من الغرفة التجارية الصناعية بالمملكة لكل الطرفين"
      },
      {
        "en": "4- If the principal is a foreigner, the original contract shall be attested by the following jurisdictions: The Ministry of Foreign Affairs in the client’s country - The Chamber of Commerce in the principal’s country \"if any\" - The Saudi Embassy in the principal’s country - The Saudi Ministry of Foreign Affairs - The Saudi Chamber of Commerce and Industry, or Apostille authentication.",
        "ar": "4- إذا كان الموكل أجنبي يتم تصديق العقد الأصلي من جهات الاختصاص التالية :وزارة الخارجية في بلد الموكل - الغرفة التجارية في بلد الموكل \"إن وجدت\" - السفارة السعودية في بلد الموكل - وزارة الخارجية السعودية - الغرفة التجارية الصناعية السعودية، أو تصديق ابوستيل."
      },
      {
        "en": "5- A contract must be made with the producing company (the mother) or whoever replaces it in its country of origin directly, without any intermediary outside its country.",
        "ar": "5- يجب التعاقد مع الشركة المنتجة (الأم) أو من يقوم مقامها في بلدها الأصلي مباشرة دون أي وسيط خارج دولتها."
      }
    ]
  },
  {
    "id": 68,
    "ministry": 6,
    "name": {
      "en": "Application for Writing off A commercial Agency by the Agent",
      "ar": "طلب شطب قيد وكالة تجارية من قبل الوكيل"
    },
    "fees": 4000,
    "previous": 3840,
    "days": 1,
    "desc": {
      "en": "This service enables you, whether you are an agent or distributor, to submit a request to stop practicing commercial agency activity on behalf of Saudi or foreign companies and to strike off the agency from the CR.",
      "ar": "تُمكنك هذه الخدمة سواء كنت وكيل أو موزع من تقديم طلب التوقف عن ممارسة نشاط الوكالات التجارية عن الشركات السعودية أو الأجنبية وشطب الوكالة من السجلات التجارية."
    },
    "docs": [
      {
        "en": "A copy of the attorney to be deleted.",
        "ar": "صورة من الوكالة المراد إلغائها."
      }
    ],
    "conditions": [
      {
        "en": "Submission of a letter on the publications of the Saudi agent stating the cancellation of the commercial agency, approved by the Chamber of Commerce.",
        "ar": "تقديم خطاب على مطبوعات الوكيل السعودي يفيد فيه بشطب الوكالة التجارية مصادق عليه من الغرفة التجارية."
      }
    ]
  }
]

export const phoneNews: PhoneNews[] = [
  {
    "handle": "mojksa",
    "name": {
      "en": "Ministry of Justice",
      "ar": "وزارة العدل"
    },
    "avatar": "/images/app/news/mojksa.webp",
    "date": "2026-10-23T15:16:00+03:00",
    "text": "وافق معالي وزير العدل على اللائحة التنفيذية لنظام التنفيذ، على أن يبدأ العمل بها بالتزامن مع سريان النظام في 29 أكتوبر 2026م.\n\n#نظام_التنفيذ",
    "url": "https://x.com/MojKsa/status/2113605490466803992"
  },
  {
    "handle": "sauditransport",
    "name": {
      "en": "Ministry of Transport & Logistics",
      "ar": "وزارة النقل والخدمات اللوجستية"
    },
    "avatar": "/images/app/news/sauditransport.webp",
    "date": "2026-10-22T21:35:00+03:00",
    "text": "التقى معالي وزير النقل والخدمات اللوجستية @SalehAlJasser، بسعادة سفير جمهورية مصر العربية لدى المملكة حاتم السيد عبدالقادر، وجرى خلال اللقاء مناقشة عدد من الملفات ذات الاهتمام المشترك في مجال النقل والخدمات اللوجستية بين البلدين.\n\n#مسارات_دولية\n#وزارة_النقل_والخدمات_اللوجستية",
    "url": "https://x.com/SaudiTransport/status/2113338497020887226"
  },
  {
    "handle": "saudigosi",
    "name": {
      "en": "GOSI",
      "ar": "التأمينات الاجتماعية"
    },
    "avatar": "/images/app/news/saudigosi.webp",
    "date": "2026-10-22T16:15:00+03:00",
    "text": "استقرار يدوم، عبر برامج تعزز الوعي وتشجع على التخطيط المالي المبكر",
    "url": "https://x.com/SaudiGOSI/status/2113257870074450249"
  },
  {
    "handle": "mcgovsa",
    "name": {
      "en": "Ministry of Commerce",
      "ar": "وزارة التجارة"
    },
    "avatar": "/images/app/news/mcgovsa.webp",
    "date": "2026-10-21T14:00:00+03:00",
    "text": "6,936 زيارة تفتيشية إلكترونية للوقوف على امتثال المتاجر الإلكترونية\nللاطلاع على نشرة المستهلك للربع الثالث 2026:",
    "url": "https://x.com/MCgovSA/status/2112861471323357691"
  },
  {
    "handle": "hrsd_sa",
    "name": {
      "en": "Human Resources & Social Development",
      "ar": "الموارد البشرية والتنمية الاجتماعية"
    },
    "avatar": "/images/app/news/hrsd_sa.webp",
    "date": "2026-10-21T13:32:00+03:00",
    "text": "طوّر مهاراتك، وواكب متطلبات سوق العمل مع \"مسرعة المهارات\"، وتعرّف على خطوات التسجيل للاستفادة من دوراتها التدريبية.",
    "url": "https://x.com/HRSD_SA/status/2112854483608686768"
  }
]
