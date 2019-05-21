new Vue({
  delimeters: "'[[',']]'",
  el: '#app',
  data: {
    goals: []
  },
  mounted() {
    axios.get("http://localhost:8000/api/goals/")
      .then(res => {
        this.goals = res.data;
        console.log(res.data)
      })
      .catch(error => {
        console.log('ERROR');
        console.log(error)
      })
      .finally(eh => {
        console.log(1+1);
      });
  }
});
