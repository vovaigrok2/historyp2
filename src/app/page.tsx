'use client';

import { useState } from 'react';
import Image from 'next/image';

// Custom SVG icon components (остаются без изменений)
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
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2" />
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

// Новые типы данных для встроенных изображений
interface InlineImage {
    url: string;
    caption: string;
    alt: string;
}

interface Topic {
    id: string;
    title: string;
    content: string;
    image: string;
    inlineImages?: InlineImage[];
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

// Компонент для встроенных изображений
const InlineImageComponent: React.FC<{ inlineImage: InlineImage }> = ({ inlineImage }) => {
    return (
        <div className="my-6">
            <div className="relative w-full h-64">
                <Image
                    src={inlineImage.url}
                    alt={inlineImage.alt}
                    fill
                    className="object-cover rounded-lg border-2 border-amber-300"
                />
            </div>
            <div className="text-center text-sm text-amber-700 mt-2 italic">
                {inlineImage.caption}
            </div>
        </div>
    );
};

// Функция для парсинга контента с несколькими встроенными изображениями
const parseContentWithImages = (content: string, inlineImages?: InlineImage[]) => {
    if (!inlineImages || inlineImages.length === 0) {
        return <div className="whitespace-pre-line leading-relaxed">{content}</div>;
    }

    // Разделяем контент по маркерам [INLINE_IMAGE_1], [INLINE_IMAGE_2] и т.д.
    const parts = content.split(/(\[INLINE_IMAGE_\d+\])/);

    return (
        <div className="leading-relaxed">
            {parts.map((part, index) => {
                // Проверяем, является ли часть маркером изображения
                const imageMatch = part.match(/\[INLINE_IMAGE_(\d+)\]/);
                if (imageMatch) {
                    const imageIndex = parseInt(imageMatch[1]) - 1;
                    if (inlineImages[imageIndex]) {
                        return <InlineImageComponent key={index} inlineImage={inlineImages[imageIndex]} />;
                    }
                    return null;
                }
                // Если это не маркер изображения, отображаем как текст
                return <div key={index} className="whitespace-pre-line">{part}</div>;
            })}
        </div>
    );
};

// Данные сайта с поддержкой нескольких изображений
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
                inlineImages: [
                    {
                        url: '/images/egypt-hieroglyphs.jpeg',
                        caption: 'Древнеегипетские иероглифы на папирусе — уникальная система письменности, которая использовалась более 3000 лет',
                        alt: 'Древнеегипетские иероглифы на папирусе'
                    },
                    {
                        url: '/images/egypt-pyramids.jpeg',
                        caption: 'Великие пирамиды Гизы — одно из семи чудес древнего мира',
                        alt: 'Пирамиды Гизы'
                    }
                ],
                content: `Древний Египет — одна из величайших цивилизаций древности, которая процветала на берегах реки Нил в течение более трех тысячелетий.

Основные периоды:
• Додинастический период (до 3100 г. до н.э.)
• Раннее царство (3100-2686 г. до н.э.)
• Древнее царство (2686-2181 г. до н.э.) - эпоха строительства пирамид

[INLINE_IMAGE_1]

• Среднее царство (2055-1650 г. до н.э.)
• Новое царство (1550-1077 г. до н.э.) - период расцвета

Достижения египетской цивилизации:
• Иероглифическая письменность — сложная система из более чем 700 знаков
• Монументальная архитектура (пирамиды, храмы)

[INLINE_IMAGE_2]

• Развитая система медицины и хирургии
• Мумификация и сложные представления о загробной жизни
• Солнечный календарь из 365 дней
• Развитое искусство и скульптура

Фараоны как божественные правители объединяли Верхний и Нижний Египет, создав одно из первых централизованных государств в истории человечества. Египетская цивилизация оказала огромное влияние на развитие всего древнего мира.`
            },
            {
                id: 'rome',
                title: 'Древний Рим',
                image: '/images/ancient-rome.jpeg',
                inlineImages: [
                    {
                        url: '/images/roman-forum.jpeg',
                        caption: 'Руины Римского Форума — политического и коммерческого центра древнего Рима, где принимались важнейшие решения империи',
                        alt: 'Руины Римского Форума'
                    }
                ],
                content: `Древний Рим — одна из ведущих цивилизаций Древнего мира, древнее государство, получившее своё название по главному городу (Roma — Рим), в свою очередь названному в честь легендарного основателя — Ромула.

Периоды римской истории:
• Царский период (753-509 г. до н.э.)
• Римская республика (509-27 г. до н.э.)
• Римская империя (27 г. до н.э. — 476/1453 г. н.э.)

[INLINE_IMAGE_1]

Ключевые достижения:
• Римское право — основа современной правовой системы
• Инженерные достижения (акведуки, дороги, амфитеатры)
• Военное искусство и организация легионов
• Архитектура (арки, купола, римский бетон)
• Латинский язык — основа романских языков
• Эффективная государская администрация

Римская империя в период расцвета простиралась от Британии до Месопотамии, от Рейна и Дуная до Сахары, включая всё Средиземноморье. Наследие Рима ощущается в современном мире через право, архитектуру, языки и политические институты.`
            },
            {
                id: 'greece',
                title: 'Древняя Греция',
                image: '/images/ancient-greece.jpeg',
                inlineImages: [
                    {
                        url: '/images/greek-theater.jpeg',
                        caption: 'Древнегреческий амфитеатр — место рождения театрального искусства и демократических собраний',
                        alt: 'Древнегреческий амфитеатр'
                    },
                    {
                        url: '/images/greek-philosophy.jpeg',
                        caption: 'Древнегреческие философы — основатели западной философской традиции',
                        alt: 'Древнегреческие философы'
                    }
                ],
                content: `Древняя Греция — античная греческая цивилизация на юго-востоке Европы, существовавшая с III тысячелетия до н. э. до VI века н. э.

Основные периоды:
• Архаический период (VIII-VI вв. до н.э.)
• Классический период (V-IV вв. до н.э.)
• Эллинистический период (IV-I вв. до н.э.)

[INLINE_IMAGE_1]

Вклад в мировую цивилизацию:
• Демократия (афинская демократия) — основа современного народовластия
• Философия (Сократ, Платон, Аристотель) — фундамент западной мысли

[INLINE_IMAGE_2]

• Театр (трагедия и комедия) — искусство драмы
• Олимпийские игры — спортивные состязания
• Математика и геометрия (Евклид, Пифагор)
• История как наука (Геродот, Фукидид)

Греческие полисы-государства создали уникальную систему самоуправления и заложили основы западной цивилизации. Наследие Древней Греции живет в современной науке, искусстве и политике.`
            }
        ]
    },
    // Остальные разделы остаются аналогичными с добавлением inlineImages
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
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button
                            onClick={goToSection}
                            className="mb-2 flex items-center text-amber-800 hover:text-amber-900"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад к разделу "{currentSection.title}"
                        </button>
                        <nav className="text-sm text-amber-700">
                            <span
                                className="cursor-pointer hover:text-amber-900"
                                onClick={goToHome}
                            >
                                Главная
                            </span>
                            {' > '}
                            <span
                                className="cursor-pointer hover:text-amber-900"
                                onClick={goToSection}
                            >
                                {currentSection.title}
                            </span>
                            {' > '}
                            <span>{currentTopic.title}</span>
                        </nav>
                    </div>

                    <article className="bg-amber-100 border border-amber-200 rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <Image
                                src={currentTopic.image}
                                alt={currentTopic.title}
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-lg border-2 border-amber-300"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <h1 className="text-3xl font-bold mb-4 text-amber-900">{currentTopic.title}</h1>
                            <div className="text-amber-800 leading-relaxed bg-amber-50 p-6 rounded-lg border border-amber-200">
                                {parseContentWithImages(currentTopic.content, currentTopic.inlineImages)}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }


    // Отображение теста
    if (currentSection && isQuizMode) {
        const SectionIcon = currentSection.icon;
        const questions = currentSection.quiz.questions;

        if (showResult) {
            const score = calculateScore();
            const percentage = Math.round((score / questions.length) * 100);

            return (
                <div className="min-h-screen bg-amber-50">
                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                        <div className="mb-6">
                            <button
                                onClick={exitQuiz}
                                className="mb-4 flex items-center text-amber-800 hover:text-amber-900"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Назад к разделу
                            </button>
                        </div>

                        <div className="border border-amber-200 rounded-lg p-6 bg-amber-100 text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-3 bg-amber-200 rounded-lg">
                                    <SectionIcon className="w-8 h-8 text-amber-800" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-amber-900">Тест завершен!</h2>
                                    <p className="text-amber-700">Раздел: {currentSection.title}</p>
                                </div>
                            </div>

                            <div className="text-6xl mb-4">
                                {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
                            </div>

                            <div className="space-y-2">
                                <p className="text-amber-800">Ваш результат:</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-3xl font-semibold text-amber-900">{score}</span>
                                    <span className="text-amber-700">из {questions.length}</span>
                                    <span className={`px-2 py-1 rounded-full text-sm ${percentage >= 80
                                        ? 'bg-green-200 text-green-800'
                                        : percentage >= 60
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : 'bg-red-200 text-red-800'
                                        }`}>
                                        {percentage}%
                                    </span>
                                </div>
                            </div>

                            <p className="text-amber-700 mt-4">
                                {percentage >= 80
                                    ? 'Отличный результат! Вы хорошо знаете этот исторический период.'
                                    : percentage >= 60
                                        ? 'Хороший результат! Рекомендуем повторить материал.'
                                        : 'Стоит изучить материал более внимательно и попробовать еще раз.'
                                }
                            </p>

                            <div className="space-y-3 mt-6">
                                {questions.map((question, index) => {
                                    const userAnswer = userAnswers[index];
                                    const isCorrect = userAnswer === question.correctAnswer;

                                    return (
                                        <div key={question.id} className="text-left p-4 border border-amber-200 rounded-lg bg-amber-50">
                                            <div className="flex items-start gap-3 mb-2">
                                                {isCorrect ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="mb-2 font-medium text-amber-900">{question.question}</p>
                                                    <p className="text-sm text-amber-700">
                                                        Ваш ответ: {question.options[userAnswer]}
                                                    </p>
                                                    {!isCorrect && (
                                                        <p className="text-sm text-green-700 mt-1">
                                                            Правильный ответ: {question.options[question.correctAnswer]}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-amber-600 mt-2">
                                                        {question.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex gap-3 justify-center pt-6">
                                <button
                                    onClick={restartQuiz}
                                    className="px-4 py-2 border border-amber-300 text-amber-800 rounded-md hover:bg-amber-200 flex items-center transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Пройти еще раз
                                </button>
                                <button
                                    onClick={exitQuiz}
                                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                                >
                                    Вернуться к разделу
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const currentQ = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button
                            onClick={exitQuiz}
                            className="mb-4 flex items-center text-amber-800 hover:text-amber-900"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Выйти из теста
                        </button>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-amber-900">Тест: {currentSection.title}</h2>
                                <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-md text-sm">
                                    {currentQuestion + 1} из {questions.length}
                                </span>
                            </div>
                            <div className="w-full bg-amber-200 rounded-full h-2">
                                <div
                                    className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-amber-200 rounded-lg p-6 bg-amber-100">
                        <h3 className="text-xl font-semibold mb-6 text-amber-900">{currentQ.question}</h3>
                        <div className="space-y-3">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full text-left p-4 rounded-md border transition-all ${selectedAnswer === index
                                        ? 'border-amber-600 bg-amber-200 text-amber-900'
                                        : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-amber-800'
                                        }`}
                                    onClick={() => selectAnswer(index)}
                                >
                                    <span className="font-semibold mr-3">
                                        {String.fromCharCode(65 + index)}.
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                onClick={nextQuestion}
                                disabled={selectedAnswer === null}
                                className={`px-6 py-2 rounded-md transition-colors ${selectedAnswer === null
                                    ? 'bg-amber-300 text-amber-500 cursor-not-allowed'
                                    : 'bg-amber-600 text-white hover:bg-amber-700'
                                    }`}
                            >
                                {currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Отображение глоссария
    if (currentSection && isGlossaryMode) {
        const SectionIcon = currentSection.icon;

        return (
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <button
                            onClick={exitGlossary}
                            className="mb-4 flex items-center text-amber-800 hover:text-amber-900"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад к разделу
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-200 rounded-lg">
                                <SectionIcon className="w-8 h-8 text-amber-800" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2 text-amber-900">Глоссарий: {currentSection.title}</h1>
                                <p className="text-amber-700">Словарь основных терминов и понятий</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {currentSection.glossary.map((term, index) => (
                            <div key={index} className="border border-amber-200 rounded-lg p-6 bg-amber-100 hover:bg-amber-200 transition-colors">
                                <h3 className="text-xl font-semibold flex items-center gap-3 mb-3 text-amber-900">
                                    <BookOpen className="w-5 h-5 text-amber-700" />
                                    {term.term}
                                </h3>
                                <p className="text-amber-800">
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
            <div className="min-h-screen bg-amber-50">
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="mb-8">
                        <button
                            onClick={goToHome}
                            className="mb-4 flex items-center text-amber-800 hover:text-amber-900"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад к разделам
                        </button>

                        {/* ИЗМЕНЕНИЯ НАЧИНАЮТСЯ ЗДЕСЬ */}
                        <div className="flex flex-col gap-6 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-200 rounded-lg">
                                    <SectionIcon className="w-8 h-8 text-amber-800" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2 text-amber-900">{currentSection.title}</h1>
                                    <p className="text-amber-700">{currentSection.description}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={showGlossary}
                                    className="px-4 py-2 border border-amber-300 text-amber-800 rounded-md hover:bg-amber-200 flex items-center gap-2 transition-colors"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Глоссарий
                                </button>
                                <button
                                    onClick={startQuiz}
                                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 flex items-center gap-2 transition-colors"
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
                                className="cursor-pointer border border-amber-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden bg-amber-100 hover:bg-amber-200"
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
                                    <h3 className="text-xl font-semibold flex items-center gap-3 mb-3 text-amber-900">
                                        <Book className="w-5 h-5 text-amber-700" />
                                        {topic.title}
                                    </h3>
                                    <p className="text-amber-800 line-clamp-3">
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
        <div className="min-h-screen bg-amber-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-amber-900">Исторический портал</h1>
                    <p className="text-amber-700 max-w-2xl mx-auto">
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
                                className="cursor-pointer border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-amber-100 hover:bg-amber-200"
                                onClick={() => setCurrentSection(section)}
                            >
                                <div className="mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-amber-200 rounded-lg">
                                            <SectionIcon className="w-8 h-8 text-amber-800" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-amber-900">{section.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-amber-800 mb-4">
                                        {section.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-amber-700">
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