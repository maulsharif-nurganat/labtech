// Full category tree matching labtech.kz + Supabase structure
// IDs and slugs MUST match Supabase categories table exactly

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
  // ── TOP LEVEL ─────────────────────────────────────────────────────────────
  { id: "cat-01", slug: "kliniko-diagnosticheskaya-laboratoriya", name: "Клинико-диагностическая лаборатория", parent_id: null, image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "cat-02", slug: "mikroskopy",                             name: "Микроскопы",                         parent_id: null, image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "cat-03", slug: "obshchelaboratornoe",                    name: "Общелабораторное оборудование",      parent_id: null, image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "cat-04", slug: "reagenty-i-krasiteli",                   name: "Реагенты и красители",               parent_id: null, image_url: null, sort_order: 4,  is_active: true, created_at: "" },
  { id: "cat-05", slug: "veterinariya",                           name: "Ветеринария",                        parent_id: null, image_url: null, sort_order: 5,  is_active: true, created_at: "" },
  { id: "cat-06", slug: "chistye-pomeshcheniya",                  name: "Чистые помещения",                   parent_id: null, image_url: null, sort_order: 6,  is_active: true, created_at: "" },
  { id: "cat-07", slug: "laboratornaya-posuda",                   name: "Лабораторная посуда",                parent_id: null, image_url: null, sort_order: 7,  is_active: true, created_at: "" },
  { id: "cat-08", slug: "nebulayizery",                           name: "Небулайзеры",                        parent_id: null, image_url: null, sort_order: 8,  is_active: true, created_at: "" },
  { id: "cat-09", slug: "ptsr-laboratoriya",                      name: "ПЦР лаборатория",                    parent_id: null, image_url: null, sort_order: 9,  is_active: true, created_at: "" },
  { id: "cat-16", slug: "avtomatizatsiya-ptsr-laboratorii",       name: "Автоматизация ПЦР-лаборатории",      parent_id: null, image_url: null, sort_order: 10, is_active: true, created_at: "" },
  { id: "cat-17", slug: "dezinfitsiruyushchie-sredstva",          name: "Дезинфицирующие средства",           parent_id: null, image_url: null, sort_order: 11, is_active: true, created_at: "" },
  { id: "cat-18", slug: "diagnostika-diabeta",                    name: "Диагностика диабета",                parent_id: null, image_url: null, sort_order: 12, is_active: true, created_at: "" },
  { id: "cat-19", slug: "tonometry",                              name: "Тонометры",                          parent_id: null, image_url: null, sort_order: 13, is_active: true, created_at: "" },
  { id: "cat-20", slug: "biokhimicheskaya-laboratoriya",          name: "Биохимическая лаборатория",          parent_id: null, image_url: null, sort_order: 20, is_active: true, created_at: "" },
  { id: "cat-21", slug: "ifa-laboratoriya",                       name: "ИФА Лаборатория",                    parent_id: null, image_url: null, sort_order: 21, is_active: true, created_at: "" },

  // ── КЛИНИКО-ДИАГНОСТИЧЕСКАЯ ЛАБОРАТОРИЯ ───────────────────────────────────
  { id: "c-01-01", slug: "analizatory-gematologicheskie",          name: "Анализаторы гематологические",        parent_id: "cat-01", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-01-02", slug: "analizatory-mochi",                      name: "Анализаторы мочи",                    parent_id: "cat-01", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-01-03", slug: "gemoglobinometry",                       name: "Гемоглобинометры",                    parent_id: "cat-01", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-01-04", slug: "koagulometry",                           name: "Коагулометры",                        parent_id: "cat-01", image_url: null, sort_order: 4, is_active: true, created_at: "" },

  // ── ОБЩЕЛАБОРАТОРНОЕ ОБОРУДОВАНИЕ ─────────────────────────────────────────
  { id: "c-03-01", slug: "vorteksy-vstryakhivateli-rotatory-meshalki",             name: "Вортексы, встряхиватели, ротаторы, мешалки",            parent_id: "cat-03", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-03-02", slug: "shejkery-termostaty-termostaty-shejkery-vodyanye-bani",  name: "Шейкеры, термостаты, термостаты-шейкеры, водяные бани", parent_id: "cat-03", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-03-03", slug: "tsentrifugi",                                             name: "Центрифуги",                                            parent_id: "cat-03", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-03-04", slug: "doziruyushchie-prinadlezhnosti",                          name: "Дозирующие принадлежности",                             parent_id: "cat-03", image_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: "c-03-05", slug: "sistemy-dlya-vzyatiya-biomaterialov",                    name: "Системы для взятия биоматериалов",                      parent_id: "cat-03", image_url: null, sort_order: 5, is_active: true, created_at: "" },

  // ── РЕАГЕНТЫ И КРАСИТЕЛИ ──────────────────────────────────────────────────
  { id: "c-04-01", slug: "krasiteli",                 name: "Красители",                parent_id: "cat-04", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-11-02", slug: "reagenty-dlya-ptsr",        name: "Реагенты для ПЦР",         parent_id: "cat-04", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-04-03", slug: "reagenty-dlya-ifa",         name: "Реагенты для ИФА",         parent_id: "cat-04", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-04-04", slug: "reagenty-dlya-biokhimii",   name: "Реагенты для биохимии",    parent_id: "cat-04", image_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: "c-04-05", slug: "reagenty-dlya-gematologii", name: "Реагенты для гематологии", parent_id: "cat-04", image_url: null, sort_order: 5, is_active: true, created_at: "" },
  { id: "c-04-06", slug: "ekspress-testy",            name: "Экспресс тесты",           parent_id: "cat-04", image_url: null, sort_order: 6, is_active: true, created_at: "" },

  // ── ЧИСТЫЕ ПОМЕЩЕНИЯ ──────────────────────────────────────────────────────
  { id: "c-06-01", slug: "boksy-2-klassa-zashchity",    name: "Боксы 2 класса защиты",    parent_id: "cat-06", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-06-02", slug: "ptsr-boksy",                  name: "ПЦР боксы",                parent_id: "cat-06", image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "c-06-03", slug: "vytyazhnye-shkafy",           name: "Вытяжные шкафы",           parent_id: "cat-06", image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "c-06-04", slug: "obluchateli-retsirkulyatory", name: "Облучатели-рециркуляторы", parent_id: "cat-06", image_url: null, sort_order: 4, is_active: true, created_at: "" },

  // ── РЕАГЕНТЫ ДЛЯ ПЦР (3rd level) ────────────────────────────────────────
  { id: "sub-pcr-01", slug: "urogenitalnye-infektsii",       name: "Урогенитальные инфекции",           parent_id: "c-11-02", image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "sub-pcr-02", slug: "respiratornye-infektsii",       name: "Респираторные инфекции",            parent_id: "c-11-02", image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "sub-pcr-03", slug: "kishechnye-infektsii",          name: "Кишечные инфекции",                 parent_id: "c-11-02", image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "sub-pcr-04", slug: "gerpesvirusnye-infektsii",      name: "Герпесвирусные инфекции",           parent_id: "c-11-02", image_url: null, sort_order: 4,  is_active: true, created_at: "" },
  { id: "sub-pcr-05", slug: "virusnye-gepatity",             name: "Вирусные гепатиты",                 parent_id: "c-11-02", image_url: null, sort_order: 5,  is_active: true, created_at: "" },
  { id: "sub-pcr-06", slug: "vich-infektsiya",               name: "ВИЧ-инфекция",                      parent_id: "c-11-02", image_url: null, sort_order: 6,  is_active: true, created_at: "" },
  { id: "sub-pcr-07", slug: "tuberkulez",                    name: "Туберкулёз",                        parent_id: "c-11-02", image_url: null, sort_order: 7,  is_active: true, created_at: "" },
  { id: "sub-pcr-08", slug: "onkomarkery-ptsr",              name: "Онкомаркеры",                       parent_id: "c-11-02", image_url: null, sort_order: 8,  is_active: true, created_at: "" },
  { id: "sub-pcr-09", slug: "tsvetnye-patogeny",             name: "Клещевые патогены",                 parent_id: "c-11-02", image_url: null, sort_order: 9,  is_active: true, created_at: "" },
  { id: "sub-pcr-10", slug: "gribkovye-infektsii",           name: "Грибковые инфекции",                parent_id: "c-11-02", image_url: null, sort_order: 10, is_active: true, created_at: "" },
  { id: "sub-pcr-11", slug: "koronavirus",                   name: "Коронавирус",                       parent_id: "c-11-02", image_url: null, sort_order: 11, is_active: true, created_at: "" },
  { id: "sub-pcr-12", slug: "grippa-orvi",                   name: "Грипп и ОРВИ",                      parent_id: "c-11-02", image_url: null, sort_order: 12, is_active: true, created_at: "" },
  { id: "sub-pcr-13", slug: "neyroinfektsii",                name: "Нейроинфекции",                     parent_id: "c-11-02", image_url: null, sort_order: 13, is_active: true, created_at: "" },
  { id: "sub-pcr-14", slug: "krov-perenosibye-infektsii",    name: "Кровепереносимые инфекции",         parent_id: "c-11-02", image_url: null, sort_order: 14, is_active: true, created_at: "" },
  { id: "sub-pcr-15", slug: "parazitarnye-infektsii",        name: "Паразитарные инфекции",             parent_id: "c-11-02", image_url: null, sort_order: 15, is_active: true, created_at: "" },
  { id: "sub-pcr-16", slug: "biotsenoz",                     name: "Биоценоз",                          parent_id: "c-11-02", image_url: null, sort_order: 16, is_active: true, created_at: "" },

  // ── РЕАГЕНТЫ ДЛЯ ИФА (3rd level) ────────────────────────────────────────
  { id: "sub-ifa-01", slug: "ifa-infektsii",                 name: "Инфекционные заболевания",          parent_id: "c-04-03", image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "sub-ifa-02", slug: "ifa-gormonalnyy",               name: "Гормональный статус",               parent_id: "c-04-03", image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "sub-ifa-03", slug: "ifa-onkomarkery",               name: "Онкомаркеры",                       parent_id: "c-04-03", image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "sub-ifa-04", slug: "ifa-autoimmun",                 name: "Аутоиммунные заболевания",          parent_id: "c-04-03", image_url: null, sort_order: 4,  is_active: true, created_at: "" },

  // ── РЕАГЕНТЫ ДЛЯ БИОХИМИИ (3rd level) ───────────────────────────────────
  { id: "sub-bio-01", slug: "bio-fermentnye",                name: "Ферментные показатели",             parent_id: "c-04-04", image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "sub-bio-02", slug: "bio-lipidnyy",                  name: "Липидный профиль",                  parent_id: "c-04-04", image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "sub-bio-03", slug: "bio-belki",                     name: "Белки и фракции",                   parent_id: "c-04-04", image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "sub-bio-04", slug: "bio-elektricity",               name: "Электролиты",                       parent_id: "c-04-04", image_url: null, sort_order: 4,  is_active: true, created_at: "" },
  { id: "sub-bio-05", slug: "bio-glyukoza",                  name: "Глюкоза и метаболиты",              parent_id: "c-04-04", image_url: null, sort_order: 5,  is_active: true, created_at: "" },

  // ── РЕАГЕНТЫ ДЛЯ ГЕМАТОЛОГИИ (3rd level) ────────────────────────────────
  { id: "sub-hem-01", slug: "hem-kontrolnye",                name: "Контрольные материалы",             parent_id: "c-04-05", image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "sub-hem-02", slug: "hem-krasiteli",                 name: "Красители для гематологии",         parent_id: "c-04-05", image_url: null, sort_order: 2,  is_active: true, created_at: "" },

  // ── ЛАБОРАТОРНАЯ ПОСУДА ───────────────────────────────────────────────────
  { id: "c-07-01", slug: "posuda-iz-stekla",   name: "Посуда из стекла",   parent_id: "cat-07", image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "c-07-02", slug: "posuda-iz-plastika", name: "Посуда из пластика", parent_id: "cat-07", image_url: null, sort_order: 2, is_active: true, created_at: "" },

  // ── ВЕТЕРИНАРИЯ ──────────────────────────────────────────────────────────
  { id: "c-13-01", slug: "vet-laboratornoe-oborudovanie",        name: "Лабораторное оборудование",       parent_id: "cat-05", image_url: null, sort_order: 1,  is_active: true, created_at: "" },
  { id: "c-13-02", slug: "vet-funktsionalnoe-oborudovanie",      name: "Функциональное оборудование",     parent_id: "cat-05", image_url: null, sort_order: 2,  is_active: true, created_at: "" },
  { id: "c-13-03", slug: "vet-obshchelaboratornoe",              name: "Общелабораторное оборудование",   parent_id: "cat-05", image_url: null, sort_order: 3,  is_active: true, created_at: "" },
  { id: "c-13-04", slug: "vet-chistye-pomeshcheniya",            name: "Чистые помещения",                parent_id: "cat-05", image_url: null, sort_order: 4,  is_active: true, created_at: "" },
  { id: "c-13-05", slug: "vet-laboratornaya-posuda",             name: "Лабораторная посуда",             parent_id: "cat-05", image_url: null, sort_order: 5,  is_active: true, created_at: "" },
  { id: "c-13-06", slug: "vet-reagenty-i-krasiteli",             name: "Реагенты и красители",            parent_id: "cat-05", image_url: null, sort_order: 6,  is_active: true, created_at: "" },
  { id: "c-13-07", slug: "vet-dezinfitsiruyushchie-sredstva",    name: "Дезинфицирующие средства",        parent_id: "cat-05", image_url: null, sort_order: 7,  is_active: true, created_at: "" },
  { id: "c-13-08", slug: "vet-lekarstvennye-sredstva",           name: "Лекарственные средства",          parent_id: "cat-05", image_url: null, sort_order: 8,  is_active: true, created_at: "" },
  { id: "c-13-09", slug: "vet-agrodiagnostika",                  name: "Агродиагностика",                 parent_id: "cat-05", image_url: null, sort_order: 9,  is_active: true, created_at: "" },
  { id: "c-13-10", slug: "vet-immunofluorestsentnyj-analizator", name: "Иммунофлуоресцентный анализатор", parent_id: "cat-05", image_url: null, sort_order: 10, is_active: true, created_at: "" },
];

export default CATEGORIES;
