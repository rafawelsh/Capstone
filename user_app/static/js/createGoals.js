axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var createGoals = new Vue({
  delimeters: "'[[',']]'",
  el: '#createGoals',
  data: function () {
    return {
      goal_title : '',
      goal_text : '',
      milestones: [],
      milestone_name: '',
      milestone_bday: ''
    };
  },
  mounted: function () {

  },
  methods: {
    createGoal: function() {
      var params = {
        title: this.goal_title,
        text: this.goal_text,
        milestones: this.milestones,
      };
      axios
        .post("http://localhost:8000/api/goals/", params)
        .then(response => {
          console.log(response);
          this.goal = response.data;
        })

    },
    addMilestone: function(event) {
      event.preventDefault()
      this.milestones.push({
        text: this.milestone_name,
        deadline: this.milestone_bday
      })
      this.milestone_name = ''
      this.milestone_bday = ''
    },
    // createMilestones: function() {
    //   for (let milestone of this.milestones) {
    //
    //   }
    //   axios.post("http://localhost:8000/api/milestones/"), params)
    // }
  },
});
//
// var createMilestones = new Vue({
//   delimeters: "'[[',']]'",
//   el: '#createMilestones',
//   data: {
//     milestone_name_0 : '',
//     milestone_bday_0 : '',
//   },
//
//   methods: {
//     createMilestone: function(event) {
//       event.preventDefault()
//       axios.post("http://localhost:8000/api/milestones/"), {
//         text: this.milestone_name_0,
//         deadline: this.milestone_bday_0
//       }
//     }
//   },
// });
