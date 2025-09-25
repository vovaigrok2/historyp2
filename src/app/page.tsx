'use client';

import { useState, useEffect } from 'react';
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

interface InlineImage {
    url: string;
    caption: string;
    alt: string;
}

// Базовый интерфейс для всех типов вопросов
interface BaseQuestion {
    id: string;
    question: string;
    explanation: string;
    type: 'single' | 'multiple' | 'text' | 'matching';
}

// Одиночный выбор
interface SingleChoiceQuestion extends BaseQuestion {
    type: 'single';
    options: string[];
    correctAnswer: number;
}

// Множественный выбор
interface MultipleChoiceQuestion extends BaseQuestion {
    type: 'multiple';
    options: string[];
    correctAnswers: number[];
}

// Текстовый ответ
interface TextAnswerQuestion extends BaseQuestion {
    type: 'text';
    correctAnswer: string;
    caseSensitive?: boolean;
}

// Соответствие
interface MatchingQuestion extends BaseQuestion {
    type: 'matching';
    leftColumn: { id: number; text: string }[];
    rightColumn: { id: string; text: string }[];
    correctMatches: { leftId: number; rightId: string }[];
    leftTitle?: string;
    rightTitle?: string;
}

type Question = SingleChoiceQuestion | MultipleChoiceQuestion | TextAnswerQuestion | MatchingQuestion;

interface Quiz {
    questions: Question[];
}

interface GlossaryTerm {
    term: string;
    definition: string;
}

// НОВЫЙ: Интерфейс для темы с путем к файлу контента
interface Topic {
    id: string;
    title: string;
    image: string;
    contentFile: string; // Путь к текстовому файлу с контентом
}


const TopicContent: React.FC<{ topic: Topic }> = ({ topic }) => {
    const { content, loading, error } = useTopicContent(topic.contentFile);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-amber-700">Загрузка контента...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-700">
                <p>Ошибка загрузки контента: {error}</p>
                <p className="text-sm mt-2">Файл: {topic.contentFile}</p>
            </div>
        );
    }

    return <FormattedText content={content} />;
};



