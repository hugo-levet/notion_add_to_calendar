// set info of event
const setEventInfo = info => {
    if (info.title) {
        document.querySelector('#event-info .data.title').textContent = info.title;
    } else {
        document.querySelector('#event-info .data.title').textContent = 'No title';
        document.querySelector('#event-info .data.title').classList.add('no-data');
    }

    if (info.startDate && info.endDate) {
        document.querySelector('#event-info .data.date').textContent = info.dateInput;
    } else {
        document.querySelector('#event-info .data.date').textContent = 'No date';
        document.querySelector('#event-info .data.date').classList.add('no-data');
    }

    if (info.location) {
        document.querySelector('#event-info .data.location').textContent = info.location;
    } else {
        document.querySelector('#event-info .data.location').textContent = 'No location';
        document.querySelector('#event-info .data.location').classList.add('no-data');
    }

    if (info.details) {
        document.querySelector('#event-info .data.details').textContent = info.details;
    } else {
        document.querySelector('#event-info .data.details').textContent = 'No details';
        document.querySelector('#event-info .data.details').classList.add('no-data');
    }

    // set href
    document.querySelector('#event-info .button').href = info.link || '';
};

// Once the DOM is ready
// get info of event
window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { from: 'popup', subject: 'eventInfo' },
            setEventInfo);
    });
});

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(date) {
    // format : "September 23, 2021, at 9:00 am"
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, at ${date.getHours() % 12 || 12}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${date.getHours() >= 12 ? 'pm' : 'am'}`;
}
