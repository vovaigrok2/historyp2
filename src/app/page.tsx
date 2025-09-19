'use client'
import { useState } from 'react';
import Image from "next/image";

// Custom icon components
const ArrowLeft = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const Book = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

const Globe = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m6 12 4-4 4 4" />
        <path d="m6 12 4 4 4-4" />
    </svg>
);

const Crown = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
);

const Building = ({ className = "" }) => (
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

const Rocket = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const Brain = ({ className = "" }) => (
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

const CheckCircle = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
    </svg>
);

const XCircle = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);

const RotateCcw = ({ className = "" }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

// Типы данных
interface Topic {
    id: string;
    title: string;
    content: string;
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

interface Section {
    id: string;
    title: string;
    description: string;
    icon: any;
    topics: Topic[];
    quiz: Quiz;
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
                }
            ]
        },
        topics: [
            {
                id: 'egypt',
                title: 'Древний Египет',
                content: `Древний Египет — одна из величайших цивилизаций древности, которая процветала на берегах реки Нил в течение более трех тысячелетий.`
            },
            {
                id: 'rome',
                title: 'Древний Рим',
                content: `Древний Рим — одна из ведущих цивилизаций Древнего мира, древнее государство, получившее своё название по главному городу.`
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
                }
            ]
        },
        topics: [
            {
                id: 'feudalism',
                title: 'Феодализм',
                content: `Феодализм — система общественного и государственного устройства, господствовавшая в Западной Европе в V-XV веках.`
            }
        ]
    },
    {
        id: 'modern',
        title: 'Новое время',
        description: 'Эпоха великих открытий',
        icon: Globe,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    question: 'В каких веках проходила эпоха Возрождения?',
                    options: ['XII-XIV века', 'XIV-XVI века', 'XVI-XVIII века', 'XVIII-XX века'],
                    correctAnswer: 1,
                    explanation: 'Эпоха Возрождения (Ренессанс) проходила в XIV-XVI веках, знаменуя переход от Средневековья к Новому времени.'
                }
            ]
        },
        topics: [
            {
                id: 'renaissance',
                title: 'Эпоха Возрождения',
                content: `Возрождение (Ренессанс) — эпоха в истории культуры Европы, пришедшая на смену Средним векам и предшествующая Просвещению.`
            }
        ]
    },
    {
        id: 'contemporary',
        title: 'Новейшее время',
        description: 'XX-XXI века',
        icon: Rocket,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    question: 'В каком году началась Первая мировая война?',
                    options: ['1913', '1914', '1915', '1916'],
                    correctAnswer: 1,
                    explanation: 'Первая мировая война началась в 1914 году после убийства эрцгерцога Франца Фердинанда.'
                }
            ]
        },
        topics: [
            {
                id: 'ww1',
                title: 'Первая мировая война',
                content: `Первая мировая война (1914-1918) — один из самых широкомасштабных вооружённых конфликтов в истории человечества.`
            }
        ]
    }
];

export default function Home() {
    const [currentSection, setCurrentSection] = useState(null);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Функция для возврата на главную
    const goToHome = () => {
        setCurrentSection(null);
        setCurrentTopic(null);
        setIsQuizMode(false);
        resetQuiz();
    };

    // Функция для возврата к списку тем
    const goToSection = () => {
        setCurrentTopic(null);
        setIsQuizMode(false);
        resetQuiz();
    };

    // Функции для работы с тестом
    const startQuiz = () => {
        setIsQuizMode(true);
        resetQuiz();
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuizCompleted(false);
    };

    const selectAnswer = (answerIndex) => {
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
            <div className="min-h-screen bg-gray-50">
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

                    <article className="max-w-none">
                        <h1 className="text-3xl font-bold mb-6">{currentTopic.title}</h1>
                        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                            {currentTopic.content}
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
                <div className="min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                        <div className="mb-6">
                            <button
                                onClick={exitQuiz}
                                className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Назад к разделу
                            </button>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <SectionIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Тест завершен!</h2>
                                    <p className="text-gray-600">Раздел: {currentSection.title}</p>
                                </div>
                            </div>

                            <div className="text-6xl mb-4">
                                {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
                            </div>

                            <div className="space-y-2">
                                <p>Ваш результат:</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-3xl font-semibold">{score}</span>
                                    <span className="text-gray-600">из {questions.length}</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${percentage >= 80
                                            ? 'bg-green-100 text-green-800'
                                            : percentage >= 60
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                        {percentage}%
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 mt-4">
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
                                        <div key={question.id} className="text-left p-4 border rounded-lg">
                                            <div className="flex items-start gap-3 mb-2">
                                                {isCorrect ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="mb-2 font-medium">{question.question}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Ваш ответ: {question.options[userAnswer]}
                                                    </p>
                                                    {!isCorrect && (
                                                        <p className="text-sm text-green-600 mt-1">
                                                            Правильный ответ: {question.options[question.correctAnswer]}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-600 mt-2">
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
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Пройти еще раз
                                </button>
                                <button
                                    onClick={exitQuiz}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <button
                            onClick={exitQuiz}
                            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Выйти из теста
                        </button>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Тест: {currentSection.title}</h2>
                                <span className="px-3 py-1 border border-gray-300 rounded-full text-sm">
                                    {currentQuestion + 1} из {questions.length}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">{currentQ.question}</h3>
                        <div className="space-y-3">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full text-left p-4 rounded-md border transition-all ${selectedAnswer === index
                                            ? 'border-blue-600 bg-blue-50 text-blue-800'
                                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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
                                className={`px-6 py-2 rounded-md ${selectedAnswer === null
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
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

    // Отображение списка тем в разделе
    if (currentSection) {
        const SectionIcon = currentSection.icon;

        return (
            <div className="min-h-screen bg-gray-50">
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
                                <h1 className="text-2xl font-bold mb-2">{currentSection.title}</h1>
                                <p className="text-gray-600">{currentSection.description}</p>
                            </div>
                            <div>
                                <button
                                    onClick={startQuiz}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                                className="cursor-pointer bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow"
                                onClick={() => setCurrentTopic(topic)}
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-3">
                                        <Book className="w-5 h-5 text-blue-600" />
                                        {topic.title}
                                    </h2>
                                </div>
                                <div>
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
        <div className="min-h-screen bg-gray-50">
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
                                className="cursor-pointer bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105"
                                onClick={() => setCurrentSection(section)}
                            >
                                <div className="mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <SectionIcon className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">{section.title}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        {section.description}
                                    </p>
                                    <div className="text-sm text-gray-500">
                                        {section.topics.length} {section.topics.length === 1 ? 'тема' :
                                            section.topics.length < 5 ? 'темы' : 'тем'}
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