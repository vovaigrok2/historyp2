'use client';

import { useState } from 'react';
import Image from 'next/image';

// Custom SVG icon components
const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const Book = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

const Globe = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m6 12 4-4 4 4" />
        <path d="m6 12 4 4 4-4" />
    </svg>
);

const Crown = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
);

const Building = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
    </svg>
);

const Rocket = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const Brain = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
    </svg>
);

const XCircle = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);

const RotateCcw = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6l4 4 4-4h6v18H2V3z" />
        <path d="M6 8v13" />
        <path d="M18 8v13" />
    </svg>
);

// Типы данных
interface Topic {
    id: string;
    title: string;
    content: string;
    image: string;
}

interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface Quiz {
    questions: Question[];
}

interface GlossaryTerm {
    term: string;
    definition: string;
}

interface Section {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    topics: Topic[];
    quiz: Quiz;
    glossary: GlossaryTerm[];
}

// Данные сайта
const sections: Section[] = [
    {
        id: 'ancient',
        title: 'Древний мир',
        description: 'История древних цивилизаций',
        icon: Building,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    question: 'Сколько тысячелетий просуществовала египетская цивилизация?',
                    options: ['Более одного тысячелетия', 'Более двух тысячелетий', 'Более трех тысячелетий', 'Более четырех тысячелетий'],
                    correctAnswer: 2,
                    explanation: 'Древний Египет просуществовал более трех тысячелетий, от додинастического периода до римского завоевания.'
                },
                {
                    id: 'q2',
                    question: 'Какой период римской истории длился с 509 по 27 год до н.э.?',
                    options: ['Царский период', 'Римская республика', 'Римская империя', 'Поздняя империя'],
                    correctAnswer: 1,
                    explanation: 'Римская республика существовала с 509 по 27 год до н.э., когда была установлена империя при Августе.'
                },
                {
                    id: 'q3',
                    question: 'Кто из древнегреческих философов был учителем Александра Македонского?',
                    options: ['Сократ', 'Платон', 'Аристотель', 'Эпикур'],
                    correctAnswer: 2,
                    explanation: 'Аристотель был наставником Александра Македонского в юности, обучая его философии, политике и наукам.'
                },
                {
                    id: 'q4',
                    question: 'Какое достижение НЕ принадлежит древним грекам?',
                    options: ['Демократия', 'Олимпийские игры', 'Римское право', 'Театр'],
                    correctAnswer: 2,
                    explanation: 'Римское право было создано в Древнем Риме, а не в Греции. Остальные достижения принадлежат грекам.'
                },
                {
                    id: 'q5',
                    question: 'В каком году был основан Рим согласно легенде?',
                    options: ['776 г. до н.э.', '753 г. до н.э.', '509 г. до н.э.', '264 г. до н.э.'],
                    correctAnswer: 1,
                    explanation: 'Согласно римской легенде, Рим был основан Ромулом в 753 году до н.э.'
                }
            ]
        },
        glossary: [
            { term: 'Фараон', definition: 'Титул правителей Древнего Египта, считавшихся божественными царями' },
            { term: 'Иероглифы', definition: 'Система древнеегипетской письменности, использующая рисуночные знаки' },
            { term: 'Мумификация', definition: 'Процесс бальзамирования тел умерших для сохранения их в загробной жизни' },
            { term: 'Пирамида', definition: 'Монументальная гробница фараонов в форме четырехгранной пирамиды' },
            { term: 'Легион', definition: 'Основная тактическая единица римской армии (3-6 тысяч воинов)' },
            { term: 'Сенат', definition: 'Высший орган государственной власти в Римской республике' },
            { term: 'Полис', definition: 'Древнегреческий город-государство с прилегающими территориями' },
            { term: 'Демократия', definition: 'Форма правления, при которой власть принадлежит народу' },
            { term: 'Философия', definition: 'Учение о наиболее общих принципах бытия и познания' },
            { term: 'Акведук', definition: 'Римское инженерное сооружение для подачи воды в города' }
        ],
        topics: [
            {
                id: 'egypt',
                title: 'Древний Египет',
                image: '/images/ancient-egypt.jpeg',
                content: `Древний Египет — одна из величайших цивилизаций древности, которая процветала на берегах реки Нил в течение более трех тысячелетий.

Основные периоды:
• Додинастический период (до 3100 г. до н.э.)
• Раннее царство (3100-2686 г. до н.э.)
• Древнее царство (2686-2181 г. до н.э.) - эпоха строительства пирамид
• Среднее царство (2055-1650 г. до н.э.)
• Новое царство (1550-1077 г. до н.э.) - период расцвета

Достижения египетской цивилизации:
• Иероглифическая письменность
• Монументальная архитектура (пирамиды, храмы)
• Развитая система медицины
• Мумификация и представления о загробной жизни
• Календарь из 365 дней

Фараоны как божественные правители объединяли Верхний и Нижний Египет, создав одно из первых централизованных государств в истории человечества.`
            },
            {
                id: 'rome',
                title: 'Древний Рим',
                image: '/images/ancient-rome.jpg',
                content: `Древний Рим — одна из ведущих цивилизаций Древнего мира, древнее государство, получившее своё название по главному городу (Roma — Рим), в свою очередь названному в честь легендарного основателя — Ромула.

Периоды римской истории:
• Царский период (753-509 г. до н.э.)
• Римская республика (509-27 г. до н.э.)
• Римская империя (27 г. до н.э. — 476/1453 г. н.э.)

Ключевые достижения:
• Римское право — основа современной правовой системы
• Инженерные достижения (акведуки, дороги, амфитеатры)
• Военное искусство и организация легионов
• Архитектура (арки, купола, бетон)
• Латинский язык — основа романских языков

Римская империя в период расцвета простиралась от Британии до Месопотамии, от Рейна и Дуная до Сахары, включая всё Средиземноморье.`
            },
            {
                id: 'greece',
                title: 'Древняя Греция',
                image: '/images/ancient-greece.jpg',
                content: `Древняя Греция — античная греческая цивилизация на юго-востоке Европы, существовавшая с III тысячелетия до н. э. до VI века н. э.

Основные периоды:
• Архаический период (VIII-VI вв. до н.э.)
• Классический период (V-IV вв. до н.э.)
• Эллинистический период (IV-I вв. до н.э.)

Вклад в мировую цивилизацию:
• Демократия (афинская демократия)
• Философия (Сократ, Платон, Аристотель)
• Театр (трагедия и комедия)
• Олимпийские игры
• Математика и геометрия (Евклид, Пифагор)
• История как наука (Геродот, Фукидид)

Греческие полисы-государства создали уникальную систему самоуправления и заложили основы западной цивилизации.`
            }
        ]
    },
    {
        id: 'medieval',
        title: 'Средневековье',
        description: 'Эпоха рыцарей и замков',
        icon: Crown,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    question: 'В каких веках господствовал феодализм в Западной Европе?',
                    options: ['III-XII века', 'V-XV века', 'VII-XVII века', 'X-XVIII века'],
                    correctAnswer: 1,
                    explanation: 'Феодализм господствовал в Западной Европе в V-XV веках, от падения Римской империи до эпохи Возрождения.'
                },
                {
                    id: 'q2',
                    question: 'Какой крестовый поход привел к взятию Константинополя?',
                    options: ['Первый', 'Второй', 'Третий', 'Четвертый'],
                    correctAnswer: 3,
                    explanation: 'Четвертый крестовый поход (1202-1204) отклонился от первоначальной цели и привел к взятию Константинополя.'
                },
                {
                    id: 'q3',
                    question: 'Кто стоял на вершине феодальной иерархии?',
                    options: ['Герцоги', 'Король', 'Бароны', 'Рыцари'],
                    correctAnswer: 1,
                    explanation: 'Король был верховным сюзереном в феодальной иерархии, стоя на ее вершине.'
                },
                {
                    id: 'q4',
                    question: 'Что НЕ было характерной чертой феодализма?',
                    options: ['Натуральное хозяйство', 'Централизованная власть', 'Личная зависимость крестьян', 'Господство церкви'],
                    correctAnswer: 1,
                    explanation: 'Для феодализма была характерна слабость центральной власти, а не централизованная власть.'
                },
                {
                    id: 'q5',
                    question: 'В каком веке начались крестовые походы?',
                    options: ['X век', 'XI век', 'XII век', 'XIII век'],
                    correctAnswer: 1,
                    explanation: 'Крестовые походы начались в XI веке, первый поход состоялся в 1096-1099 годах.'
                }
            ]
        },
        glossary: [
            { term: 'Феодализм', definition: 'Система общественного устройства, основанная на земельных отношениях и личной зависимости' },
            { term: 'Вассал', definition: 'Лицо, получившее земельное владение от сюзерена в обмен на службу' },
            { term: 'Сюзерен', definition: 'Феодал, предоставляющий земельное владение вассалу' },
            { term: 'Рыцарь', definition: 'Тяжеловооруженный конный воин, представитель военного сословия' },
            { term: 'Крестовые походы', definition: 'Серия религиозно-военных экспедиций XI-XIII веков в Святую землю' },
            { term: 'Сословие', definition: 'Социальная группа с определенными правами и обязанностями' },
            { term: 'Натуральное хозяйство', definition: 'Тип экономики, при котором продукты производятся для собственного потребления' },
            { term: 'Инквизиция', definition: 'Церковный суд для борьбы с ересями и неверными' },
            { term: 'Замок', definition: 'Укрепленная резиденция феодала' },
            { term: 'Цех', definition: 'Объединение ремесленников одной специальности в средневековом городе' }
        ],
        topics: [
            {
                id: 'feudalism',
                title: 'Феодализм',
                image: '/images/medieval-castle.jpg',
                content: `Феодализм — система общественного и государственного устройства, господствовавшая в Западной Европе в V-XV веках.

Основные черты феодализма:
• Иерархическая система земельных отношений
• Личная зависимость крестьян от землевладельцев
• Натуральное хозяйство
• Слабость центральной власти
• Господство церкви в духовной жизни

Феодальная иерархия:
• Король — верховный сюзерен
• Герцоги и графы — крупные феодалы
• Бароны и рыцари — средние и мелкие феодалы
• Крестьяне — основная масса населения

Феодальные отношения основывались на принципе "вассалитета" — личной преданности и взаимных обязательств между сюзереном и вассалом.`
            },
            {
                id: 'crusades',
                title: 'Крестовые походы',
                image: '/images/crusades.jpg',
                content: `Крестовые походы — серия религиозных военных походов XI-XIII веков, предпринятых западноевропейскими христианами для освобождения Святой земли.

Основные крестовые походы:
• Первый крестовый поход (1096-1099) — взятие Иерусалима
• Второй крестовый поход (1147-1149) — неудачный
• Третий крестовый поход (1189-1192) — поход трех королей
• Четвертый крестовый поход (1202-1204) — взятие Константинополя

Последствия крестовых походов:
• Культурный обмен между Востоком и Западом
• Развитие торговли и городов
• Ослабление Византийской империи
• Укрепление папской власти
• Появление духовно-рыцарских орденов

Крестовые походы оказали огромное влияние на развитие средневековой Европы и отношения между христианским и мусульманским мирами.`
            }
        ]
    },
    // Остальные разделы (modern, contemporary) остаются аналогичными
];

