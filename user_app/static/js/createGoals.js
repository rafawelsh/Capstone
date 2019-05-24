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
    };
  },
  methods: {
    createGoal: function() {
      event.preventDefault()
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
    deleteRow(index) {
      this.milestones.splice(index,1)
    }
  },
});
