document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            start: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
            center: 'title',
            end: 'custom2 prevYear,prev,next,nextYear'
        },
        footerToolbar: {
            start: 'custom1,custom2',
            center: '',
            end: 'prev,next'
        },
        customButtons: {
            custom1: {
                text: 'custom 1',
                click: function() {
                    alert('clicked custom button 1!');
                }
            },
            custom2: {
                text: 'custom 2',
                click: function() {
                    alert('clicked custom button 2!');
                }
            }
        },
        events: fetchEvents,
        eventClick: function(info) {
            if (confirm(`Are you sure you want to delete the event '${info.event.title}'?`)) {
                info.event.remove();
                deleteEvent(info.event.id);
            }
        }
    });
    calendar.render();

    // 이벤트 폼 처리
    var eventForm = document.getElementById('eventForm');
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var eventTitle = document.getElementById('eventTitle').value;
        var eventStart = document.getElementById('eventStart').value;
        var eventEnd = document.getElementById('eventEnd').value;

        if (eventTitle && eventStart) {
            var newEvent = {
                title: eventTitle,
                start: eventStart
            };
            if (eventEnd) {
                newEvent.end = eventEnd;
            }
            saveEvent(newEvent, function(savedEvent) {
                calendar.addEvent(savedEvent);
                calendar.render();
            });

            eventForm.reset();
        }
    });


    // 기존 일정들 불러오기
    function fetchEvents(info, successCallback, failureCallback) {
        console.log('불러오기 함수 실행');
        fetch('/getAllSchedule')
            .then(response => response.json())
            .then(data => successCallback(data))
            .catch(error => failureCallback(error));
    }

    // 새로운 일정 저장
    function saveEvent(event, callback) {
        fetch('/newSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event saved:', data);
            callback(data);
            location.reload();
        })
        .catch(error => {
            console.error('Error saving event:', error);
        });
    }

    // 일정 삭제
    function deleteEvent(eventId) {
        fetch(`/delSchedule/${eventId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event deleted:', data);
        })
        .catch(error => {
            console.error('Error deleting event:', error);
        });
    }
});
