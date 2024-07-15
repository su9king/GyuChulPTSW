document.addEventListener('DOMContentLoaded', function() {
    const newMemberTemplateBtn = document.getElementById('newMemberTemplateBtn');
    const overlay = document.getElementById('overlay');
    const newMemberTemplate = document.getElementById('newMemberTemplate');

    function loadTemplate() {
        fetch('NewMemberTemplate.html')
            .then(response => response.text())
            .then(data => {
                newMemberTemplate.innerHTML = data;
                const closeTemplateBtn = newMemberTemplate.querySelector('#closeTemplateBtn');
                if (closeTemplateBtn) {
                    closeTemplateBtn.addEventListener('click', function() {
                        overlay.classList.remove('visible');
                        overlay.classList.add('hidden');
                        newMemberTemplate.classList.remove('visible');
                        newMemberTemplate.classList.add('hidden');
                    });
                }
            })
            .catch(error => console.error('Error loading template:', error));
    }

    if (newMemberTemplateBtn) {
        newMemberTemplateBtn.addEventListener('click', function() {
            overlay.classList.remove('hidden');
            overlay.classList.add('visible');
            newMemberTemplate.classList.remove('hidden');
            newMemberTemplate.classList.add('visible');
            loadTemplate();
        });
    }
});


function test() {  // 여기서 추가하면 NewMemberTemplate.html에서 사용 가능
    alert('test good')
}