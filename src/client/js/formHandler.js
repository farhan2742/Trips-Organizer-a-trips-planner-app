
import { fetchAPIdata } from './fetchAPIdata';
function handleSubmit() {
    fetchAPIdata();
    /*
	const formAction = document.getElementById('form__actions').value;
	switch(formAction) {
    	case "entity":
    		Client.entityExtract();
    		break;
    	case "summarization":
    		Client.summaryExtract();
    		break;
    	case "article":
    		Client.articleExtract();
    		break;
    	case "hashtag":
    		Client.hashtagExtract();
    		break;
    	default:
    		window.alert("no action selected");
    		break;
	}
    */
}
 export {handleSubmit}