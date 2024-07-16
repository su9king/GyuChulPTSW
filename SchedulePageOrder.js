const fs = require('fs').promises;
const path = require('path');

const scheduleFilePath = path.join(__dirname, 'ScheduleEvent.json');

async function schedulePageOrder(functionType, req) {
    //try {
        const data = await fs.readFile(scheduleFilePath, 'utf8');
        const events = JSON.parse(data);

        if (functionType === 1) {  // 기존 일정 불러오기
            return events;
        } 
        
        else if (functionType === 2) {  // 새로운 일정 추가
            const newEvent = req.body;
            newEvent.id = events.length ? events[events.length - 1].id + 1 : 1;  // 이미 id가 존재하면 이전 것에 +1, 아니면 1
            events.push(newEvent);  // 객체에 추가
            await fs.writeFile(scheduleFilePath, JSON.stringify(events, null, 2));  // json 파일에 최신화
            return newEvent;
        } 
        
        else if (functionType === 3) {
            const eventId = parseInt(req.params.id, 10);  // id를 10진법으로 정수로 변환
            const updatedEvents = events.filter(event => event.id !== eventId);
            await fs.writeFile(scheduleFilePath, JSON.stringify(updatedEvents, null, 2));  // null : 필터링 없이 전부 들어가!, 2는 보기편하라고 들여쓰기
            return { message: 'Event deleted' };
        }
    //} catch (error) {
    //    throw new Error('Failed to process event data');
    //}
}

module.exports = { schedulePageOrder };
