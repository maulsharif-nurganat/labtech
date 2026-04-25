// Full category tree matching labtech.kz structure (word-for-word from original site)
// Slugs are FLAT (no slashes) so URLs work with existing [category] route
// parent_id: null = top-level; parent_id: "cXX" = subcategory

export interface CatNode {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
  image_url: null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  children?: CatNode[];
}

const CATEGORIES: CatNode[] = [
  // ── TOP LEVEL ──────────────────────────────────────────────────────────────
  { id: "c-01", slug: "avtomatizatsiya-ptsr",          name: "Автоматизация ПЦР-лаборатории",        parent_id: null, image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "c-02", slug: "kliniko-diagnosticheskaya",     name: "Клинико-диагностическая лаборатория",  parent_id: null, image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "c-03", slug: "biokhimicheskaya-laboratoriya", name: "Биохимическая лаборатория",            parent_id: null, image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "c-04", slug: "ifa-laboratoriya",              name: "ИФА Лаборатория",                      parent_id: null, image_url: null, sort_order: 4,  is_active: true, created_at: "" },
  { id: "c-05", slug: "ptsr-laboratoriya",             name: "ПЦР лаборатория",                      parent_id: null, image_url: null, sort_order: 5,  is_active: true, created_at: "" },
  { id: "c-06", slug: "diagnostika-diabeta",           name: "Диагностика диабета",                  parent_id: null, image_url: null, sort_order: 6,  is_active: true, created_at: "" },
  { id: "c-07", slug: "obshchelaboratornoe",           name: "Общелабораторное оборудование",        parent_id: null, image_url: null, sort_order: 7,  is_active: true, created_at: "" },
  { id: "c-08", slug: "mikroskopy",                    name: "Микроскопы",                           parent_id: null, image_url: null, sort_order: 8,  is_active: true, created_at: "" },
  { id: "c-09", slug: "chistye-pomeshcheniya",         name: "Чистые помещения",                     parent_id: null, image_url: null, sort_order: 9,  is_active: true, created_at: "" },
  { id: "c-10", slug: "laboratornaya-posuda",          name: "Лабораторная посуда",                  parent_id: null, image_url: null, sort_order: 10, is_active: true, created_at: "" },
  { id: "c-11", slug: "reagenty-i-krasiteli",          name: "Реагенты и красители",                 parent_id: null, image_url: null, sort_order: 11, is_active: true, created_at: "" },
  { id: "c-12", slug: "dezinfitsiruyushchie-sredstva", name: "Дезинфицирующие средства",             parent_id: null, image_url: null, sort_order: 12, is_active: true, created_at: "" },
  { id: "c-13", slug: "veterinariya",                  name: "Ветеринария",                          parent_id: null, image_url: null, sort_order: 13, is_active: true, created_at: "" },
  { id: "c-14", slug: "nebulajizery",                  name: "Небулайзеры",                          parent_id: null, image_url: null, sort_order: 14, is_active: true, created_at: "" },

  // ── КЛИНИКО-ДИАГНОСТИЧЕСКАЯ ЛАБОРАТОРИЯ ────────────────────────────────────
  { id: "c-02-01", slug: "analizatory-gematologicheskie", name: "Анализаторы гематологические", parent_id: "c-02", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-02-02", slug: "analizatory-mochi",             name: "Анализаторы мочи",             parent_id: "c-02", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-02-03", slug: "gemoglobinometry",              name: "Гемоглобинометры",             parent_id: "c-02", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-02-04", slug: "koagulometry",                  name: "Коагулометры",                 parent_id: "c-02", image_url: null, sort_order: 4, is_active: true, created_at: "" },

  // ── ОБЩЕЛАБОРАТОРНОЕ ОБОРУДОВАНИЕ ──────────────────────────────────────────
  { id: "c-07-01", slug: "vorteksy-vstryakhivateli-rotatory-meshalki",            name: "Вортексы, встряхиватели, ротаторы, мешалки",             parent_id: "c-07", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-07-02", slug: "shejkery-termostaty-termostaty-shejkery-vodyanye-bani", name: "Шейкеры, термостаты, термостаты-шейкеры, водяные бани",  parent_id: "c-07", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-07-03", slug: "tsentrifugi",                                            name: "Центрифуги",                                             parent_id: "c-07", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-07-04", slug: "doziruyushchie-prinadlezhnosti",                         name: "Дозирующие принадлежности",                              parent_id: "c-07", image_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: "c-07-05", slug: "sistemy-dlya-vzyatiya-biomaterialov",                    name: "Системы для взятия биоматериалов",                       parent_id: "c-07", image_url: null, sort_order: 5, is_active: true, created_at: "" },

  // ── ЧИСТЫЕ ПОМЕЩЕНИЯ ───────────────────────────────────────────────────────
  { id: "c-09-01", slug: "boksy-2-klassa-zashchity",    name: "Боксы 2 класса защиты",    parent_id: "c-09", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-09-02", slug: "ptsr-boksy",                  name: "ПЦР боксы",                parent_id: "c-09", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-09-03", slug: "vytyazhnye-shkafy",           name: "Вытяжные шкафы",           parent_id: "c-09", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-09-04", slug: "obluchateli-retsirkulyatory", name: "Облучатели–рециркуляторы", parent_id: "c-09", image_url: null, sort_order: 4, is_active: true, created_at: "" },

  // ── ЛАБОРАТОРНАЯ ПОСУДА ────────────────────────────────────────────────────
  { id: "c-10-01", slug: "posuda-iz-stekla",   name: "Посуда из стекла",   parent_id: "c-10", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-10-02", slug: "posuda-iz-plastika", name: "Посуда из пластика", parent_id: "c-10", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-10-03", slug: "chashki-petri",      name: "Чашки петри",        parent_id: "c-10", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-10-04", slug: "probirki-eppendorf", name: "Пробирки Eppendorf", parent_id: "c-10", image_url: null, sort_order: 4, is_active: true, created_at: "" },

  // ── РЕАГЕНТЫ И КРАСИТЕЛИ ───────────────────────────────────────────────────
  { id: "c-11-01", slug: "krasiteli",                    name: "Красители",                 parent_id: "c-11", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-11-02", slug: "reagenty-dlya-ptsr",           name: "Реагенты для ПЦР",          parent_id: "c-11", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-11-03", slug: "reagenty-dlya-ifa",            name: "Реагенты для ИФА",          parent_id: "c-11", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-11-04", slug: "reagenty-dlya-biokhimii",      name: "Реагенты для биохимии",     parent_id: "c-11", image_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: "c-11-05", slug: "reagenty-dlya-gematologii",    name: "Реагенты для гематологии",  parent_id: "c-11", image_url: null, sort_order: 5, is_active: true, created_at: "" },
  { id: "c-11-06", slug: "ekspress-testy",               name: "Экспресс тесты",            parent_id: "c-11", image_url: null, sort_order: 6, is_active: true, created_at: "" },

  // ── ВЕТЕРИНАРИЯ ────────────────────────────────────────────────────────────
  { id: "c-13-01", slug: "vet-laboratornoe-oborudovanie",      name: "Лабораторное оборудование",        parent_id: "c-13", image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "c-13-02", slug: "vet-funktsionalnoe-oborudovanie",    name: "Функциональное оборудование",      parent_id: "c-13", image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "c-13-03", slug: "vet-obshchelaboratornoe",            name: "Общелабораторное оборудование",    parent_id: "c-13", image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "c-13-04", slug: "vet-chistye-pomeshcheniya",          name: "Чистые помещения",                 parent_id: "c-13", image_url: null, sort_order: 4,  is_active: true, created_at: "" },
  { id: "c-13-05", slug: "vet-laboratornaya-posuda",           name: "Лабораторная посуда",              parent_id: "c-13", image_url: null, sort_order: 5,  is_active: true, created_at: "" },
  { id: "c-13-06", slug: "vet-reagenty-i-krasiteli",           name: "Реагенты и красители",             parent_id: "c-13", image_url: null, sort_order: 6,  is_active: true, created_at: "" },
  { id: "c-13-07", slug: "vet-dezinfitsiruyushchie-sredstva",  name: "Дезинфицирующие средства",         parent_id: "c-13", image_url: null, sort_order: 7,  is_active: true, created_at: "" },
  { id: "c-13-08", slug: "vet-lekarstvennye-sredstva",         name: "Лекарственные средства",           parent_id: "c-13", image_url: null, sort_order: 8,  is_active: true, created_at: "" },
  { id: "c-13-09", slug: "vet-agrodiagnostika",                name: "Агродиагностика",                  parent_id: "c-13", image_url: null, sort_order: 9,  is_active: true, created_at: "" },
  { id: "c-13-10", slug: "vet-immunofluorestsentnyj-analizator", name: "Иммунофлуоресцентный анализатор", parent_id: "c-13", image_url: null, sort_order: 10, is_active: true, created_at: "" },
];

export default CATEGORIES;