const useTopicContent = (contentFile: string | null) => {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!contentFile) {
            setContent('');
            return;
        }

        const loadContent = async () => {
            setLoading(true);
            setError(null);

            try {
                // Для Next.js можно использовать динамический импорт или fetch
                const response = await fetch(contentFile);

                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status}`);
                }

                const text = await response.text();
                setContent(text);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setContent(''); // Или запасной контент
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [contentFile]);

    return { content, loading, error };
};

interface Section {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    topics: Topic[];
    quiz: Quiz;
    glossary: GlossaryTerm[];
}




const MarkdownImageComponent: React.FC<{
    src: string;
    alt?: string;
    caption?: string;
    className?: string;
}> = ({ src, alt = "", caption = "", className = "" }) => {
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        setAspectRatio(width / height);
    };

    return (
        <div className={`my-6 w-full ${className}`}>
            <div
                className="relative w-full"
                style={{ paddingBottom: `${100 / aspectRatio}%` }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover rounded-lg border-2 border-amber-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    onLoad={handleImageLoad}
                />
            </div>
            {caption && (
                <div className="text-center text-sm text-amber-700 mt-2 italic">
                    {caption}
                </div>
            )}
        </div>
    );
};

const FormattedText: React.FC<{ content: string }> = ({ content }) => {
    const parseContent = (text: string) => {
        // Регулярное выражение для поиска изображений в формате ![alt](src "caption")
        const imageRegex = /!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/g;

        const parts = text.split(imageRegex);
        const result: React.ReactNode[] = [];

        for (let i = 0; i < parts.length; i++) {
            // Каждые 4 элемента образуют полное совпадение: [полный_матч, alt, src, caption]
            if (i % 4 === 0 && parts[i] !== undefined) {
                // Текст перед изображением
                if (parts[i].trim()) {
                    result.push(parseTextWithFormatting(parts[i]));
                }

                // Изображение (если есть следующие части)
                if (parts[i + 1] !== undefined && parts[i + 2] !== undefined) {
                    const alt = parts[i + 1];
                    const src = parts[i + 2];
                    const caption = parts[i + 3] || "";

                    result.push(
                        <MarkdownImageComponent
                            key={`img-${i}`}
                            src={src}
                            alt={alt}
                            caption={caption}
                        />
                    );

                    i += 3; // Пропускаем обработанные части
                }
            }
        }

        // Если не было изображений или остался текст после последнего изображения
        if (result.length === 0 || typeof result[result.length - 1] === 'string') {
            const lastPart = parts[parts.length - 1];
            if (lastPart && lastPart.trim()) {
                result.push(parseTextWithFormatting(lastPart));
            }
        }

        return result;
    };

    // Функция для парсинга текстового форматирования
    const parseTextWithFormatting = (text: string) => {
        let formattedText = text
            // Жирный текст: **текст** или __текст__
            .replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>')
            // Курсив: *текст* или _текст_
            .replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')
            // Подчеркнутый: ~~текст~~
            .replace(/~~(.*?)~~/g, '<u>$1</u>')
            // Зачеркнутый: --текст--
            .replace(/--(.*?)--/g, '<s>$1</s>');

        return (
            <div
                key={`text-${Math.random()}`}
                className="whitespace-pre-line mb-4"
                dangerouslySetInnerHTML={{ __html: formattedText }}
            />
        );
    };

    return <div className="leading-relaxed">{parseContent(content)}</div>;
};

// Функция для парсинга контента с форматированием и изображениями





// Компоненты для различных типов вопросов

// Одиночный выбор
const SingleChoiceQuestionComponent: React.FC<{
    question: SingleChoiceQuestion;
    selectedAnswer: number | null;
    onAnswerSelect: (answer: number) => void;
}> = ({ question, selectedAnswer, onAnswerSelect }) => {
    return (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    className={`w-full text-left p-4 rounded-md border transition-all ${selectedAnswer === index
                            ? 'border-amber-600 bg-amber-200 text-amber-900'
                            : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-amber-800'
                        }`}
                    onClick={() => onAnswerSelect(index)}
                >
                    <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                </button>
            ))}
        </div>
    );
};

// Множественный выбор
const MultipleChoiceQuestionComponent: React.FC<{
    question: MultipleChoiceQuestion;
    selectedAnswers: number[];
    onAnswerSelect: (answers: number[]) => void;
}> = ({ question, selectedAnswers, onAnswerSelect }) => {
    const toggleAnswer = (index: number) => {
        const newAnswers = selectedAnswers.includes(index)
            ? selectedAnswers.filter(i => i !== index)
            : [...selectedAnswers, index];
        onAnswerSelect(newAnswers);
    };

    return (
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    className={`w-full text-left p-4 rounded-md border transition-all ${selectedAnswers.includes(index)
                            ? 'border-amber-600 bg-amber-200 text-amber-900'
                            : 'border-amber-300 hover:border-amber-400 hover:bg-amber-200 text-amber-800'
                        }`}
                    onClick={() => toggleAnswer(index)}
                >
                    <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                </button>
            ))}
        </div>
    );
};

// Текстовый ответ
const TextAnswerQuestionComponent: React.FC<{
    question: TextAnswerQuestion;
    answer: string;
    onAnswerChange: (answer: string) => void;
}> = ({ question, answer, onAnswerChange }) => {
    return (
        <div className="space-y-3">
            <input
                type="text"
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="w-full p-4 border border-amber-300 rounded-md focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="Введите ваш ответ..."
            />
            {!question.caseSensitive && (
                <p className="text-sm text-amber-600">Регистр букв не учитывается</p>
            )}
        </div>
    );
};

// Соответствие
const MatchingQuestionComponent: React.FC<{
    question: MatchingQuestion;
    matches: { leftId: number; rightId: string }[];
    onMatchesChange: (matches: { leftId: number; rightId: string }[]) => void;
}> = ({ question, matches, onMatchesChange }) => {
    const getMatchForLeft = (leftId: number) => {
        return matches.find(match => match.leftId === leftId)?.rightId || '';
    };

    const handleMatchChange = (leftId: number, rightId: string) => {
        const newMatches = matches.filter(match => match.leftId !== leftId);
        if (rightId) {
            newMatches.push({ leftId, rightId });
        }
        onMatchesChange(newMatches);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-amber-900 mb-2">
                        {question.leftTitle || 'Левый столбец'}
                    </h4>
                    <div className="space-y-2">
                        {question.leftColumn.map((item) => (
                            <div key={item.id} className="p-3 bg-amber-100 rounded border border-amber-200">
                                {item.id}. {item.text}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-amber-900 mb-2">
                        {question.rightTitle || 'Правый столбец'}
                    </h4>
                    <div className="space-y-2">
                        {question.rightColumn.map((item) => (
                            <div key={item.id} className="p-3 bg-amber-100 rounded border border-amber-200">
                                {item.id}. {item.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-semibold text-amber-900">Установите соответствие:</h4>
                {question.leftColumn.map((leftItem) => (
                    <div key={leftItem.id} className="flex items-center gap-3">
                        <span className="font-medium w-8">{leftItem.id}.</span>
                        <span className="flex-1">{leftItem.text}</span>
                        <select
                            value={getMatchForLeft(leftItem.id)}
                            onChange={(e) => handleMatchChange(leftItem.id, e.target.value)}
                            className="p-2 border border-amber-300 rounded"
                        >
                            <option value="">Выберите...</option>
                            {question.rightColumn.map((rightItem) => (
                                <option key={rightItem.id} value={rightItem.id}>
                                    {rightItem.id}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className="text-sm text-amber-600">
                Введите ответ в формате: {question.leftColumn.map(item => item.id).join('')} → {question.rightColumn.map(item => item.id).join('')}
            </div>
        </div>
    );
};

// Данные сайта с разными типами вопросов
const sections: Section[] = [
    {
        id: 'ancient',
        title: 'Кубань в древности',
        description: 'История Кубани от каменного века до Античности',
        icon: Building,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    type: 'single',
                    question: 'Сколько тысячелетий просуществовала египетская цивилизация?',
                    options: ['Более одного тысячелетия', 'Более двух тысячелетий', 'Более трех тысячелетий', 'Более четырех тысячелетий'],
                    correctAnswer: 2,  // ЭТО ИНДЕКС!!
                    explanation: 'Древний Египет просуществовал более трех тысячелетий, от додинастического периода до римского завоевания.'
                },
                {
                    id: 'q2',
                    type: 'multiple',
                    question: 'Какие из этих достижений принадлежат древним грекам?',
                    options: ['Демократия', 'Олимпийские игры', 'Римское право', 'Театр', 'Акведуки'],
                    correctAnswers: [0, 1, 3],
                    explanation: 'Древние греки создали демократию, Олимпийские игры и театр. Римское право и акведуки — достижения Древнего Рима.'
                },
                {
                    id: 'q3',
                    type: 'text',
                    question: 'В каком году был основан Рим согласно легенде?',
                    correctAnswer: '753 до н.э.',
                    caseSensitive: false,
                    explanation: 'Согласно римской легенде, Рим был основан Ромулом в 753 году до н.э.'
                },
                {
                    id: 'q4',
                    type: 'matching',
                    question: 'Установите соответствие между древними цивилизациями и их достижениями:',
                    leftColumn: [
                        { id: 1, text: 'Древний Египет' },
                        { id: 2, text: 'Древний Рим' },
                        { id: 3, text: 'Древняя Греция' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Пирамиды' },
                        { id: 'B', text: 'Акведуки' },
                        { id: 'C', text: 'Демократия' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'A' },
                        { leftId: 2, rightId: 'B' },
                        { leftId: 3, rightId: 'C' }
                    ],
                    leftTitle: 'Цивилизации',
                    rightTitle: 'Достижения',
                    explanation: 'Египет известен пирамидами, Рим — акведуками, Греция — демократией.'
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
                id: 'kubanKamen',
                title: 'Кубань в каменном веке',
                image: '/images/kubanKamenPreview.png',
                contentFile: '/1/1/text.txt'
            },
            {
                id: 'bronzeCulture',
                title: 'Культуры эпохи бронзы',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/1/2/text.txt'
            },
            {
                id: '1.3',
                title: 'Население Северо-Западного Кавказа в железном веке',
                image: '/images/ancient-greece.jpeg',
                contentFile: '/1/3/text.txt'
            },
            {
                id: '1.4',
                title: 'Греческая колонизация Северо-Западного Кавказа',
                image: '/images/ancient-greece.jpeg',
                contentFile: '/1/4/text.txt'
            },
        ]
    },
    {
        id: 'kuban18-19',
        title: 'Кубань в ХVIII -  ХIХ вв.',
        description: 'Социально-экономическое и политическое развитие Кубани',
        icon: Building,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    type: 'single',
                    question: '1.	Согласно сложившемуся в конце ХIХ в. порядка прохождения службы, срок военной службы кубанских казаков составлял ... лет',
                    options: ['18 лет', '20 лет', '22 года', '25 лет'],
                    correctAnswer: 1,
                    explanation: 'Срок службы кубанских казаков по Положению 1860-х гг. составлял 20 лет: 3 года в приготовительном разряде, 12 лет в строевом, 5 лет в запасе.'
                },
                {
                    id: 'q2',
                    type: 'single',
                    question: '2.	Центром Кавказского наместничества был город...',
                    options: ['Екатеринодар', 'Ростов на Дону', 'Батуми', 'Тбилиси'],
                    correctAnswer: 3,
                    explanation: 'Центром Кавказского наместничества был Тифлис (современный Тбилиси).'
                },
                {
                    id: 'q3',
                    type: 'single',
                    question: 'Административным центром Черноморской губернии был город ...',
                    options: ['Екатеринодар', 'Туапсе', 'Новороссийск', 'Анапа'],
                    correctAnswer: 2,
                    explanation: 'Черноморская губерния была образована в 1896 году с центром в Новороссийске.'
                },
                
                {
                    id: 'q4',
                    type: 'text',
                    question: 'Большую роль в росте промышленности сельского хозяйства, торговли, а также крестьянской миграции сыграла … железная дорога (Вставьте название железной дороги в виде прилагательного в единственном числе именительном падеже) ',
                    correctAnswer: 'Владикавказская',
                    caseSensitive: false,
                    explanation: 'Владикавказская железная дорога, соединившая центр России с портами Черного моря, сыграла ключевую роль в экономическом развитии региона.'
                },

                {
                    id: 'q5',
                    type: 'matching',
                    question: 'Порядок прохождения службы казаков с конце ХIХ в. происходил в следующей последовательности:',
                    leftColumn: [
                        { id: 1, text: '«Строевой разряд»' },
                        { id: 2, text: '«Запасной разряд»' },
                        { id: 3, text: '«Приготовительный разряд»' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Первый разряд' },
                        { id: 'B', text: 'Второй разряд' },
                        { id: 'C', text: 'Третий разряд' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'C' },
                        { leftId: 2, rightId: 'A' },
                        { leftId: 3, rightId: 'B' }
                    ],
                    leftTitle: 'Разряд',
                    rightTitle: 'Порядок',
                    explanation: 'Порядок службы: сначала "приготовительный разряд" (3 года, домашняя подготовка), затем "строевой разряд" (12 лет, непосредственная служба), потом "запасной разряд" (5 лет).'
                },
                {
                    id: 'q6',
                    type: 'multiple',
                    question: 'К числу первых русских поселенцев на Кубани относятся (Выберите два варианта ответа)',
                    options: ['Казаки участники восстания под предводительством Емельяна Пугачева', 'Казаки участники восстания под предводительством Кондратия Булавина', 'Раскольники, бежавшие от преследований за веру', 'Казаки участники восстания под предводительством Степана Разина'],
                    correctAnswers: [ 1, 2],
                    explanation: 'После подавления Булавинского восстания (1707-1708) часть казаков-старообрядцев бежала на Кубань, положив начало ранним русским поселениям в регионе.'
                },
                {
                    id: 'q7',
                    type: 'matching',
                    question: 'Установите соответствия между историческими явлениями и их характеристиками',
                    leftColumn: [
                        { id: 1, text: 'Войско верных казаков' },
                        { id: 2, text: 'Кубанское казачье войско' },
                        { id: 3, text: 'пластуны' },
                        { id: 4, text: 'Линейцы' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Казаки, которые при формировании Кубанского казачьего войска в 1860 году перешли в него из состава Кавказского Линейного войска и состояли в основном из потомков донских и волжских казаков' },
                        { id: 'B', text: 'Казачье войско, образованное 19 ноября 1860 г. в результате переименовании Черноморского казачьего войска и включения в его состав шести бригад кавказского Линейного казачьего войска с землями.' },
                        { id: 'C', text: 'Казачье войско, сформированное из казаков ликвидированного в 1775 г. Запорожского казачьего войска и добровольцев из свободных сословий по указу Екатерины II от 14 января 1788 г. ' },
                        { id: 'D', text: 'Пешие казаки из особой команды, которая несла сторожевую и разведочную службу. Пластуны набирались из казаков, которые не могли приобрести боевого коня' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'C' },
                        { leftId: 2, rightId: 'B' },
                        { leftId: 3, rightId: 'D' },
                        { leftId: 4, rightId: 'A' }
                    ],
                    leftTitle: 'Историческое явление/термин',
                    rightTitle: 'Характеристика',
                    explanation: 'Порядок службы: сначала "приготовительный разряд" (3 года, домашняя подготовка), затем "строевой разряд" (12 лет, непосредственная служба), потом "запасной разряд" (5 лет).'
                },
                {
                    id: 'q8',
                    type: 'matching',
                    question: 'Установите соответствие между личностями и связанными с ними событиями истории Кубани ХVIII-ХIХ вв.',
                    leftColumn: [
                        { id: 1, text: 'Г. Потемкин' },
                        { id: 2, text: 'Екатерина II' },
                        { id: 3, text: 'С. Белый' },
                        { id: 4, text: 'А. Головатый ' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Руководство делегацией черноморских казаков с просьбой ее об отводе Черноморскому войску свободных земель на Тамани с окрестностями' },
                        { id: 'B', text: 'Руководство первой группой черноморских казаков, выдвинувшихся из очаковского лимана для заселения Кубани' },
                        { id: 'C', text: 'Идея создания войска верных казаков' },
                        { id: 'D', text: '«Жалованная грамота» Черноморскому войску на кубанские земли' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'C' },
                        { leftId: 2, rightId: 'D' },
                        { leftId: 3, rightId: 'B' },
                        { leftId: 4, rightId: 'A' }
                    ],
                    leftTitle: 'Историческое явление/термин',
                    rightTitle: 'Характеристика',
                    explanation: 'Порядок службы: сначала "приготовительный разряд" (3 года, домашняя подготовка), затем "строевой разряд" (12 лет, непосредственная служба), потом "запасной разряд" (5 лет).'
                },

            ]
        },
        glossary: [
            { term: 'Аталычество', definition: 'обычай искусственного родства, когда ребенка, в детском возрасте передавали на воспитание в другую семью. Аталычество было добровольным актом со стороны родителей и, в первую очередь, было связано с желанием родителей закалить характер ребенка, привить ему лучшие качества, что было сложно в окружении родительской любви и заботы.' },
            { term: 'Войско верных казаков', definition: 'казачье войско, сформированное из казаков ликвидированного в 1775 г. Запорожского казачьего войска и добровольцев из свободных сословий по указу Екатерины II от 14 января 1788 г.' },
            { term: 'Иностранная колонизация Кубани', definition: 'Массовое заселение и хозяйственное освоение Кубани христианским славянским населением было продолжено в ХIХ в. и приняло грандиозные масштабы. По мере завершения Кавказской войны становилось очевидным, что возможностей военно-казачьей колонизации недостаточно. В этой связи наряду с народной крестьянской колонизацией российские власти стали активно использовать возможности иностранной колонизации' },
            { term: 'Кубанское казачье войско', definition: 'Казачье войско, образованное 19 ноября 1860 г. в результате переименовании Черноморского казачьего войска и включения в его состав шести бригад кавказского Линейного казачьего войска с землями' },
            { term: 'Кубанская область', definition: 'Административно-территориальная единица Российской империи, образовавшаяся  в 1860 г. и существовавшая до 1918 г. на землях Кубанского казачьего войска. В ее состав входили: большая часть современного Краснодарского края, Республики Карачаево-Черкесия, полностью Республика Адыгея, западная часть Ставропольского края и южная часть Ростовской области. Административным центром области был город Екатеринодар' },
            { term: 'Линейцы', definition: 'Казаки, которые  при формировании Кубанского казачьего войска в 1860 году перешли в него из состава Кавказского Линейного войска, из основной части которого было образовано Терское казачье войско. Как правило, линейцы были потомками донских и волжских казаков' },
            { term: 'Народная колонизация Кубани', definition: 'Процесс массового заселения и хозяйственного освоения Кубани по преимуществу крестьянским славянским населением из южных и центральных губерний Российской империи, начавшийся в середине ХIХ в. ' },
            { term: 'Мюридизм', definition: 'Исламское религиозное вероучение, в основе которого лежало  утверждение, что Магомед выдвигает из народа мюридов (послушников), которые обязуются сохранить учение Корана в чистоте, и что правоверные должны беспрекословно повиноваться им как избранным людям. Практически мюриды давали обет посвятить все свои силы и жизнь газавату - священной войне, борьбе с гяурами. Мюридизм на Северном Кавказе в 20-50-е гг. ХIХ в. выступал не только как религиозное учение, но и как форма военно-политической организации, создаваемой наибами Шамиля для мобилизации и консолидации сил  всех северокавказских народов в борьбе против экспансии России' },
            { term: 'Пластуны', definition: 'Пешие казаки в Кубанском войске из особой команды, которая несла сторожевую и разведочную службу. Пластуны набирались из казаков, которые не могли приобрести боевого коня' },
            { term: 'Черкесия', definition: 'Закрепившееся в исторической литературе обозначение территории проживания адыгских племен на Северо-Западном Кавказе. Ее границы на Западе проходили по восточному побережью Черного и Азовского морей, на севере по левобережью Кубани, на востоке до р. Сунжи' },
            { term: 'Черноморская кордонная линия', definition: 'Совокупность укреплений, устроенных русским командованием по правому берегу Кубани от впадения ниже Лабы до берега Черного моря с целью защиты славянского населения Кубанской области от   непрерывных набегов закубанских адыгов' },
            { term: 'Черноморское казачье войско', definition: 'Военное казачье формирование, созданное в 1787 г. из частей Войска верных казаков, которому за военные заслуги в русско-турецкой войне 1787-1791 гг. были пожалованы для поселения земли между Бугом и Днестром по берегу Чёрного моря, отвоеванные у турок, а также остров Тамань. Отсюда и возникло новое название войска - черноморское. В казаки принимались все желающие из числа свободных людей. Наибольшая часть войска была сформирована из этнических малороссов (украинцев)' },
            { term: 'Черноморская губерния', definition: 'Административно-территориальная единица в 1896-1918 гг., образовавшаяся в результате преобразования Черноморского округа Кубанской области и выделения его в самостоятельную административную единицу с центром в Новороссийске. Губерния занимала западную часть Северного Кавказа и тянулась в виде узкой и длинной полосы вдоль северо-восточного берега Черного моря' }
        ],
        topics: [
            {
                id: 'topic1',
                title: 'Территория расселения и общественно-политическое устройство адыгов в ХVIII - середине ХIХ вв.',
                image: '/images/kubanKamenPreview.jpeg',
                contentFile: '/3/1/text.txt'
            },
            {
                id: 'topic2',
                title: 'Военно-политическая ситуация на Северо-Западном Кавказе в ХVIII веке',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/2/text.txt'
            }
            ,
            {
                id: 'topic3',
                title: 'Переселение черноморских и донских казаков на Кубань',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/3/text.txt'
            }
            ,
            {
                id: 'topic4',
                title: 'Присоединение Северо-Западного Кавказа к России',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/4/text.txt'
            }
            ,
            {
                id: 'topic5',
                title: 'Военно-казачья и народная колонизация Кубани',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/5/text.txt'
            }
            ,
            {
                id: 'topic6',
                title: 'Иностранная колонизация Кубани',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/6/text.txt'
            }
            ,
            {
                id: 'topic7',
                title: 'Образование Кубанской области и Кубанского казачьего войска. Военная служба казаков.',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/7/text.txt'
            }
            ,
            {
                id: 'topic8',
                title: 'Социально-экономическое развитие Кубани во второй половине ХIХ в.',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/8/text.txt'
            }
            ,
            {
                id: 'topic9',
                title: 'Культура и быт казачества и адыгов',
                image: '/images/1 Раздел/1.2/Ravshans.png',
                contentFile: '/3/9/text.txt'
            }
        ]
    },
];

export default function Home() {
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
    const [isQuizMode, setIsQuizMode] = useState(false);
    const [isGlossaryMode, setIsGlossaryMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<any[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Функции навигации
    const goToHome = () => {
        setCurrentSection(null);
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
        resetQuiz();
    };

    const goToSection = () => {
        setCurrentTopic(null);
        setIsQuizMode(false);
        setIsGlossaryMode(false);
        resetQuiz();
    };

    const startQuiz = () => {
        setIsQuizMode(true);
        setIsGlossaryMode(false);
        resetQuiz();
    };

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

    const handleAnswerSelect = (answer: any) => {
        setSelectedAnswer(answer);
    };

    const nextQuestion = () => {
        if (selectedAnswer !== null && selectedAnswer !== undefined && selectedAnswer !== '') {
            const newAnswers = [...userAnswers, selectedAnswer];
            setUserAnswers(newAnswers);

            if (currentSection && currentQuestion < currentSection.quiz.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(getInitialAnswerState(currentSection.quiz.questions[currentQuestion + 1]));
            } else {
                setQuizCompleted(true);
                setShowResult(true);
            }
        }
    };
    // Функция для получения начального состояния ответа в зависимости от типа вопроса
    const getInitialAnswerState = (question: Question) => {
        switch (question.type) {
            case 'single':
                return null;
            case 'multiple':
                return [];
            case 'text':
                return '';
            case 'matching':
                return [];
            default:
                return null;
        }
    };

    // Проверка правильности ответов
    const checkAnswer = (question: Question, userAnswer: any): boolean => {
        switch (question.type) {
            case 'single':
                return userAnswer === question.correctAnswer;
            case 'multiple':
                return JSON.stringify([...userAnswer].sort()) === JSON.stringify([...question.correctAnswers].sort());
            case 'text':
                if (question.caseSensitive) {
                    return userAnswer.trim() === question.correctAnswer;
                }
                return userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
            case 'matching':
                return JSON.stringify([...userAnswer].sort((a, b) => a.leftId - b.leftId)) ===
                    JSON.stringify([...question.correctMatches].sort((a, b) => a.leftId - b.leftId));
            default:
                return false;
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
            if (checkAnswer(currentSection.quiz.questions[index], answer)) {
                correct++;
            }
        });
        return correct;
    };


       // Отображение теста
    if (currentSection && isQuizMode) {
        const SectionIcon = currentSection.icon;
        const questions = currentSection.quiz.questions;

        const currentQ = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        // Функции для форматирования ответов
        const formatUserAnswer = (question: Question, answer: any): string => {
            switch (question.type) {
                case 'single':
                    return question.options[answer as number];
                case 'multiple':
                    return (answer as number[]).map(idx => question.options[idx]).join(', ');
                case 'text':
                    return answer as string;
                case 'matching':
                    return (answer as any[]).map(match => `${match.leftId}→${match.rightId}`).join(', ');
                default:
                    return '';
            }
        };

        const formatCorrectAnswer = (question: Question): string => {
            switch (question.type) {
                case 'single':
                    return question.options[(question as SingleChoiceQuestion).correctAnswer];
                case 'multiple':
                    return (question as MultipleChoiceQuestion).correctAnswers.map(idx => question.options[idx]).join(', ');
                case 'text':
                    return (question as TextAnswerQuestion).correctAnswer;
                case 'matching':
                    return (question as MatchingQuestion).correctMatches.map(match => `${match.leftId}→${match.rightId}`).join(', ');
                default:
                    return '';
            }
        };

        // Проверка готовности к следующему вопросу
        const isAnswerReady = () => {
            if (selectedAnswer === null || selectedAnswer === undefined) return false;
            if (currentQ.type === 'multiple' && selectedAnswer.length === 0) return false;
            if (currentQ.type === 'text' && selectedAnswer.trim() === '') return false;
            if (currentQ.type === 'matching' && selectedAnswer.length !== currentQ.leftColumn.length) return false;
            return true;
        };

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
                                    <span className={`px-2 py-1 rounded-full text-sm ${percentage >= 80 ? 'bg-green-200 text-green-800' :
                                            percentage >= 60 ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-red-200 text-red-800'
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
                                    const isCorrect = checkAnswer(question, userAnswer);

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
                                                        Ваш ответ: {formatUserAnswer(question, userAnswer)}
                                                    </p>
                                                    {!isCorrect && (
                                                        <p className="text-sm text-green-700 mt-1">
                                                            Правильный ответ: {formatCorrectAnswer(question)}
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

                        {/* Рендеринг соответствующего типа вопроса */}
                        {currentQ.type === 'single' && (
                            <SingleChoiceQuestionComponent
                                question={currentQ}
                                selectedAnswer={selectedAnswer}
                                onAnswerSelect={handleAnswerSelect}
                            />
                        )}

                        {currentQ.type === 'multiple' && (
                            <MultipleChoiceQuestionComponent
                                question={currentQ}
                                selectedAnswers={selectedAnswer}
                                onAnswerSelect={handleAnswerSelect}
                            />
                        )}

                        {currentQ.type === 'text' && (
                            <TextAnswerQuestionComponent
                                question={currentQ}
                                answer={selectedAnswer}
                                onAnswerChange={handleAnswerSelect}
                            />
                        )}

                        {currentQ.type === 'matching' && (
                            <MatchingQuestionComponent
                                question={currentQ}
                                matches={selectedAnswer}
                                onMatchesChange={handleAnswerSelect}
                            />
                        )}

                        <div className="flex justify-end pt-6">
                            <button
                                onClick={nextQuestion}
                                disabled={!isAnswerReady()}
                                className={`px-6 py-2 rounded-md transition-colors ${!isAnswerReady()
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
                            <span onClick={goToHome} className="cursor-pointer hover:text-amber-900">
                                Главная
                            </span>
                            {' > '}
                            <span onClick={goToSection} className="cursor-pointer hover:text-amber-900">
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
                                <TopicContent topic={currentTopic} />
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
                                <div className="aspect-video relative overflow-hidden">
                                    <Image
                                        src={topic.image}
                                        alt={topic.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full shadow-sm">
                                        <Book className="w-4 h-4 text-amber-600" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800  leading-tight">
                                        {topic.title}
                                    </h3>
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

