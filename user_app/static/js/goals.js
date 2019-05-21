var renderGoals = new Vue({
  delimiters: ['${','}'],
  el: '#renderGoals',
  data: {
    goals: []
  },
  mounted: function() {
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
        console.log('gl finally');
      });
  }
});
//
// var renderMilestones = new Vue({
//   delimeters: "'[[',']]'",
//   el: '#renderMilestones',
//   data: {
//     milestones: []
//   },
//   mounted() {
//     axios.get("http://localhost:8000/api/milestones/")
//       .then(response => {
//         this.milestones = response.data;
//         console.log(response.data)
//       })
//       .catch(error => {
//         console.log('ERROR');
//         console.log(error)
//       })
//       .finally(eh => {
//         console.log('ms finally');
//       });
//   }
// });
