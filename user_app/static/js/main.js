const app = document.querySelector('div#app');

axios.get("http://localhost:8000/api/goals/")
  .then(goals => {
    for(let title in goals.data){
    app.innerHTML = `
      <h1>Goal: ${goals.data[title].title}</h1>
    `;
    }
  })
  .catch(error => {
    console.log('ERROR');
    console.log(error)
  })
  .finally(eh => {
    console.log(1+1);
  });
