export type EquipmentItem = {
  category: string;
  name: string;
  qty: number | string;
  note?: string;
  catalogSlug?: string; // → /${locale}/catalog/${catalogSlug}
};

export type LabSetup = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  items: EquipmentItem[];
};

export const LAB_SETUPS: LabSetup[] = [
  {
    id: "kdl",
    slug: "kliniko-diagnosticheskaya",
    title: "Клинико-диагностическая лаборатория",
    description: "Полное оснащение КДЛ для гематологии, коагулологии, общеклинических и биохимических исследований.",
    icon: "🔬",
    color: "#2563EB",
    items: [
      { category: "Анализаторы", name: "Гематологический анализатор (автоматический)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Коагулометр (полуавтоматический)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Анализатор мочи (полуавтоматический)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Глюкометр лабораторный", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Гемоглобинометр портативный", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Анализатор СОЭ (аппарат Панченкова)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Вспомогательное оборудование", name: "Центрифуга лабораторная", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Микроскоп бинокулярный", qty: 1, catalogSlug: "mikroskopy" },
      { category: "Вспомогательное оборудование", name: "Ротатор программируемый для пробирок", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Вытяжной шкаф", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Автоклав для стерилизации", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Холодильник лабораторный +2...+8°С", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Дистиллятор воды автоматический", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Расходные материалы", name: "Система вакуумного забора крови", qty: 1, note: "стартовый набор", catalogSlug: "reagenty" },
      { category: "Расходные материалы", name: "Тест-полоски (глюкоза, гемоглобин, моча)", qty: 1, note: "стартовый набор", catalogSlug: "reagenty" },
      { category: "Расходные материалы", name: "Контейнеры для мочи", qty: 50, catalogSlug: "laboratoraya-posuda" },
      { category: "Мебель и безопасность", name: "Рабочий стол лабораторный", qty: 2 },
      { category: "Мебель и безопасность", name: "Стол раковина", qty: 1 },
      { category: "Мебель и безопасность", name: "Стеллаж для оборудования", qty: 2 },
      { category: "Мебель и безопасность", name: "Облучатель бактерицидный (однолампочный)", qty: 2 },
      { category: "Мебель и безопасность", name: "ИБП (2000 Вт)", qty: 1 },
      { category: "Мебель и безопасность", name: "Компьютер + принтер", qty: 1 },
    ],
  },
  {
    id: "biochem",
    slug: "biokhimicheskaya",
    title: "Биохимическая лаборатория",
    description: "Комплекс для биохимических исследований крови и мочи, анализа электролитов и ферментов.",
    icon: "🧪",
    color: "#16A34A",
    items: [
      { category: "Анализаторы", name: "Анализатор биохимический (автоматический)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Анализатор электролитов крови", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Расходные материалы", name: "Стартовый набор реагентов", qty: 1, catalogSlug: "reagenty" },
      { category: "Расходные материалы", name: "Система вакуумного забора крови", qty: 1, note: "для биохимии", catalogSlug: "reagenty" },
      { category: "Вспомогательное оборудование", name: "Центрифуга лабораторная", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Термостат суховоздушный до 100°С", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Холодильник лабораторный +2...+8°С", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Мебель и безопасность", name: "Рабочий стол лабораторный", qty: 2 },
      { category: "Мебель и безопасность", name: "Стол для анализатора", qty: 1 },
      { category: "Мебель и безопасность", name: "Облучатель бактерицидный", qty: 1 },
      { category: "Мебель и безопасность", name: "ИБП (1000 Вт)", qty: 1 },
      { category: "Мебель и безопасность", name: "Компьютер + принтер", qty: 1 },
    ],
  },
  {
    id: "pcr",
    slug: "ptsr-real-taym",
    title: "ПЦР-лаборатория (Real-Time)",
    description: "Молекулярно-диагностическая лаборатория для ПЦР-исследований в реальном времени.",
    icon: "🧬",
    color: "#9333EA",
    items: [
      { category: "Основное оборудование", name: "Детектирующий термоциклер Real-Time PCR", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Основное оборудование", name: "Ламинарный бокс биологической безопасности II класса", qty: 1, catalogSlug: "chistye-pomeshcheniya" },
      { category: "Основное оборудование", name: "Бокс ПЦР-рабочий (для защиты от контаминации)", qty: 1, catalogSlug: "chistye-pomeshcheniya" },
      { category: "Вспомогательное оборудование", name: "Термостат твердотельный (сухой блок)", qty: 2, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Мини-центрифуга высокоскоростная", qty: 3, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Дозатор переменного объёма (набор)", qty: 8, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Штатив для дозаторов", qty: 2 },
      { category: "Вспомогательное оборудование", name: "Система аспирации с колбой-ловушкой", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Холодильник лабораторный +2...+8°С", qty: 2, catalogSlug: "obshchelaboratornoe" },
      { category: "Расходные материалы", name: "Наконечники для дозаторов (стартовый набор)", qty: 1, catalogSlug: "laboratoraya-posuda" },
      { category: "Расходные материалы", name: "Пробирки для проб", qty: 1, note: "стартовый набор", catalogSlug: "laboratoraya-posuda" },
      { category: "Расходные материалы", name: "Стартовый набор реагентов", qty: 1, note: "под профиль клиента", catalogSlug: "reagenty" },
      { category: "Мебель и безопасность", name: "Стол для оборудования", qty: 2 },
      { category: "Мебель и безопасность", name: "Рабочий стол аналитика", qty: 1 },
      { category: "Мебель и безопасность", name: "Стулья лабораторные", qty: 3 },
      { category: "Мебель и безопасность", name: "Облучатель бактерицидный", qty: 3 },
      { category: "Мебель и безопасность", name: "ИБП (1000 Вт)", qty: 1 },
      { category: "Мебель и безопасность", name: "Компьютер + принтер", qty: 1 },
    ],
  },
  {
    id: "ifa",
    slug: "immunofermentnaya",
    title: "Лаборатория ИФА",
    description: "Иммуноферментный анализ: диагностика инфекций, гормонов щитовидной железы и онкомаркеров.",
    icon: "⚗️",
    color: "#DC2626",
    items: [
      { category: "Анализаторы", name: "Иммуноферментный ридер (планшетный фотометр)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Анализаторы", name: "Вошер (автоматическая промывалка планшетов)", qty: 1, catalogSlug: "kliniko-diagnosticheskaya" },
      { category: "Вспомогательное оборудование", name: "Термостат-шейкер для планшетов", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Термостат суховоздушный", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Центрифуга лабораторная", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Система вакуумного забора крови", qty: 1, catalogSlug: "reagenty" },
      { category: "Вспомогательное оборудование", name: "Холодильник лабораторный +2...+8°С", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Вспомогательное оборудование", name: "Комплект дозаторов с наконечниками", qty: 1, catalogSlug: "obshchelaboratornoe" },
      { category: "Расходные материалы", name: "Стартовый набор реагентов (щитовидная железа)", qty: 1, note: "под профиль клиента", catalogSlug: "reagenty" },
      { category: "Мебель и безопасность", name: "Стол лабораторный", qty: 2 },
      { category: "Мебель и безопасность", name: "Стол аналитика", qty: 1 },
      { category: "Мебель и безопасность", name: "Стол раковина", qty: 1 },
      { category: "Мебель и безопасность", name: "Облучатель бактерицидный", qty: 1 },
      { category: "Мебель и безопасность", name: "ИБП (1000 Вт)", qty: 1 },
      { category: "Мебель и безопасность", name: "Компьютер + принтер", qty: 1 },
    ],
  },
];
