'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Функция для создания PDF с результатами теста
const generateTestPDF = async (sectionTitle: string, score: number, totalQuestions: number, percentage: number, questions: any[], userAnswers: any[]) => {
    try {
        // Создаем временный элемент для рендеринга
        const element = document.createElement('div');
        element.style.width = '210mm'; // A4 width
        element.style.padding = '20px';
        element.style.backgroundColor = '#fefce8';
        element.style.fontFamily = 'Arial, sans-serif';

        // Форматируем дату
        const now = new Date();
        const dateStr = now.toLocaleDateString('ru-RU');
        const timeStr = now.toLocaleTimeString('ru-RU');

        // Создаем HTML для PDF
        element.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #d97706; padding-bottom: 20px;">
        <h1 style="color: #92400e; margin: 0 0 10px 0;">Результаты теста</h1>
        <h2 style="color: #b45309; margin: 0 0 15px 0;">${sectionTitle}</h2>
        <div style="display: flex; justify-content: center; gap: 30px; font-size: 16px;">
          <div>Дата: ${dateStr}</div>
          <div>Время: ${timeStr}</div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 40px; background: #fef3c7; padding: 20px; border-radius: 10px;">
        <div style="font-size: 48px; margin-bottom: 10px;">
          ${percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
        </div>
        <div style="font-size: 24px; color: #92400e; margin-bottom: 10px;">
          Результат: ${score} из ${totalQuestions}
        </div>
        <div style="font-size: 20px; color: ${percentage >= 80 ? '#059669' :
                percentage >= 60 ? '#d97706' : '#dc2626'
            };">
          ${percentage}% - ${percentage >= 80 ? 'Отлично' :
                percentage >= 60 ? 'Хорошо' : 'Нужно повторить материал'
            }
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h3 style="color: #92400e; border-bottom: 1px solid #d97706; padding-bottom: 10px;">
          Детализация ответов:
        </h3>
        ${questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = checkAnswer(question, userAnswer);

                const formatAnswer = (q: any, answer: any) => {
                    switch (q.type) {
                        case 'single':
                            return q.options[answer as number] || 'Нет ответа';
                        case 'multiple':
                            return (answer as number[] || []).map((idx: number) => q.options[idx]).join(', ') || 'Нет ответа';
                        case 'text':
                            return answer as string || 'Нет ответа';
                        case 'matching':
                            return (answer as any[] || []).map((match: any) => `${match.leftId}→${match.rightId}`).join(', ') || 'Нет ответа';
                        default:
                            return 'Нет ответа';
                    }
                };

                const formatCorrect = (q: any) => {
                    switch (q.type) {
                        case 'single':
                            return q.options[q.correctAnswer];
                        case 'multiple':
                            return q.correctAnswers.map((idx: number) => q.options[idx]).join(', ');
                        case 'text':
                            return q.correctAnswer;
                        case 'matching':
                            return q.correctMatches.map((match: any) => `${match.leftId}→${match.rightId}`).join(', ');
                        default:
                            return '';
                    }
                };

                return `
            <div style="margin-bottom: 25px; padding: 15px; background: ${isCorrect ? '#f0fdf4' : '#fef2f2'}; border-radius: 8px; border-left: 4px solid ${isCorrect ? '#10b981' : '#ef4444'};">
              <div style="display: flex; align-items: start; margin-bottom: 10px;">
                <span style="color: ${isCorrect ? '#10b981' : '#ef4444'}; font-weight: bold; margin-right: 10px;">
                  ${isCorrect ? '✓' : '✗'} ${index + 1}.
                </span>
                <div style="flex: 1;">
                  <div style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">
                    ${question.question}
                  </div>
                  <div style="font-size: 14px; color: #6b7280; margin-bottom: 5px;">
                    <strong>Ваш ответ:</strong> ${formatAnswer(question, userAnswer)}
                  </div>
                  ${!isCorrect ? `
                    <div style="font-size: 14px; color: #059669;">
                      <strong>Правильный ответ:</strong> ${formatCorrect(question)}
                    </div>
                  ` : ''}
                </div>
              </div>
              <div style="font-size: 13px; color: #6b7280; background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #d97706;">
                <strong>Объяснение:</strong> ${question.explanation}
              </div>
            </div>
          `;
            }).join('')}
      </div>


    `;

        // Добавляем элемент в DOM
        document.body.appendChild(element);

        // Создаем canvas из элемента
        const canvas = await html2canvas(element, {
            scale: 2, // Увеличиваем качество
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#fefce8'
        });

        // Удаляем временный элемент
        document.body.removeChild(element);

        // Создаем PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Добавляем первую страницу
        pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Добавляем дополнительные страницы если нужно
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Сохраняем PDF
        pdf.save(`Результаты теста - ${sectionTitle} - ${dateStr}.pdf`);

    } catch (error) {
        console.error('Ошибка при создании PDF:', error);
        alert('Произошла ошибка при создании PDF файла');
    }
};
// Функция для проверки ответов (должна быть доступна в области видимости)
const checkAnswer = (question: Question, userAnswer: any): boolean => {
    switch (question.type) {
        case 'single':
            return userAnswer === (question as SingleChoiceQuestion).correctAnswer;
        case 'multiple':
            return JSON.stringify([...(userAnswer || [])].sort()) ===
                JSON.stringify([...(question as MultipleChoiceQuestion).correctAnswers].sort());
        case 'text':
            const textQuestion = question as TextAnswerQuestion;
            if (textQuestion.caseSensitive) {
                return (userAnswer || '').trim() === textQuestion.correctAnswer;
            }
            return (userAnswer || '').trim().toLowerCase() === textQuestion.correctAnswer.toLowerCase();
        case 'matching':
            return JSON.stringify([...(userAnswer || [])].sort((a: any, b: any) => a.leftId - b.leftId)) ===
                JSON.stringify([...(question as MatchingQuestion).correctMatches].sort((a: any, b: any) => a.leftId - b.leftId));
        default:
            return false;
    }
};

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
    align?: 'left' | 'right' | 'center';
}> = ({ src, alt = "", caption = "", className = "", align = 'center' }) => {
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        setAspectRatio(width / height);
    };

    // Классы для разных типов выравнивания с медиа-запросами
    const alignmentClasses = {
        left: "float-left mr-4 mb-4 ml-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        right: "float-right ml-4 mb-4 mr-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        center: "mx-auto my-6 w-full"
    };

    // Для центрированных изображений
    if (align === 'center') {
        return (
            <div className={`${alignmentClasses[align]} ${className}`}>
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
                    <div className="text-center text-lg text-black-700 mt-2 italic">
                        {caption}
                    </div>
                )}
            </div>
        );
    }

    // Для левого/правого выравнивания - на мобильных делаем центрированными
    return (
        <>
            {/* Мобильная версия - центрированная */}
            <div className={`md:hidden mx-auto my-4 w-full max-w-md ${className}`}>
                <div
                    className="relative w-full"
                    style={{ paddingBottom: `${100 / aspectRatio}%` }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover rounded-lg border-2 border-amber-300"
                        sizes="(max-width: 768px) 100vw, 400px"
                        onLoad={handleImageLoad}
                    />
                </div>
                {caption && (
                    <div className="text-center text-lg text-black mt-2 italic">
                        {caption}
                    </div>
                )}
            </div>

            {/* Десктопная версия - с обтеканием */}
            <div className={`hidden md:block ${alignmentClasses[align]} ${className}`}>
                <Image
                    src={src}
                    alt={alt}
                    width={300}
                    height={200}
                    className="rounded-lg border-2 border-amber-300 object-cover w-full"
                    sizes="(max-width: 768px) 100vw, 300px"
                    onLoad={handleImageLoad}
                />
                {caption && (
                    <div className="text-center text-lg text-black mt-2 italic">
                        {caption}
                    </div>
                )}
            </div>
        </>
    );
    };



const MarkdownVideoComponent: React.FC<{
    src: string;
    alt?: string;
    caption?: string;
    className?: string;
    align?: 'left' | 'right' | 'center';
}> = ({ src, alt = "", caption = "", className = "", align = 'center' }) => {
    const [aspectRatio, setAspectRatio] = useState<number>(16 / 9); // Стандарт для видео

    // Извлечение video ID из URL Rutube
    const videoIdMatch = src.match(/\/video\/([a-zA-Z0-9]+)\/?/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const embedSrc = videoId ? `https://rutube.ru/embed/${videoId}` : src; // Fallback на оригинальный src, если не Rutube

    // Классы выравнивания — аналогично изображениям
    const alignmentClasses = {
        left: "float-left mr-4 mb-4 ml-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        right: "float-right ml-4 mb-4 mr-0 max-w-[50%] md:max-w-[300px] w-full md:w-auto",
        center: "mx-auto my-6 w-full"
    };

    if (align === 'center') {
        return (
            <div className={`${alignmentClasses[align]} ${className}`}>
                <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
                    <iframe
                        src={embedSrc}
                        title={alt.replace('video:', '')} // Убираем префикс для title
                        className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-amber-300"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
                {caption && (
                    <div className="text-center text-sm text-amber-700 mt-2 italic">
                        {caption}
                    </div>
                )}
            </div>
        );
    }

    // Для L/R — мобильная версия центрированная
    return (
        <>
            {/* Мобильная */}
            <div className={`md:hidden mx-auto my-4 w-full max-w-md ${className}`}>
                <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
                    <iframe
                        src={embedSrc}
                        title={alt.replace('video:', '')}
                        className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-amber-300"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
                {caption && (
                    <div className="text-center text-lg text-black mt-2 italic">
                        {caption}
                    </div>
                )}
            </div>

            {/* Десктоп */}
            <div className={`hidden md:block ${alignmentClasses[align]} ${className}`}>
                <div className="relative w-[300px]" style={{ paddingBottom: `${100 / aspectRatio * (300 / (16 / 9 * 300))}%` }}> {/* Фикс ширины */}
                    <iframe
                        src={embedSrc}
                        title={alt.replace('video:', '')}
                        className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-amber-300"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
                {caption && (
                    <div className="text-center text-lg text-black mt-2 italic">
                        {caption}
                    </div>
                )}
            </div>
        </>
    );
};


