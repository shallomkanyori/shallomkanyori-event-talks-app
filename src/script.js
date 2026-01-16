document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('search');

  // talkData is injected by the build script
  const talks = window.talkData || [];

  const generateSchedule = (filter = '') => {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2026-01-01T10:00:00');
    
    const filteredTalks = talks.filter(talk => {
        if (!filter) return true;
        return talk.categories.some(cat => cat.toLowerCase().includes(filter.toLowerCase()));
    });

    if (filteredTalks.length === 0) {
        scheduleContainer.innerHTML = '<p style="text-align: center;">No talks found for the selected category.</p>';
        return;
    }

    filteredTalks.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      const scheduleItem = document.createElement('div');
      scheduleItem.className = 'schedule-item';

      const timeSlot = document.createElement('div');
      timeSlot.className = 'time-slot';
      timeSlot.innerHTML = `<span>${formatTime(startTime)}</span>-<span>${formatTime(endTime)}</span>`;
      
      const talkDetails = document.createElement('div');
      talkDetails.className = 'talk-details';
      
      const title = document.createElement('h2');
      title.textContent = talk.title;
      
      const speakers = document.createElement('p');
      speakers.className = 'speakers';
      speakers.textContent = `by ${talk.speakers.join(', ')}`;
      
      const description = document.createElement('p');
      description.className = 'description';
      description.textContent = talk.description;
      
      const categories = document.createElement('div');
      categories.className = 'categories';
      talk.categories.forEach(cat => {
        const categorySpan = document.createElement('span');
        categorySpan.textContent = cat;
        categories.appendChild(categorySpan);
      });

      talkDetails.appendChild(title);
      talkDetails.appendChild(speakers);
      talkDetails.appendChild(description);
      talkDetails.appendChild(categories);
      
      scheduleItem.appendChild(timeSlot);
      scheduleItem.appendChild(talkDetails);
      scheduleContainer.appendChild(scheduleItem);

      currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

      // Add lunch break after the 3rd talk
      if (index === 2) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);

        const lunchItem = document.createElement('div');
        lunchItem.className = 'schedule-item break-item';

        const lunchTimeSlot = document.createElement('div');
        lunchTimeSlot.className = 'time-slot time-slot-break';
        lunchTimeSlot.innerHTML = `<span>${formatTime(lunchStartTime)}</span>-<span>${formatTime(lunchEndTime)}</span>`;

        const lunchDetails = document.createElement('div');
        lunchDetails.className = 'talk-details';
        const lunchTitle = document.createElement('h2');
        lunchTitle.textContent = 'Lunch Break';
        lunchDetails.appendChild(lunchTitle);

        lunchItem.appendChild(lunchTimeSlot);
        lunchItem.appendChild(lunchDetails);
        scheduleContainer.appendChild(lunchItem);

        currentTime = new Date(lunchEndTime.getTime() + 10 * 60000); // 10 minute break after lunch
      }
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  searchInput.addEventListener('input', (e) => {
    generateSchedule(e.target.value);
  });

  generateSchedule();
});