export default function Home() {
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [isGlossaryMode, setIsGlossaryMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Функция для возврата на главную
    const goToHome = () => {
        setCurrentSection(null);
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
        resetQuiz();
    };

    // Функция для возврата к списку тем
    const goToSection = () => {
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
        resetQuiz();
    };

    // Функции для работы с тестом
    const startQuiz = () => {
        setIsQuizMode(true);
        setIsGlossaryMode(false);
        resetQuiz();
    };

    // Функции для работы с глоссарием
    const showGlossary = () => {
        setIsGlossaryMode(true);
        setIsQuizMode(false);
        resetQuiz();
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuizCompleted(false);
    };

    const selectAnswer = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const nextQuestion = () => {
        if (selectedAnswer !== null) {
            const newAnswers = [...userAnswers, selectedAnswer];
            setUserAnswers(newAnswers);

            if (currentSection && currentQuestion < currentSection.quiz.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            } else {
                setQuizCompleted(true);
                setShowResult(true);
            }
        }
    };

    const restartQuiz = () => {
        resetQuiz();
    };

    const exitQuiz = () => {
        setIsQuizMode(false);
        resetQuiz();
    };

    const exitGlossary = () => {
        setIsGlossaryMode(false);
    };

    const calculateScore = () => {
        if (!currentSection) return 0;
        let correct = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === currentSection.quiz.questions[index].correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    // Отображение содержания темы
    if (currentTopic && currentSection) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button
                            onClick={goToSection}
                            className="mb-2 flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад к разделу "{currentSection.title}"
                        </button>
                        <nav className="text-sm text-gray-500">
                            <span
                                className="cursor-pointer hover:text-gray-700"
                                onClick={goToHome}
                            >
                                Главная
                            </span>
                            {' > '}
                            <span
                                className="cursor-pointer hover:text-gray-700"
                                onClick={goToSection}
                            >
                                {currentSection.title}
                            </span>
                            {' > '}
                            <span>{currentTopic.title}</span>
                        </nav>
                    </div>

                    <article>
                        <div className="mb-6">
                            <Image
                                src={currentTopic.image}
                                alt={currentTopic.title}
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <h1 className="text-3xl font-bold mb-4">{currentTopic.title}</h1>
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                {currentTopic.content}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }

    // Отображение глоссария
    if (currentSection && isGlossaryMode) {
        const SectionIcon = currentSection.icon;

        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <button
                            onClick={exitGlossary}
                            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад к разделу
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <SectionIcon className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Глоссарий: {currentSection.title}</h1>
                                <p className="text-gray-600">Словарь основных терминов и понятий</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {currentSection.glossary.map((term, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold flex items-center gap-3 mb-3">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    {term.term}
                                </h3>
                                <p className="text-gray-600">
                                    {term.definition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Отображение списка тем в разделе
    if (currentSection) {
        const SectionIcon = currentSection.icon;

        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <button
                            onClick={goToHome}
                            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад к разделам
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <SectionIcon className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">{currentSection.title}</h1>
                                <p className="text-gray-600">{currentSection.description}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={showGlossary}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Глоссарий
                                </button>
                                <button
                                    onClick={startQuiz}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Brain className="w-5 h-5" />
                                    Пройти тест
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {currentSection.topics.map((topic) => (
                            <div
                                key={topic.id}
                                className="cursor-pointer border border-gray-200 rounded-lg hover:shadow-lg transition-shadow overflow-hidden"
                                onClick={() => setCurrentTopic(topic)}
                            >
                                <div className="aspect-video relative">
                                    <Image
                                        src={topic.image}
                                        alt={topic.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold flex items-center gap-3 mb-3">
                                        <Book className="w-5 h-5 text-blue-600" />
                                        {topic.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3">
                                        {topic.content.split('\n')[0]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Главная страница с разделами
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Исторический портал</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Изучайте историю человечества от древних цивилизаций до современности.
                        Выберите интересующий вас период для погружения в исторические события и факты.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {sections.map((section) => {
                        const SectionIcon = section.icon;

                        return (
                            <div
                                key={section.id}
                                className="cursor-pointer border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
                                onClick={() => setCurrentSection(section)}
                            >
                                <div className="mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <SectionIcon className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{section.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        {section.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>
                                            {section.topics.length} {section.topics.length === 1 ? 'тема' :
                                                section.topics.length < 5 ? 'темы' : 'тем'}
                                        </span>
                                        <span>
                                            {section.glossary.length} терминов в глоссарии
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}