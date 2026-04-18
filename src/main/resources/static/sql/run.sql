INSERT INTO countries (name, code, image_url) VALUES
                                                  ('Китай', 'CN', '/images/countries/cn.svg'),
                                                  ('Германия', 'DE', '/images/countries/de.svg'),
                                                  ('Италия', 'IT', '/images/countries/it.svg'),
                                                  ('Россия', 'RU', '/images/countries/ru.svg'),
                                                  ('США', 'US', '/images/countries/us.svg'),
                                                  ('Япония', 'JP', '/images/countries/jp.svg'),
                                                  ('Франция', 'FR', '/images/countries/fr.svg'),
                                                  ('Турция', 'TR', '/images/countries/tr.svg');

-- 2. Добавление брендов
INSERT INTO brands (name, country_id, image_url) VALUES
                                                     ('IKEA', 1, '/images/brands/ikea.jpg'),
                                                     ('Bosch', 2, '/images/brands/bosch.jpg'),
                                                     ('Tefal', 3, '/images/brands/tefal.jpg'),
                                                     ('Leroy Merlin', 4, '/images/brands/leroy.jpg');

-- 3. Добавление категорий
INSERT INTO categories (title, parent_id, description, image_url) VALUES
                                                                      ('Кухня', NULL, 'Товары для кухни', '/images/categories/kitchen.jpg'),
                                                                      ('Посуда', 1, 'Кастрюли, сковородки', '/images/categories/cookware.jpg'),
                                                                      ('Техника', 1, 'Кухонная техника', '/images/categories/appliances.jpg'),
                                                                      ('Гостиная', NULL, 'Товары для гостиной', '/images/categories/living.jpg'),
                                                                      ('Спальня', NULL, 'Товары для спальни', '/images/categories/bedroom.jpg'),
                                                                      ('Ванная', NULL, 'Товары для ванной', '/images/categories/bathroom.jpg');

-- Добавление товаров без картинок (image_url = NULL)
INSERT INTO products (sku, name, description, base_price, sale_price, count, image_url, weight_kg, length_cm, width_cm, height_cm, category_id, brand_id) VALUES

-- Кухня - Посуда (category_id = 2)
('KCH001', 'Сковорода антипригарная 28см', 'Алюминиевая сковорода с антипригарным покрытием, индукционное дно', 1500.00, 1299.00, 50, NULL, 1.2, 45, 28, 8, 2, 3),
('KCH002', 'Кастрюля нержавейка 5л', 'Кастрюля из нержавеющей стали с крышкой, подходит для всех типов плит', 2500.00, 1999.00, 30, NULL, 2.5, 25, 25, 15, 2, 3),
('KCH003', 'Набор тарелок 12шт', 'Керамические тарелки, 6 цветов, диаметр 21см', 1800.00, 1499.00, 100, NULL, 3.0, 40, 30, 10, 2, 1),
('KCH004', 'Набор ножей 6шт', 'Ножи из нержавеющей стали с пластиковыми ручками', 1200.00, 999.00, 45, NULL, 1.5, 35, 20, 5, 2, 1),
('KCH005', 'Разделочная доска бамбуковая', 'Экологичная доска для нарезки продуктов, размер 40х30см', 800.00, 699.00, 60, NULL, 1.0, 40, 30, 1, 2, 1),

-- Кухня - Техника (category_id = 3)
('KCH006', 'Электрочайник 1.7л', 'Стеклянный корпус, подсветка, автоматическое отключение', 2200.00, 1899.00, 25, NULL, 1.1, 22, 18, 25, 3, 2),
('KCH007', 'Микроволновая печь 20л', 'Мощность 700Вт, механическое управление, 5 уровней мощности', 5500.00, 4999.00, 15, NULL, 12.0, 45, 35, 28, 3, 2),
('KCH008', 'Блендер погружной', 'Мощность 800Вт, насадка-венчик, мерный стакан в комплекте', 2800.00, 2499.00, 35, NULL, 1.2, 38, 8, 8, 3, 2),
('KCH009', 'Тостер на 2 ломтика', 'Регулировка степени поджаривания, подогрев, размораживание', 1800.00, 1599.00, 40, NULL, 1.3, 28, 18, 20, 3, 2),
('KCH010', 'Мясорубка электрическая', 'Мощность 1500Вт, 3 решетки, насадка для кебаб', 4500.00, 3999.00, 20, NULL, 4.5, 35, 25, 30, 3, 2),

