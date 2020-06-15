import React, {useState, useEffect} from 'react';
import Helmet from "react-helmet";
import { withRouter} from "react-router-dom";
import { pageViewEvent } from '@surran/events'

function MetaTags({
	title = "Terminal Notes - Web Development Solutions",
	description = "Terminal Notes - Web Development Solutions in Javascript, HTML and Nodejs. A developer's notes on graphics, backend, deployment, database, front end and much more.",
	imageUrl = "https://www.terminalnotes.com/growthImages/all.png",
	index=true,
	location
}) {
	const [locationPath, setLocationPath] = useState(location);
	if(locationPath != location) setLocationPath(location)
	useEffect(() => {
		pageViewEvent();
	},[locationPath])

	return (<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
    			<meta property="og:image" content={imageUrl} />
    			<meta property="og:title" content={title} />
 				<meta property="og:description" content={description} />
 				<meta name="robots" content={index ? "index" : "noindex"} />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@surranshan"/>
				<meta name="twitter:title" content={title}/>
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={imageUrl}/>
    		</Helmet>)
}

export default withRouter(MetaTags)