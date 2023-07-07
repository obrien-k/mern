import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCreateForumTopic } from '../../../hooks/useCreateForumTopic';

const NewTopicForm = () => {
    const { forumId } = useParams();
    const { submitTopic } = useCreateForumTopic();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['']);
    const [forum, setForum] = useState(forumId);

    const handleAddAnswer = () => {
        setAnswers([...answers, '']);
    };

    const handleRemoveAnswer = (index) => {
        setAnswers(answers.filter((_, i) => i !== index));
    };

    const handleAnswerChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        submitTopic(title, forum, body, question, answers.filter(answer => answer.trim() !== ''));
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
                            <input type="text" value={answer} onChange={(e) => handleAnswerChange(e, index)} />
                            <button type="button" onClick={() => handleRemoveAnswer(index)}>-</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAnswer}>+</button>
                </div>

                <div>
                    <button type="submit">Create Thread</button>
                </div>
            </form>
        </div>
    );
}

export default NewTopicForm;