-- Гостиная (category_id = 4)
('GST001', 'Диван угловой', 'Обивка велюр, наполнитель ППУ, механизм еврокнижка', 35000.00, 29999.00, 5, NULL, 85.0, 250, 160, 80, 4, 1),
('GST002', 'Журнальный столик', 'Стеклянная столешница, металлический каркас, полка снизу', 4500.00, 3999.00, 20, NULL, 12.0, 100, 60, 45, 4, 1),
('GST003', 'Кресло-качалка', 'Деревянный каркас, мягкое сидение', 12000.00, 9999.00, 8, NULL, 15.0, 85, 70, 100, 4, 4),
('GST004', 'Тумба под ТВ', 'ЛДСП, 2 ящика, цвет венге/дуб', 6500.00, 5499.00, 12, NULL, 18.0, 120, 40, 50, 4, 1),
('GST005', 'Полка настенная', 'Белый глянец, 3 секции', 2800.00, 2499.00, 25, NULL, 8.0, 90, 25, 30, 4, 1),

-- Спальня (category_id = 5)
('SPL001', 'Кровать двуспальная', 'Каркас из массива сосны, изголовье мягкое', 25000.00, 19999.00, 6, NULL, 50.0, 210, 180, 100, 5, 1),
('SPL002', 'Матрас ортопедический', 'Независимые пружины, кокосовая койра, высота 20см', 12000.00, 9999.00, 15, NULL, 25.0, 200, 160, 20, 5, 1),
('SPL003', 'Подушка ортопедическая', 'Memory foam, съемный чехол, анатомическая форма', 1800.00, 1499.00, 40, NULL, 0.8, 60, 40, 12, 5, 1),
('SPL004', 'Постельное белье сатин', 'Комплект 1.5 спальный, цвет серый', 3500.00, 2999.00, 35, NULL, 1.5, 35, 25, 8, 5, 1),
('SPL005', 'Одеяло бамбуковое', 'Наполнитель бамбук, размер 172х205см', 2500.00, 1999.00, 25, NULL, 2.0, 50, 40, 15, 5, 1),

-- Ванная (category_id = 6)
('VAN001', 'Полотенце махровое', '100% хлопок, размер 70х140см', 800.00, 699.00, 60, NULL, 0.4, 30, 20, 5, 6, 1),
('VAN002', 'Набор полотенец 3шт', 'Махровые полотенца 50х90, 70х140, 90х160см', 1500.00, 1299.00, 45, NULL, 1.2, 40, 30, 8, 6, 1),
('VAN003', 'Коврик в ванную', 'Микрофибра, противоскользящая основа, 50х80см', 1200.00, 999.00, 30, NULL, 0.8, 50, 80, 1, 6, 1),
('VAN004', 'Держатель для полотенец', 'Нержавеющая сталь, 2 штанги', 950.00, 799.00, 50, NULL, 1.0, 60, 10, 8, 6, 1),
('VAN005', 'Шторка для душа', 'ПВХ, размер 180х200см, с люверсами', 650.00, 499.00, 40, NULL, 0.5, 20, 15, 5, 6, 1);


-- Добавление товаров без скидок
INSERT INTO products (sku, name, description, base_price, sale_price, count, image_url, weight_kg, length_cm, width_cm, height_cm, category_id, brand_id) VALUES

