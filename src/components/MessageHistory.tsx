import type { JSX } from 'react';

export interface MessageItem{
	id: string;
	from: { name: string };
	type: 'message' | 'response' | 'typing';
	time: string;
	text?: string;
}

interface MessageProps {
	listMessages?: MessageItem[];
}

export default function MessageHistory({ listMessages = [] }: MessageProps) {
	const getClassMessage = (type: MessageItem['type']): string => {
		if (type === 'message') return 'own';
		if (type === 'response') return 'response';
		return 'typing'
	};

	const renderMessageContent = (type: MessageItem['type'], text?: string): JSX.Element => {
		if (type === 'typing') {
			return (
				<div className="typing-indicator">
					<span>печатает...</span>
					<div className="typing-dots">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			);
		}
		return (<div className="message-bubble">{text}</div>);		
	};

	return (
		<div className="chat-history">
			{listMessages.map((message) => (
				<div key={message.id}
					className={`message-item message-${getClassMessage(message.type)}`}
				>
					<div className="message-header">
						<span className="message-author">{message.from.name}</span>
						<span className="message-time">{message.time}</span>
					</div>
					{renderMessageContent(message.type, message.text)}
				</div>
			))}
		</div>	
	);
}