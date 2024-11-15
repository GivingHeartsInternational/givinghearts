import React, { useState } from 'react';

const MessageSent = (props: any) => {
	const [ enabled, setEnabled ] = useState(true);
	return (
		<div>
				<h3>Sent!</h3>
				<button className="btn btn-yellow">Ok</button>
			</div>
	);
}

export default MessageSent;