-- Кухня - Посуда (category_id = 2) - товары без скидок
('KCH011', 'Чайник заварочный стеклянный 800мл', 'Термостойкое стекло, нержавеющая крышка, съемный фильтр', 1800.00, NULL, 35, NULL, 0.6, 15, 15, 18, 2, 3),
('KCH012', 'Набор кастрюль 3шт', 'Нержавеющая сталь, крышки в комплекте, объемы 2/3/5л', 4500.00, NULL, 20, NULL, 6.0, 35, 25, 18, 2, 2),
('KCH013', 'Сковорода гриль 26см', 'Чугунная сковорода с рифленым дном, подходит для индукции', 3200.00, NULL, 15, NULL, 2.5, 45, 26, 5, 2, 3),

-- Кухня - Техника (category_id = 3) - товары без скидок
('KCH014', 'Мультиварка 5л', '8 программ, отложенный старт, подогрев, 700Вт', 6500.00, NULL, 12, NULL, 5.0, 35, 30, 25, 3, 2),
('KCH015', 'Соковыжималка шнековая', 'Медленный отжим, 200Вт, обратный ход', 8500.00, NULL, 8, NULL, 4.5, 40, 20, 30, 3, 2),
('KCH016', 'Кофемашина капельная', '1.2л, функция подогрева, антикапельная система', 4200.00, NULL, 18, NULL, 2.8, 25, 20, 30, 3, 2),

-- Гостиная (category_id = 4) - товары без скидок
('GST006', 'Пуф мягкий', 'Велюровая обивка, наполнитель пенополистирол', 2800.00, NULL, 25, NULL, 3.0, 45, 45, 40, 4, 1),
('GST007', 'Этажерка для цветов', 'Металлическая, 3 полки, черный мат', 3500.00, NULL, 15, NULL, 8.0, 60, 30, 80, 4, 1),
('GST008', 'Настенное зеркало', 'Овальное, деревянная рама, 60х80см', 3200.00, NULL, 10, NULL, 5.0, 65, 10, 85, 4, 4),

-- Спальня (category_id = 5) - товары без скидок
('SPL006', 'Комод 4 ящика', 'ЛДСП, направляющие с доводчиками', 12500.00, NULL, 7, NULL, 32.0, 80, 45, 90, 5, 1),
('SPL007', 'Прикроватная тумба', 'Массив сосны, 1 выдвижной ящик', 4500.00, NULL, 12, NULL, 12.0, 50, 40, 50, 5, 1),
('SPL008', 'Туалетный столик', 'С зеркалом, выдвижной механизм, белый глянец', 8900.00, NULL, 6, NULL, 25.0, 80, 45, 75, 5, 1),

-- Ванная (category_id = 6) - товары без скидок
('VAN006', 'Набор стаканов для зубных щеток', 'Керамика, 2 шт, белый', 650.00, NULL, 50, NULL, 0.5, 12, 12, 10, 6, 1),
('VAN007', 'Крючки на присосках 4шт', 'Металл+силикон, выдерживает до 3кг', 350.00, NULL, 80, NULL, 0.2, 15, 8, 5, 6, 1),
('VAN008', 'Диспенсер для жидкого мыла', 'Настенный, пластик, 500мл', 480.00, NULL, 60, NULL, 0.3, 12, 8, 15, 6, 1);

-- Добавление атрибутов
INSERT INTO attributes (name, code, is_filterable) VALUES
-- Цвета
('Цвет', 'color', TRUE),
('Цвет корпуса', 'body_color', TRUE),
('Цвет ручек', 'handle_color', TRUE),

-- Материалы
('Материал', 'material', TRUE),
('Материал корпуса', 'body_material', TRUE),
('Материал лезвия', 'blade_material', TRUE),
('Покрытие', 'coating', TRUE),

-- Размеры/вес
('Вес', 'weight', TRUE),
('Ширина', 'width', FALSE),
('Глубина', 'depth', FALSE),
('Высота', 'height', FALSE),
('Объем', 'volume', TRUE),

-- Технические характеристики
('Мощность', 'power', TRUE),
('Тип управления', 'control_type', TRUE),
('Количество программ', 'programs_count', TRUE),
('Напряжение', 'voltage', FALSE),