const FormattedText: React.FC<{ content: string }> = ({ content }) => {
    const parseContent = (text: string) => {
        // Обновляем регулярное выражение для поддержки выравнивания: ![alt](src,align "caption")
        const imageRegex = /!\[(.*?)\]\((.*?)(?:,\s*([LR]))?(?:\s+"(.*?)")?\)/g;

        const parts = text.split(imageRegex);
        const result: React.ReactNode[] = [];

        for (let i = 0; i < parts.length; i++) {
            // Теперь каждые 5 элементов: [полный_матч, alt, src, align, caption]
            if (i % 5 === 0 && parts[i] !== undefined) {
                // Текст перед изображением
                if (parts[i].trim()) {
                    result.push(parseTextWithFormatting(parts[i]));
                }

                // Изображение (если есть следующие части)
                if (parts[i + 1] !== undefined && parts[i + 2] !== undefined) {
                    const alt = parts[i + 1];
                    const src = parts[i + 2];
                    const align = parts[i + 3] as 'L' | 'R' | undefined;
                    const caption = parts[i + 4] || "";

                    // Преобразуем L/R в left/right
                    const alignment = align === 'L' ? 'left' : align === 'R' ? 'right' : 'center';

                    if (alt.startsWith('video:')) {
                        result.push(
                            <MarkdownVideoComponent
                                key={`video-${i}`}
                                src={src}
                                alt={alt}
                                caption={caption}
                                align={alignment}
                            />
                        );
                    } else {
                        result.push(
                            <MarkdownImageComponent
                                key={`img-${i}`}
                                src={src}
                                alt={alt}
                                caption={caption}
                                align={alignment}
                            />
                        );
                    }

                    i += 4;
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

    // Добавляем очистку floats после контента
    return (
        <div className="leading-relaxed">
            {parseContent(content)}
            <div className="clear-both"></div>
        </div>
    );
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
                    question: 'Заселение человеком современной территории Кубани началось в…',
                    options: [
                        'железном веке',
                        'древнекаменном веке',
                        'эпоху бронзы',
                        'в раннем средневековье'
                    ],
                    correctAnswer: 1,
                    explanation: 'Заселение человеком современной территории Кубани началось в древнекаменном веке.'
                },
                {
                    id: 'q2',
                    type: 'single',
                    question: 'Первой цивилизацией не только на Северном Кавказе, но и на всей территории России, возникшей в эпоху бронзы с центром в Прикубанье и охватывавшей равнины и предгорья Предкавказья от Таманского полуострова до Чечни являлась',
                    options: [
                        'майкопская культура',
                        'дольменная культура',
                        'северокавказская культура',
                        'катакомбная культура'
                    ],
                    correctAnswer: 0,
                    explanation: 'Майкопская культура – самая древняя цивилизация на территории современной России и Европы, сложившаяся в эпоху ранней бронзы в III тысячелетии до н.э.'
                },
                {
                    id: 'q3',
                    type: 'single',
                    question: 'Основным населением Северо-Западного Кавказа в железном веке были',
                    options: [
                        'скифы',
                        'меоты',
                        'синды',
                        'сарматы'
                    ],
                    correctAnswer: 1,
                    explanation: 'Меоты – собирательное название ряда родственных племен Северо-Западного Кавказа, населявших обширное пространство по восточному берегу Азовского и Черного морей, Прикубанье и Закубанье.'
                },
                {
                    id: 'q4',
                    type: 'text',
                    question: 'Древние погребальные и культовые сооружения сложенные из нескольких плит или высеченные в монолитной скальной породе называются …',
                    correctAnswer: 'дольмены',
                    caseSensitive: false,
                    explanation: 'Дольмены - древние погребальные и культовые сооружения, сложенные из нескольких плит или высеченные в монолитной скальной породе.'
                },
                {
                    id: 'q5',
                    type: 'matching',
                    question: 'Расположите археологические памятники эпохи Древнего мира в хронологической последовательности их возникновения',
                    leftColumn: [
                        { id: 1, text: 'Скифские курганы' },
                        { id: 2, text: 'Дольмены Северо-Западного Кавказа' },
                        { id: 3, text: 'Ильская стоянка' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Первый' },
                        { id: 'B', text: 'Второй' },
                        { id: 'C', text: 'Третий' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'C' },
                        { leftId: 2, rightId: 'B' },
                        { leftId: 3, rightId: 'A' }
                    ],
                    leftTitle: 'Памятник',
                    rightTitle: 'Последовательность',
                    explanation: 'Правильная хронология: Ильская стоянка (палеолит) → дольмены (бронзовый век) → скифские курганы (железный век).'
                },
                {
                    id: 'q6',
                    type: 'multiple',
                    question: 'К числу ираноязычных кочевников, проживавших на территории Кубани в I тысячелетии до н.э. относятся (Выберите два варианта ответа)',
                    options: [
                        'скифы',
                        'меоты',
                        'синды',
                        'сарматы'
                    ],
                    correctAnswers: [0, 3],
                    explanation: 'Скифы и сарматы – ираноязычные кочевые племена. Меоты и синды – оседлые земледельческие племена Северо-Западного Кавказа.'
                },
                {
                    id: 'q7',
                    type: 'matching',
                    question: 'Установите соответствия между историческими явлениями и их характеристиками',
                    leftColumn: [
                        { id: 1, text: 'архонт' },
                        { id: 2, text: 'дольмен' },
                        { id: 3, text: 'курган' },
                        { id: 4, text: 'неолитическая революция' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'переход человечества от присваивающего хозяйства к производящему' },
                        { id: 'B', text: 'погребальное сооружение, представляющее собой обычно насыпь из земли, камня, иногда настил из дёрна' },
                        { id: 'C', text: 'высшее должностное лицо в древнегреческих городах-полисах' },
                        { id: 'D', text: 'древние погребальные и культовые сооружения, сложенные из нескольких плит или высеченные в монолитной скальной породе' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'C' },
                        { leftId: 2, rightId: 'D' },
                        { leftId: 3, rightId: 'B' },
                        { leftId: 4, rightId: 'A' }
                    ],
                    leftTitle: 'Историческое явление',
                    rightTitle: 'Характеристика',
                    explanation: 'Архонт - высшее должностное лицо, дольмен - каменное погребальное сооружение, курган - земляная насыпь, неолитическая революция - переход к производящему хозяйству.'
                },
                {
                    id: 'q8',
                    type: 'matching',
                    question: 'Установите соответствие между современными названиями городов Краснодарского края и названиями городов-полисов, основанных на их месте греческими колонизаторами',
                    leftColumn: [
                        { id: 1, text: 'Анапа' },
                        { id: 2, text: 'Тамань' },
                        { id: 3, text: 'Новороссийск' },
                        { id: 4, text: 'Геленджик' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Бата' },
                        { id: 'B', text: 'Торик' },
                        { id: 'C', text: 'Гермонасса' },
                        { id: 'D', text: 'Горгиппия' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'D' },
                        { leftId: 2, rightId: 'C' },
                        { leftId: 3, rightId: 'A' },
                        { leftId: 4, rightId: 'B' }
                    ],
                    leftTitle: 'Современное название города',
                    rightTitle: 'Греческое название города',
                    explanation: 'Анапа - Горгиппия, Тамань - Гермонасса, Новороссийск - Бата, Геленджик - Торик.'
                }
            ]
        },
        glossary: [
            { term: 'Архонт', definition: 'Высшее должностное лицо в древнегреческих городах-полисах' },
            { term: 'Боспорское царство', definition: 'Государство, образовавшееся в V в до н. э. в результате объединения греческих городов-полисов на Керченском, Таманском полуостровах, восточном побережье Черного моря и государства Синдика' },
            { term: 'Дольмены', definition: '(от брет. taol maen - каменный стол) - древние погребальные и культовые сооружения, сложенные из нескольких плит или высеченные в монолитной скальной породе' },
            { term: 'Дольменная культура', definition: 'Древняя культура, существовавшая на Западном Кавказе от Таманского полуострова до Абхазии с середины III до конца II тысячелетии до н.э. Свое название получила по сохранившимся в большом количестве каменным постройкам, предположительно гробницам – дольменам' },
            { term: 'Майкопская культура', definition: 'Самая древняя цивилизация на территории современной России и Европы, сложившаяся в эпоху ранней бронзы в III тысячелетии до н.э. с центром в Прикубанье и охватывавшая равнины и предгорья Предкавказья от Таманского полуострова до Чечни' },
            { term: 'Меоты', definition: 'Собирательное название ряда родственных племен Северо-Западного Кавказа, населявших с VIII - начала VII вв. до н. э. обширное пространство по восточному берегу Азовского (по-гречески Меотиды) и Черного морей, Прикубанье и Закубанье. Большинство кавказоведов считают, что меоты являются предками современных адыгов' },
            { term: 'Сарматы', definition: 'Общее название ираноязычных племен, расселившихся от Тобола до Дуная, начавших свое проникновение на Северный в III в. до н.э.' },
            { term: 'Северокавказская археологическая культура', definition: 'Археологическая культура бронзового века, генетически связанная с майкопской культурой и следующая за ней по времени бытования существовавшая в конце III — начале II тысячелетия до н.э. на значительной территории Северного Кавказа' },
            { term: 'Синды', definition: 'Одно из меотских племен, населявших Таманский полуостров, левобережье реки Кубани и Черноморское побережье до современной Анапы, создавшее в V в. до н.э. свое государство – Синдика, которое испытывало сильное влияние греческих городов-колоний' },
            { term: 'Скифы', definition: 'Собирательное название кочевых племен, относящихся к иранской группе индоевропейских языков, кочевавший на обширных пространствах от причерноморских степей (к востоку от Дуная) до территории современного Китая. Общим культурным маркером скифов является звериный стиль в искусстве' },
            { term: 'Скифский звериный стиль', definition: 'Художественный стиль, сложившийся в VII—IV в. до н. э. у кочевников-скифов для которого были характерны стилизованные изображения реальных и фантастических зверей и птиц, причудливо переплетавшиеся с растительными мотивами. Изображениями зверей орнаментировались оружие, конская сбруя, украшения одежды, поясные пряжки и др.' }
        ],
        topics: [
            {
                id: 'kubanKamen',
                title: 'Кубань в каменном веке',
                image: '/1/1/7.png',
                contentFile: '/1/1/text.txt'
            },
            {
                id: 'bronzeCulture',
                title: 'Культуры эпохи бронзы',
                image: '/1/2/8.png',
                contentFile: '/1/2/text.txt'
            },
            {
                id: '1.3',
                title: 'Население Северо-Западного Кавказа в железном веке',
                image: '/1/4/szkpreview.jpg',
                contentFile: '/1/3/text.txt'
            },
            {
                id: '1.4',
                title: 'Греческая колонизация Северо-Западного Кавказа',
                image: '/1/4/4.png',
                contentFile: '/1/4/text.txt'
            },
        ]
    },
    {
        id: 'kuban_middle_age',
        title: 'Северо-Западный Кавказ в эпоху средневековья',
        description: 'История региона в средневековье',
        icon: Building,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    type: 'single',
                    question: 'Основным населением Кубани в Средние века были…',
                    options: [
                        'ногайцы',
                        'адыги',
                        'крымские татары',
                        'великороссы'
                    ],
                    correctAnswer: 1,
                    explanation: 'Основным населением Кубани в Средние века были адыги (черкесы).'
                },
                {
                    id: 'q2',
                    type: 'single',
                    question: 'Топоним «Тамань» в переводе с адыгского означает…',
                    options: [
                        'густой лес',
                        'озерный край',
                        'гавань',
                        'болото'
                    ],
                    correctAnswer: 3,
                    explanation: 'Топоним «Тамань» в переводе с адыгского означает «болото».'
                },
                {
                    id: 'q3',
                    type: 'single',
                    question: 'История возникновения Тмутараканского княжества связана с именем древнерусского князя…',
                    options: [
                        'Святослава Игоревича',
                        'Мстислава Владимировича',
                        'Ярослава Мудрого',
                        'Игоря Старого'
                    ],
                    correctAnswer: 0,
                    explanation: 'История возникновения Тмутараканского княжества связана с походом князя Святослава Игоревича на ясов и касогов в 965 г.'
                },
                {
                    id: 'q4',
                    type: 'text',
                    question: 'С монголо-татарским нашествием, нарушившим торговлю Запада с Востоком, было связано возникновение на Северо-Западном Кавказе … колоний',
                    correctAnswer: 'генуэзских',
                    caseSensitive: false,
                    explanation: 'Генуэзские колонии возникли на Северо-Западном Кавказе после монголо-татарского нашествия, нарушившего традиционные торговые пути.'
                },
                {
                    id: 'q5',
                    type: 'matching',
                    question: 'Расположите завоевателей в хронологической последовательности их вторжения на территорию Северо-Западного Кавказа',
                    leftColumn: [
                        { id: 1, text: 'Темирлан' },
                        { id: 2, text: 'гунны' },
                        { id: 3, text: 'хан Батый' },
                        { id: 4, text: 'крымские татары' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Первый' },
                        { id: 'B', text: 'Второй' },
                        { id: 'C', text: 'Третий' },
                        { id: 'D', text: 'Четвертый' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'D' },
                        { leftId: 2, rightId: 'A' },
                        { leftId: 3, rightId: 'B' },
                        { leftId: 4, rightId: 'C' }
                    ],
                    leftTitle: 'Завоеватель',
                    rightTitle: 'Последовательность',
                    explanation: 'Правильная хронология: гунны (IV-V вв.) → хан Батый (XIII в.) → крымские татары (XIV-XV вв.) → Темирлан (конец XIV в.).'
                },
                {
                    id: 'q6',
                    type: 'multiple',
                    question: 'К числу первых русских поселенцев на Кубани относятся',
                    options: [
                        'казаки участники восстания под предводительством Емельяна Пугачева',
                        'казаки участники восстания под предводительством Кондратия Булавина',
                        'раскольники, бежавшие от преследований за веру',
                        'казаки участники восстания под предводительством Степана Разина'
                    ],
                    correctAnswers: [1, 2],
                    explanation: 'Первыми русскими поселенцами на Кубани были казаки-некрасовцы (участники Булавинского восстания) и раскольники, бежавшие от религиозных преследований.'
                },
                {
                    id: 'q7',
                    type: 'matching',
                    question: 'Установите соответствия между историческими явлениями и их характеристиками',
                    leftColumn: [
                        { id: 1, text: 'Зихи' },
                        { id: 2, text: 'Некрасовцы' },
                        { id: 3, text: 'Гунны' },
                        { id: 4, text: 'Адыги' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'кочевой народ, который сформировался во II-IV вв. в Приуралье из тюркоязычных хунну и местных угров и сарматов. Их массовое переселение дало толчок Великому переселению народов' },
                        { id: 'B', text: 'название одного из адыгских (черкесских) племенных объединений, проживавших в приморских нагорных территориях от районов современного города Новороссийска до Гагры, использовавшееся с периода античности до позднего средневековья' },
                        { id: 'C', text: 'общее название группы родственных автохтонных (коренных) племен Северо-Западного Кавказа, больше известных в Европе и России с середины ХIII в. под названием черкесы' },
                        { id: 'D', text: 'потомки донских и хопёрских казаков, которые под руководством своего лидера Игната Некрасова, после подавления Булавинского восстания в 1708 г. ушли с Дона и поселились в низовьях Кубани, между Копылом и Темрюком' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'B' },
                        { leftId: 2, rightId: 'D' },
                        { leftId: 3, rightId: 'A' },
                        { leftId: 4, rightId: 'C' }
                    ],
                    leftTitle: 'Историческое явление/термин',
                    rightTitle: 'Характеристика',
                    explanation: 'Зихи - адыгское племя, некрасовцы - казаки-переселенцы, гунны - кочевой народ, адыги - общее название черкесских племен.'
                },
                {
                    id: 'q8',
                    type: 'matching',
                    question: 'Установите соответствие между современными названиями городов Краснодарского края и названиями генуэзских колоний в ХIII-ХVI вв.',
                    leftColumn: [
                        { id: 1, text: 'Анапа' },
                        { id: 2, text: 'Тамань' },
                        { id: 3, text: 'Новороссийск' },
                        { id: 4, text: 'Славянск-на-Кубани' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Бата' },
                        { id: 'B', text: 'Мапа' },
                        { id: 'C', text: 'Копа' },
                        { id: 'D', text: 'Метрега' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'B' },
                        { leftId: 2, rightId: 'D' },
                        { leftId: 3, rightId: 'A' },
                        { leftId: 4, rightId: 'C' }
                    ],
                    leftTitle: 'Современное название города',
                    rightTitle: 'Итальянское название города',
                    explanation: 'Анапа - Мапа, Тамань - Метрега, Новороссийск - Бата, Славянск-на-Кубани - Копа.'
                }
            ]
        },
        glossary: [
            {
                term: 'Адыги',
                definition: 'Общее название группы родственных автохтонных (коренных) племен Северо-Западного Кавказа. В Европе и России с середины ХIII в. они больше известны под названием черкесы. В настоящее время адыги включают в себя адыгейцев (жителей Республики Адыгея), кабардинцев (жителей Кабардино-Балкарской республики), черкесов (жителей Карачаево-Черкесской республики). Все адыгские (черкесские) племена называли и называют себя адыгэ.'
            },
            {
                term: 'Генуэзские колонии',
                definition: 'Укрепленные торговые центры купцов в ХIII-ХV вв. в Причерноморье и Северо-Западном Кавказе, основанные выходцами из Генуи для организации торговли Западной Европы со Средней Азией и Китаем.'
            },
            {
                term: 'Гунны',
                definition: 'Кочевой народ, который сформировался во II-IV вв. в Приуралье из тюркоязычных хунну и местных угров и сарматов. Их массовое переселение дало толчок Великому переселению народов.'
            },
            {
                term: '«Заветы Игната»',
                definition: 'Свод правил, возведенный казаками-некрасовцами в ранг закона, которые основывались на общеказачьем обычном праве.'
            },
            {
                term: 'Зихи',
                definition: 'Название одного из адыгских (черкесских) племенных объединений, проживавших в приморских нагорных территориях от районов современного города Новороссийска до Гагры, использовавшееся с периода античности до позднего средневековья.'
            },
            {
                term: 'Касоги',
                definition: 'Иноназвание, которым обозначали в русских, арабских, византийских источниках средних веков предков современных адыгов проживавших в Прикубанье.'
            },
            {
                term: 'Казаки-некрасовцы (некрасовцы)',
                definition: 'Потомки донских и хопёрских казаков, которые под руководством своего лидера Игната Некрасова, после подавления Булавинского восстания в 1708 г. ушли с Дона и поселились в низовьях Кубани, между Копылом и Темрюком.'
            },
            {
                term: 'Тмутараканское княжество',
                definition: 'Самое южное древнерусское княжество, существовавшее в X—XI веках на Таманском полуострове с центром в городе Тмутаракань. История его возникновения была связана с походом князя Святослава Игоревича на ясов (алан) и касогов (адыгов) в 965 г.'
            }
        ],
        topics: [
            {
                id: 'topic1',
                title: 'Кубань в период домонгольского вторжения',
                image: '/2/1/5.jpg',
                contentFile: '/2/1/text.txt'
            },
            {
                id: 'topic2',
                title: 'Монгольское  нашествие в ХIII-ХV вв.',
                image: '/2/2/2.jpg',
                contentFile: '/2/2/text.txt'
            }
            ,
            {
                id: 'topic3',
                title: 'Итальянское проникновение на Черноморское побережье. Генуэзские колонии в ХIII-ХV вв.',
                image: '/2/3/4.jpg',
                contentFile: '/2/3/text.txt'
            }
            ,
            {
                id: 'topic4',
                title: 'Северо-Западный Кавказ в международных отношениях второй половины ХV - ХVII вв.',
                image: '/2/4/3.jpg',
                contentFile: '/2/4/text.txt'
            }
            ,
            {
                id: 'topic5',
                title: 'Первые русские поселенцы на Кубани',
                image: '/2/5/5.jpg',
                contentFile: '/2/5/text.txt'
            }

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
                    question: 'Согласно сложившемуся в конце ХIХ в. порядка прохождения службы, срок военной службы кубанских казаков составлял ... лет',
                    options: ['18 лет', '20 лет', '22 года', '25 лет'],
                    correctAnswer: 1,
                    explanation: 'Срок службы кубанских казаков по Положению 1860-х гг. составлял 20 лет: 3 года в приготовительном разряде, 12 лет в строевом, 5 лет в запасе.'
                },
                {
                    id: 'q2',
                    type: 'single',
                    question: 'Центром Кавказского наместничества был город...',
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
                    question: 'Установите соответствия между историческими терминами и их характеристиками',
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
                    leftTitle: 'Исторический термин',
                    rightTitle: 'Характеристика',
                    explanation: 'Войско верных казаков — сформировано из запорожцев и добровольцев в 1788 г.; Кубанское казачье войско — образовано в 1860 г. из Черноморского и части Кавказского линейного войск; Пластуны — пешие казаки-разведчики; Линейцы — казаки Кавказского линейного войска, в основном потомки донских и волжских казаков'
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
                    leftTitle: 'Личность',
                    rightTitle: 'Событие',
                    explanation: 'Потемкин — выступил с идеей создания Войска верных казаков; катерина II — подписала «Жалованную грамоту» в 1792 году; Белый — первый атаман Черноморского казачьего войска на Кубани, руководил первым отрядом переселенцев; Головатый — руководил делегацией в Санкт-Петербург, которая ходатайствовала о выделении земель'
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
                image: '/3/1/5.png',
                contentFile: '/3/1/text.txt'
            },
            {
                id: 'topic2',
                title: 'Военно-политическая ситуация на Северо-Западном Кавказе в ХVIII веке',
                image: '/3/2/szk18.jpg',
                contentFile: '/3/2/text.txt'
            }
            ,
            {
                id: 'topic3',
                title: 'Переселение черноморских и донских казаков на Кубань',
                image: '/3/2/migration.jpg',
                contentFile: '/3/3/text.txt'
            }
            ,
            {
                id: 'topic4',
                title: 'Присоединение Северо-Западного Кавказа к России',
                image: '/3/4/11.jpg',
                contentFile: '/3/4/text.txt'
            }
            ,
            {
                id: 'topic5',
                title: 'Военно-казачья и народная колонизация Кубани',
                image: '/3/5/1.jpg',
                contentFile: '/3/5/text.txt'
            }
            ,
            {
                id: 'topic6',
                title: 'Иностранная колонизация Кубани',
                image: '/3/6/4.jpg',
                contentFile: '/3/6/text.txt'
            }
            ,
            {
                id: 'topic7',
                title: 'Образование Кубанской области и Кубанского казачьего войска. Военная служба казаков.',
                image: '/3/7/2.jpg',
                contentFile: '/3/7/text.txt'
            }
            ,
            {
                id: 'topic8',
                title: 'Социально-экономическое развитие Кубани во второй половине ХIХ в.',
                image: '/3/8/4.jpg',
                contentFile: '/3/8/text.txt'
            }
            ,
            {
                id: 'topic9',
                title: 'Культура и быт казачества и адыгов',
                image: '/3/9/3.jpg',
                contentFile: '/3/9/text.txt'
            }
        ]
    },
    {
        id: 'kuban20-21',
        title: 'Кубань в годы зарождения СССР',
        description: 'Влияние империалистических войн,  революционных потрясений и социалистической модернизации на Кубань',
        icon: Building,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    type: 'single',
                    question: 'Кто является автором слов песни «Ты, Кубань, ты наша родина»?',
                    options: ['Константин Образцов', 'Елена Чоба', 'Василий Гамалий', 'Николай Кравченко'],
                    correctAnswer: 0,
                    explanation: 'Константин Образцов — священник 1-го Кавказского полка, который в 1915 году написал текст песни, ставшей гимном Краснодарского края'
                },
                {
                    id: 'q2',
                    type: 'single',
                    question: 'В каком году рамках «военного коммунизма» было принято решение о взимании продразверстки на Кубани?',
                    options: ['1920', '1924', '1930'],
                    correctAnswer: 0,
                    explanation: 'Хотя продразверстка как мера была введена ранее, именно в 1920 году, после установления советской власти на Кубани, она стала применяться здесь массово и жестко в рамках политики «военного коммунизма»'
                },
                {
                    id: 'q3',
                    type: 'single',
                    question: 'По какой причине некоторые кубанские станицы заносились на «черные доски»?',
                    options: ['В связи с низкими показателями по хлебозаготовкам', 'В связи с неуплатой налогов', 'В связи с невыплатой кредитов'],
                    correctAnswer: 0,
                    explanation: 'Занесение на «черную доску» было крайней мерой наказания за сопротивление хлебозаготовкам. Это влекло за собой полное прекращение товарооборота, реквизицию всех запасов хлеба и скота, аресты актива.'
                },

                {
                    id: 'q4',
                    type: 'text',
                    question: 'Период острого социального и политического противостояния в России, принявшего форму вооруженного конфликта в 1918-1922 гг. называется ... (Запишите пропущенное слово в виде существительного во множественном числе именительном падеже) ',
                    correctAnswer: 'Гражданская война',
                    caseSensitive: false,
                    explanation: 'Период 1918-1922 годов в истории России определяется как Гражданская война — вооруженная борьба за власть между различными социальными, политическими группами при поддержке иностранных интервентов.'
                },
                {
                    id: 'q5',
                    type: 'single',
                    question: '«Ледяной поход» Добровольческой белой армии ставил главною целью захвата какого города на Кубани?',
                    options: ['Екатеринодара', 'Туапсе', 'Новороссийска'],
                    correctAnswer: 0,
                    explanation: 'Главной стратегической целью «Ледяного похода» Добровольческой армии Л.Г. Корнилова весной 1918 года был захват Екатеринодара — крупнейшего административного и экономического центра Северного Кавказа, чтобы получить опорную базу для борьбы.'
                },
                {
                    id: 'q6',
                    type: 'multiple',
                    question: 'В каком году и на каком съезде ВКП(б) было утверждено постановление о переходе от политики «военного коммунизма» к новой экономической политике (Выберите два варианта ответа)',
                    options: ['1921', '1922', 'Х съезд ВКП (б)', 'ХIV съезд ВКП (б)'],
                    correctAnswers: [0, 2],
                    explanation: 'Решение о переходе к НЭПу было принято на X съезде Российской коммунистической партии (большевиков), который проходил в марте 1921 года.'
                },
                {
                    id: 'q7',
                    type: 'matching',
                    question: 'Установите соответствия между историческими явлениями и их характеристиками',
                    leftColumn: [
                        { id: 1, text: '«Продразвёрстка»' },
                        { id: 2, text: '«Раскулачивание»' },
                        { id: 3, text: '«Великий перелом»' },
                        { id: 4, text: '«Индустриализация»' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Процесс форсированного наращивания промышленного потенциала СССР, осуществлявшийся во второй половине 1920- 1930 гг. ХХ в.' },
                        { id: 'B', text: 'Выражение И. В. Сталина, которым он охарактеризовал начавшийся переход в СССР от нэпа к политике форсированной индустриализации и коллективизации сельского хозяйства.' },
                        { id: 'C', text: 'Принудительное переселение крестьянских семей, объявленных кулаками, в отдалённые районы СССР с передачей их хозяйств создаваемым колхозам.' },
                        { id: 'D', text: 'Система заготовок сельхозпродуктов, осуществлявшаяся большевиками в годы Гражданской войны.' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'D' },
                        { leftId: 2, rightId: 'C' },
                        { leftId: 3, rightId: 'B' },
                        { leftId: 4, rightId: 'A' }
                    ],
                    leftTitle: 'Историческое явление',
                    rightTitle: 'Характеристика',
                    explanation: 'Продразверстка — это именно система обязательной сдачи крестьянами государству всех «излишков» продукции, введенная во время Гражданской войны; Раскулачивание — это политика ликвидации зажиточных крестьянских хозяйств (кулаков) с конфискацией имущества и высылкой семей; «Великий перелом» — известное сталинское выражение, обозначавшее конец НЭПа и начало сплошной коллективизации и индустриализации (1929 г.); Индустриализация — процесс создания крупной промышленности в СССР'
                },
                {
                    id: 'q8',
                    type: 'matching',
                    question: 'Установите соответствие между исторической личностью периода Первой мировой войны  и их характеристиками',
                    leftColumn: [
                        { id: 1, text: 'Сотник Василий Гамалий' },
                        { id: 2, text: 'Елена Чоба' },
                        { id: 3, text: 'Поручик Николай Дикирев' },
                        { id: 4, text: 'Анна Матвеева' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'Под его командованием, рота ворвалась в центр расположения австрийцев у Лизо-Лаборга и взяв в плен командира австрийского пехотного полка, вынудила противника к сдаче' },
                        { id: 'B', text: 'Первая женщина, награждённая Георгиевской медалью «За храбрость», самостоятельно вынесла с поля боя 30 раненых.' },
                        { id: 'C', text: 'Под его командованием был совершен рейд I сотни Уманского полка  по безводным пескам Месопотамии с целью соединения с союзными английскими войсками' },
                        { id: 'D', text: 'В 1915 г. получила Георгиевский крест 4-й степени за спасение двух русских батарей, выведенных из окружения во время боев в Карпатских горах' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'C' },
                        { leftId: 2, rightId: 'D' },
                        { leftId: 3, rightId: 'A' },
                        { leftId: 4, rightId: 'B' }
                    ],
                    leftTitle: 'Личность',
                    rightTitle: 'Характеристика',
                    explanation: 'Сотник Василий Гамалий известен своим легендарным рейдом через пустыни Месопотамии для соединения с английскими войсками;  Елена Чоба была награждена за спасение артиллерийских батарей в Карпатах; Поручик Николай Дикирев прославился атакой у Лизо-Лаборга, где был захвачен в плен командир австрийского полка; Анна Матвеева - сестра милосердия, награжденная за вынос с поля боя 30 раненых солдат'
                },

            ]
        },
        glossary: [
            { term: 'Белое движение (белые)', definition: 'Военно-политическое движение разрозненных в политическом отношении сил в годы Гражданской войны, которых объединяло неприятие советской власти. Лидерами белого движения были Колчак, Алексеев, Корнилов, Деникин и Врангель и др' },
            { term: 'Военный коммунизм', definition: 'Социально-экономическая политика большевиков в годы Гражданской войны, характеризовавшаяся проведением ряда чрезвычайных мер. Ключевым звеном политики военного коммунизма была продразверстка' },
            { term: 'Великий перелом', definition: 'Выражение И. В. Сталина, которым он охарактеризовал начавшийся переход в СССР от нэпа к политике форсированной индустриализации и коллективизации сельского хозяйства. Годом великого перелома принято считать 1929 г' },
            { term: 'Гражданская война', definition: 'Период острого социального и политического противостояния в России, принявшего форму вооруженного конфликта в 1918-1922 гг. Основное вооруженное противостояние в годы Гражданской войны происходило между «белыми» и «красными»' },
            { term: 'Зеленое движение', definition: 'Обобщённое название нерегулярных, преимущественно крестьянских и казачьих вооружённых формирований, противостоявших иностранным интервентам, большевикам и белогвардейцам в годы Гражданской войны в России. Название «зелёные» возникло по двум причинам: по первой версии, партизаны базировались в лесах, и зелёный цвет стал их отличительным признаком; по второй — название пошло от фамилии атамана Зеленого, поднявшего масштабное восстание на Украине' },
            { term: 'Индустриализация', definition: 'Процесс форсированного наращивания промышленного потенциала СССР, осуществлявшийся во второй половине 1920- 1930 гг. ХХ в. Целью индустриализации было преодоление технической отсталости СССР и обретение экономической независимости' },
            { term: 'Коллективизация', definition: 'Процесс объединения мелких единоличных крестьянских хозяйств в крупные коллективные социалистические хозяйства − колхозы. Коллективизация ставила целью обеспечение нужд индустриализации и ликвидация кулачества как класса' },
            { term: 'Колхоз', definition: 'Крупное коллективное социалистическое хозяйство, в котором средства производства (земля, оборудование, скот, семена и т. д.) находились в совместной собственности и под общественным управлением его участников' },
            { term: 'Красное движение (красные)', definition: ' Наименование большевиков  и союзных им сил в ходе Гражданской войны в России. Свое название получили из-за использовавшегося ими в качестве символа революционной борьбы пролетариата красного флага' },
            { term: 'Кубанская законодательная рада', definition: 'Высший законодательный орган власти на Кубани, учрежденный на заседании Войсковой рады 7 октября 1917 г. до созыва Всенародного Учредительного собрания' },
            { term: 'Кубанская краевая рада', definition: 'Верховный орган власти с функциями учредительного характера, учрежденный на заседании Войсковой рады 7 октября 1917 г., представлявшей интересы землевладельческо-военной части казачества' },
            { term: 'Кубанское войсковое правительство', definition: 'Высший исполнительный и руководящий орган Кубанского казачьего войска, провозглашенный на I съезде Кубанской Войсковой Рады 17 апреля 1917 г. Его создание было связано с целью противостояния посягательствам со стороны иногороднего населения на казачьи привилегии' },
            { term: 'Кулаки', definition: 'Обозначение в дореволюционной России и в СССР зажиточных крестьян, использующих наёмный труд. Кулаки были ликвидированы в СССР в годы коллективизации' },
            { term: 'НЭП (новая экономическая политика)', definition: 'Экономическая политика, проводившаяся в Советской России и СССР в 20-е гг. ХХ в. Суть ее состояла в создании многоукладной экономики при сохранении командных высот за государством.  Начало НЭПу положил в 1921 г.  Х съезде РКП (б), который принял решение о замене продразверстки прогрессивным продналогом' },
            { term: 'Раскулачивание', definition: 'Принудительное переселение крестьянских семей, объявленных кулаками, в отдалённые районы СССР с передачей их имущества создаваемым колхозам. Раскулачивание производилось в годы коллективизации в СССР' },
            { term: 'Продразверстка', definition: 'Продовольственная развёрстка - система заготовок сельхозпродуктов, осуществлявшаяся большевиками в годы Гражданской войны' }
        ],
        topics: [
            {
                id: 'topic1',
                title: 'Экономика Кубани, особенности ее развития',
                image: '/4/1/3.jpg',
                contentFile: '/4/1/text.txt'
            },
            {
                id: 'topic2',
                title: 'Политическая жизнь региона в годы Первой русской революции 1905-1907 гг',
                image: '/4/2/3.jpg',
                contentFile: '/4/2/text.txt'
            }
            ,
            {
                id: 'topic3',
                title: 'Кубанцы в Первой мировой войне',
                image: '/4/3/4.jpg',
                contentFile: '/4/3/text.txt'
            }
            ,
            {
                id: 'topic4',
                title: 'Резонанс революционных событий 1917 г. на Кубани',
                image: '/4/4/4.jpg',
                contentFile: '/4/4/text.txt'
            }
            ,
            {
                id: 'topic5',
                title: 'Кубань в пламени Гражданской войны',
                image: '/4/5/prev.jpg',
                contentFile: '/4/5/text.txt'
            }
            ,
            {
                id: 'topic6',
                title: 'НЭП на Кубани',
                image: '/4/6/3.jpg',
                contentFile: '/4/6/text.txt'
            }
            ,
            {
                id: 'topic7',
                title: 'Коллективизация и индустриализация на Кубани',
                image: '/4/7/8.jpg',
                contentFile: '/4/7/text.txt'
            }

        ]
    },
    {
        id: 'kuban_in_war',
        title: 'Кубань в годы Великой Отечественной войны',
        description: 'Героические страницы в истории кубани',
        icon: Building,
        quiz: {
            questions: [
                {
                    id: 'q1',
                    type: 'single',
                    question: 'В рамках какой операции немцы планировали вторжение в Краснодарский край?',
                    options: [
                        'операция «Эдельвейс»',
                        'операция «Тайфун»',
                        'операция «Цитадель»',
                        'операция «Кремль»'
                    ],
                    correctAnswer: 0,
                    explanation: 'Операция «Эдельвейс» - кодовое название плана немецкого командования по захвату Кавказа.'
                },
                {
                    id: 'q2',
                    type: 'single',
                    question: 'В годы Великой отечественной войны Северо-Кавказским фронтом руководил',
                    options: [
                        'С.М. Буденный',
                        'И.В. Тюленев',
                        'К.К. Рокоссовский',
                        'А.И. Еременко'
                    ],
                    correctAnswer: 0,
                    explanation: 'Северо-Кавказским фронтом руководил Семён Михайлович Буденный.'
                },
                {
                    id: 'q3',
                    type: 'single',
                    question: 'Что использовали немцы для умерщвления населения в Краснодаре во время Великой отечественной войны?',
                    options: [
                        'печи',
                        'газовые камеры',
                        '«душегубки»'
                    ],
                    correctAnswer: 2,
                    explanation: 'Немцы использовали специальные машины - «душегубки» для умерщвления мирного населения в Краснодаре.'
                },
                {
                    id: 'q4',
                    type: 'text',
                    question: 'Кодовое название плана молниеносной войны против СССР, разработанного фашистским военным руководством Германии. Был назван в честь императора Фридриха I Барбароссы называется …',
                    correctAnswer: 'Барбаросса',
                    caseSensitive: false,
                    explanation: 'План «Барбаросса» - кодовое название плана нападения Германии на СССР, названный в честь императора Фридриха I Барбароссы.'
                },
                {
                    id: 'q5',
                    type: 'single',
                    question: 'В результате, какой военной операции был осуществлен разгром «Голубой линии» советскими войсками?',
                    options: [
                        'Новороссийско-Таманская операция',
                        'Северо-Кавказская наступательная операция',
                        'Краснодарская операция'
                    ],
                    correctAnswer: 0,
                    explanation: 'Новороссийско-Таманская операция привела к разгрому немецкой «Голубой линии» и освобождению Таманского полуострова.'
                },
                {
                    id: 'q6',
                    type: 'multiple',
                    question: 'В июле 1942 г. из каких фронтов был образован единый Северо-Кавказский фронт?(Выберите два варианта ответа)',
                    options: [
                        'Южный фронт',
                        'Сталинградский фронт',
                        'Северо-Кавказский фронт',
                        'Центральный фронт'
                    ],
                    correctAnswers: [0, 2],
                    explanation: 'В июле 1942 года единый Северо-Кавказский фронт был образован из Южного и Северо-Кавказского фронтов.'
                },
                {
                    id: 'q7',
                    type: 'matching',
                    question: 'Установите соответствия между историческими явлениями и их характеристиками',
                    leftColumn: [
                        { id: 1, text: 'оккупация' },
                        { id: 2, text: 'геноцид' },
                        { id: 3, text: 'Голубая линия' },
                        { id: 4, text: 'мобилизация' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'комплекс мероприятий по переводу экономики и органов власти на работу в условиях военного времени, а также переводу вооружённых сил на организацию и состав военного времени' },
                        { id: 'B', text: 'насильственное, обычно временное занятие вооружёнными силами государства не принадлежащей ему территории' },
                        { id: 'C', text: 'форма массового насилия, направленная на полное или частичное уничтожение национальной, этнической, расовой или религиозной группы людей' },
                        { id: 'D', text: 'условное наименование рубежей обороны немецких войск на Таманском полуострове (зима - осень 1943 года)' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'B' },
                        { leftId: 2, rightId: 'C' },
                        { leftId: 3, rightId: 'D' },
                        { leftId: 4, rightId: 'A' }
                    ],
                    leftTitle: 'Историческое явление',
                    rightTitle: 'Характеристика',
                    explanation: 'Оккупация - насильственное занятие территории, геноцид - уничтожение групп людей, Голубая линия - немецкая оборона на Тамани, мобилизация - перевод на военное положение.'
                },
                {
                    id: 'q8',
                    type: 'matching',
                    question: 'Установите соответствие между названиями военных операций периода Великой Отечественной войны и их характеристиками',
                    leftColumn: [
                        { id: 1, text: 'Операция «Эдельвейс»' },
                        { id: 2, text: 'Битва за Кавказ' },
                        { id: 3, text: 'Воздушные сражения на Кубани' },
                        { id: 4, text: 'Операция «Горы» и «Море»' }
                    ],
                    rightColumn: [
                        { id: 'A', text: 'кодовое название военной операции немецкого командования по захвату Кавказа в рамках более широкого плана «Блау», в частности, нефтедобывающего района Грозного и Баку' },
                        { id: 'B', text: 'совокупность оборонительных (25 июля — 31 декабря 1942) и наступательных (1 января — 9 октября 1943) операций советских войск в целях обороны Кавказа и разгрома вторгшихся в его пределы германских и румынских войск' },
                        { id: 'C', text: 'серия крупномасштабных сражений советской авиации с немецкой авиацией в апреле — июне 1943 года над низовьями реки Кубань, Таманским полуостровом и Новороссийском' },
                        { id: 'D', text: 'части плана наступления на Краснодар, который получил название «Малая земля»' }
                    ],
                    correctMatches: [
                        { leftId: 1, rightId: 'A' },
                        { leftId: 2, rightId: 'B' },
                        { leftId: 3, rightId: 'C' },
                        { leftId: 4, rightId: 'D' }
                    ],
                    leftTitle: 'Название операции',
                    rightTitle: 'Характеристика',
                    explanation: '«Эдельвейс» - немецкий план захвата Кавказа, Битва за Кавказ - оборонительные и наступательные операции советских войск, Воздушные сражения на Кубани - бои авиации, «Горы» и «Море» - наступление на Краснодар.'
                }
            ]
        },
        glossary: [
            {
                term: '«Барбаросса»',
                definition: 'Кодовое название плана молниеносной войны против СССР, разработанного фашистским военным руководством Германии. Был назван в честь императора Фридриха I Барбароссы.'
            },
            {
                term: 'Битва за Кавказ',
                definition: 'Одно из крупнейших сражений Великой Отечественной войны, проходившее с 25 июля 1942 года по 9 октября 1943 года. В рамках этой битвы немецкие войска пытались захватить богатый нефтяными месторождениями и продовольствием Кавказ, важный для снабжения Советского Союза.'
            },
            {
                term: 'Блицкриг',
                definition: '(нем. blitzkrieg, буквально – молниеносная война), стратегическая и оперативно-тактическая военная доктрина, целью которой является разгром главных сил противника в кратчайшие сроки. Прежде всего ассоциируется с действиями вооружённых сил Третьего рейха (вермахта) на начальных этапах Второй мировой войны 1939–1945 гг.'
            },
            {
                term: 'Генеральный план «Ост»',
                definition: '(нем. generalplan Ost) — совокупность программ и планов закрепления господства нацистской Германии в Восточной Европе. План разрабатывался с 1940 года по приказу Генриха Гиммлера и приобрёл завершённый вид к июню 1942 года. Некоторые положения плана: захват территории СССР до Уральских гор; уничтожение и переселение с захваченных территорий коренного населения (предполагалось до 50 млн советских граждан); «онемечивание» и порабощение оставшегося населения; колонизация освободившихся земель и заселение их немцами; создание на части захваченной территории СССР нескольких марионеточных государств с целью дальнейшей эксплуатации ресурсов захваченных территорий. План был рассчитан на 30 лет и должен был быть реализован после победы рейха в войне против СССР.'
            },
            {
                term: 'Геноцид',
                definition: 'Форма массового насилия, направленная на полное или частичное уничтожение национальной, этнической, расовой или религиозной группы людей. Термин введён в обиход польским юристом Рафаэлем Лемкиным в 1944 году.'
            },
            {
                term: '«Голубая линия»',
                definition: 'Условное наименование рубежей обороны немецких войск на Таманском полуострове (зима - осень 1943 года). Это две полосы оборонительных сооружений, которые растянулись от Темрюка до Новороссийска. В длину чуть больше 100 км, в ширину около 25 км. Главная полоса обороны пролегала через окрестности Новороссийска, Крымской и Темрюка. Рубеж линии прорван в ходе Новороссийско-Таманской операции осенью, 9 октября 1943 года.'
            },
            {
                term: 'Малая земля',
                definition: 'Название плацдарма в районе Мысхако, у Новороссийска, который был захвачен советскими войсками в ходе Великой Отечественной войны с целью освобождения города. Героическая оборона этого клочка земли продолжалась 225 дней и завершилась 16 сентября 1943 года освобождением Новороссийска.'
            },
            {
                term: 'Мобилизация',
                definition: 'Комплекс мероприятий по переводу экономики и органов власти на работу в условиях военного времени, а также переводу вооружённых сил на организацию и состав военного времени.'
            },
            {
                term: 'Оккупация',
                definition: '(от лат. occupatio − «захват, занятие») насильственное, обычно временное занятие вооружёнными силами государства не принадлежащей ему территории. Это происходит без согласия государства, обладающего суверенитетом над данной территорией.'
            },
            {
                term: 'Операция «Эдельвейс»',
                definition: 'Кодовое название военной операции немецкого командования по захвату Кавказа в рамках более широкого плана «Блау», в частности, нефтедобывающего района Грозного и Баку, в ходе Второй мировой войны. Для реализации своих амбициозных задач в битве на Кавказе немецкое командование разработало операцию под кодовым наименованием «Эдельвейс». План предусматривал окружение и уничтожение советских войск южнее и юго-восточнее Ростова-на-Дону. Затем враг собирался овладеть Северным Кавказом, Новороссийском, Туапсе, Грозным и Баку.'
            },
            {
                term: 'План «Ольденбург» («Зеленая папка» Геринга)',
                definition: 'Кодовое название экономического подраздела плана нападения нацистской Германии на СССР «Барбаросса». План предусматривал овладение и постановку на службу Рейху всех запасов сырья и крупных промышленных предприятий на территории между Вислой и Уралом. Согласно плану, территория СССР делилась на четыре экономических инспектората (Ленинград, Москва, Киев, Баку) и 23 экономических комендатуры, а также 12 бюро. Впоследствии, согласно плану, предполагалось разбить территорию европейской части СССР на семь государств, каждое из которых должно было экономически зависеть от Германии. Территорию Прибалтики планировалось сделать протекторатом и в дальнейшем включить в состав Германии.'
            }
        ],
        topics: [
            {
                id: 'topic1',
                title: 'Мобилизация региона',
                image: '/5/1/2.jpg',
                contentFile: '/5/1/text.txt'
            },
            {
                id: 'topic2',
                title: 'Битва за Кавказ. Оборонительный период',
                image: '/5/2/4.jpg',
                contentFile: '/5/2/text.txt'
            }
            ,
            {
                id: 'topic3',
                title: 'Преступления немецкого оккупационного режима на Кубани',
                image: '/5/3/3.jpg',
                contentFile: '/5/3/text.txt'
            }
            ,
            {
                id: 'topic4',
                title: 'Партизанское и подпольное движение на Кубани',
                image: '/5/4/3.jpg',
                contentFile: '/5/4/text.txt'
            }
            ,
            {
                id: 'topic5',
                title: 'Наступательный период битвы за Кавказ. Освобождение Кубани',
                image: '/5/5/6.jpg',
                contentFile: '/5/5/text.txt'
            }
            ,
            {
                id: 'topic6',
                title: 'Воздушные бои над Кубанью',
                image: '/5/6/2.jpg',
                contentFile: '/5/6/text.txt'
            }
            ,
            {
                id: 'topic7',
                title: 'Восстановление и развитие народного хозяйства в 1945-1950 гг.',
                image: '/5/7/4.jpg',
                contentFile: '/5/7/text.txt'
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
                                    onClick={() => generateTestPDF(
                                        currentSection.title,
                                        score,
                                        questions.length,
                                        percentage,
                                        questions,
                                        userAnswers
                                    )}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Сохранить в PDF
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
                            <div
                                className="text-black-800 leading-relaxed p-6 rounded-lg border border-amber-200 relative overflow-hidden"
                                style={{
                                    background: `url('/images/back.jpg') center/cover no-repeat`,
                                    backgroundAttachment: 'fixed',
                                    backgroundColor: 'rgba(253, 230, 200, 0.85)', // лёгкий подтон поверх фона для читаемости
                                    backdropFilter: 'blur(2px)', // опционально: лёгкое размытие фона под текстом
                                }}
                            >
                                <div className="relative z-10">
                                    <TopicContent topic={currentTopic} />
                                </div>
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

