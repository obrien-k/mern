import React, { useState } from 'react';

function NewTopicForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['']);
    const [subscribe, setSubscribe] = useState(false);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const addAnswerField = () => setAnswers([...answers, '']);
    const removeAnswerField = () => setAnswers(answers.slice(0, -1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/forum/topics', { // replace with your endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Title: title,
                    Body: body,
                    Question: question,
                    Answers: answers.filter(answer => answer.trim() !== '')
                })
            });

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error submitting new topic:', error);
        }
    };

    return (
        <div className="new-topic-form">
            <h2>New Topic</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                </div>

                <div>
                    <label htmlFor="question">Question:</label>
                    <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
                </div>

                <div>
                    {answers.map((answer, index) => (
                        <div key={index}>
                            <input type="text" value={answer} onChange={(e) => handleAnswerChange(index, e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={addAnswerField}>+</button>
                    <button type="button" onClick={removeAnswerField}>-</button>
                </div>

                <div>
                    <input type="checkbox" id="subscribe" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                    <label htmlFor="subscribe">Subscribe to topic</label>
                </div>

                <div>
                    <button type="submit">Create Thread</button>
                </div>
            </form>
        </div>
    );
}

export default NewTopicForm;