-- Прочие
('Коллекция', 'collection', TRUE),
('Страна производства', 'manufacture_country', TRUE),
('Гарантия', 'warranty', TRUE),
('Уход', 'care_instructions', FALSE);

-- Вставка значений атрибутов для товаров
INSERT INTO product_attribute_values (product_id, attribute_id, value, unit) VALUES

-- KCH001 (Сковорода) - product_id = 1
(1, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Черный', NULL),
(1, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Алюминий', NULL),
(1, (SELECT attribute_id FROM attributes WHERE code = 'coating'), 'Антипригарное', NULL),
(1, (SELECT attribute_id FROM attributes WHERE code = 'volume'), '2.5', 'л'),

-- KCH002 (Кастрюля) - product_id = 2
(2, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Серебристый', NULL),
(2, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Нержавеющая сталь', NULL),
(2, (SELECT attribute_id FROM attributes WHERE code = 'volume'), '5', 'л'),

-- KCH006 (Электрочайник) - product_id = 6
(6, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Серебристый', NULL),
(6, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Стекло', NULL),
(6, (SELECT attribute_id FROM attributes WHERE code = 'power'), '2200', 'Вт'),
(6, (SELECT attribute_id FROM attributes WHERE code = 'volume'), '1.7', 'л'),

-- KCH007 (Микроволновка) - product_id = 7
(7, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Белый', NULL),
(7, (SELECT attribute_id FROM attributes WHERE code = 'power'), '700', 'Вт'),
(7, (SELECT attribute_id FROM attributes WHERE code = 'volume'), '20', 'л'),
(7, (SELECT attribute_id FROM attributes WHERE code = 'control_type'), 'Механический', NULL),

-- GST001 (Диван) - product_id = 11
(11, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Бежевый', NULL),
(11, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Велюр', NULL),
(11, (SELECT attribute_id FROM attributes WHERE code = 'collection'), 'Скандинавия', NULL),

-- GST002 (Журнальный столик) - product_id = 12
(12, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Черный', NULL),
(12, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Стекло', NULL),

-- SPL001 (Кровать) - product_id = 16
(16, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Дуб', NULL),
(16, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Массив сосны', NULL),
(16, (SELECT attribute_id FROM attributes WHERE code = 'collection'), 'Классика', NULL),

-- SPL002 (Матрас) - product_id = 17
(17, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Кокосовая койра', NULL),
(17, (SELECT attribute_id FROM attributes WHERE code = 'warranty'), '24', 'мес'),
(17, (SELECT attribute_id FROM attributes WHERE code = 'collection'), 'Ортопедическая серия', NULL),

-- VAN001 (Полотенце) - product_id = 21
(21, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Белый', NULL),
(21, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Хлопок', NULL),
(21, (SELECT attribute_id FROM attributes WHERE code = 'care_instructions'), 'Машинная стирка до 40°', NULL),

-- KCH011 (Чайник стеклянный) - новый товар без скидки
(26, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Прозрачный', NULL),
(26, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Стекло', NULL),
(26, (SELECT attribute_id FROM attributes WHERE code = 'volume'), '0.8', 'л'),

-- KCH014 (Мультиварка) - product_id = 29
(29, (SELECT attribute_id FROM attributes WHERE code = 'color'), 'Черный', NULL),
(29, (SELECT attribute_id FROM attributes WHERE code = 'material'), 'Пластик', NULL),
(29, (SELECT attribute_id FROM attributes WHERE code = 'power'), '700', 'Вт'),
(29, (SELECT attribute_id FROM attributes WHERE code = 'programs_count'), '8', NULL);


INSERT INTO payment_methods (code, name, description, icon_url) VALUES
                                                                    ('CARD_ONLINE', 'Оплата картой онлайн', 'Безопасная оплата банковской картой VISA/MasterCard/Mир', '/icons/card_online.svg'),
                                                                    ('CASH', 'Наличные курьеру', 'Оплата наличными при получении', '/icons/cash.svg'),
                                                                    ('CARD_TO_COURIER', 'Картой курьеру', 'Оплата банковской картой курьеру при получении', '/icons/card_courier.svg'),
                                                                    ('SBP', 'СБП', 'Оплата через Систему быстрых платежей', '/icons/sbp.svg'),
                                                                    ('YANDEX_PAY', 'Яндекс Пэй', 'Оплата через Яндекс Пэй', '/icons/yandex_pay.svg');

INSERT INTO deliveries (client_id, city, street, house, apartment, entrance, floor, intercom, delivery_time_from, delivery_time_to, courier_comment, delivery_status) VALUES
                                                                                                                                                                          (1, 'Москва', 'Тверская', '15', '42', '1', 5, '42К', '09:00:00', '18:00:00', 'Позвонить за 15 минут', 'DELIVERED'),
                                                                                                                                                                          (1, 'Москва', 'Ленина', '10', '5', NULL, 2, NULL, '10:00:00', '20:00:00', 'Оставить у соседей 5', 'PENDING'),
                                                                                                                                                                          (1, 'Москва', 'Арбат', '25', '7', '2', 3, '25Б', '11:00:00', '19:00:00', 'Домофон не работает', 'IN_TRANSIT');

INSERT INTO orders (order_id, order_date, client_id, total_amount, payment_method_id, delivery_price, delivery_id) VALUES
                                                                                                                       (1001, '2026-04-01 10:15:00', 1, 5496, 1, 300, 1),
                                                                                                                       (1002, '2026-04-05 14:30:00', 1, 29998, 2, 500, 2),
                                                                                                                       (1003, '2026-04-10 18:45:00', 1, 11497, 3, 0, 3);

INSERT INTO orders_item (order_id, product_id, quantity, price_at_time) VALUES
                                                                            (1001, 1, 2, 1299),
                                                                            (1001, 4, 1, 999),
                                                                            (1001, 6, 1, 1899),
                                                                            (1002, 16, 1, 19999),
                                                                            (1002, 17, 1, 9999),
                                                                            (1003, 27, 1, 4999),
                                                                            (1003, 28, 1, 2499),
                                                                            (1003, 31, 1, 3999);

-- Добавляем избранные товары для клиента с ID = 1 (armen@mail.ru)
INSERT INTO favorites (client_id, product_id, date_added) VALUES
                                                              (1, 1, NOW()),        -- Сковорода антипригарная 28см
                                                              (1, 6, NOW()),        -- Электрочайник 1.7л
                                                              (1, 11, NOW()),       -- Диван угловой
                                                              (1, 16, NOW());       -- Кровать двуспальная
-- Сначала найдем client_id (предполагаю, что это 1)

INSERT INTO baskets (client_id, created_at, updated_at)
VALUES (
           1,  -- client_id пользователя armen@mail.ru
           NOW(),
           NOW()
       );

-- Проверим, что создалось
SELECT * FROM baskets WHERE client_id = 1;

-- Добавляем несколько товаров в корзину пользователя
-- Сначала узнаем basket_id для client_id = 1

-- Вариант 1: Если знаем basket_id (например, 1)
INSERT INTO basket_items (basket_id, product_id, quantity, price_at_add_time)
VALUES
    (1, 6, 2, 1899),   -- Электрочайник 1.7л, 2 штуки
    (1, 7, 1, 4999),   -- Микроволновая печь 20л, 1 штука
    (1, 11, 1, 29999); -- Диван угловой, 1 штука

-- Вариант 2: С подзапросом для автоматического получения basket_id
INSERT INTO basket_items (basket_id, product_id, quantity, price_at_add_time)
VALUES
    (
        (SELECT basket_id FROM baskets WHERE client_id = 1),
        26,  -- Заварочный чайник
        1,
        1800
    ),
    (
        (SELECT basket_id FROM baskets WHERE client_id = 1),
        2,   -- Кастрюля нержавейка
        3,
        1999
    ),
    (
        (SELECT basket_id FROM baskets WHERE client_id = 1),
        12,  -- Журнальный столик
        1,
        3999
    );