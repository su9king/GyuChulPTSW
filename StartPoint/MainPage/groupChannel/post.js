 /////////////////////////////post.js
  
  const response = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  
  if (response.ok) {
    const post = await response.json();
    displayPost(post);
    postForm.reset();
  }
  
  
  async function loadAllPosts() {  // 처음 접속하면 전체 글 모두 불러오기
    const response = await fetch('/posts');  // 여기에서 get 등장
    const posts = await response.json();
    posts.forEach(displayPost);
  }
  
  function displayPost(post) {  
    const postElement = document.createElement('div');  // 새롭게 생길 div 요소 생성
    postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><hr>`;
    postsDiv.appendChild(postElement); // 새로 생긴 div 요소를 글이 올라갈 클래스에 추가
  }