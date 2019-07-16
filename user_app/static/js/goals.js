axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

let app

$(function() {
  app = new Vue({
    delimiters: ['${','}'],
    el: '#app',
    data: {
      goals: [],
      showModal: false,
      isEditing: false,
      goal_slug: null,
      goal_title : '',
      goal_text : '',
      milestones: [],
    },
    methods: {
      // rendering goals on page
      getGoals: function() {
        axios.get("http://localhost:8000/api/goals/")
          .then(res => {
            this.goals = res.data;
          })
          .catch(error => {
            console.log('ERROR');
            console.log(error)
          })
          .finally(eh => {
            console.log('gl finally');
          });
      },

      // creating a new goal
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
            this.getGoals()
          })
      },
      addMilestone: function(event) {
        this.milestones.push({
          text: this.milestone_name,
          deadline: this.milestone_bday
        })
        this.milestone_name = ''
        this.milestone_bday = ''
      },

      // editing a goal and milestone
      edit: function(evt) {
        this.isEditing = true
        this.goal_title = this.activeGoal.title
        this.goal_text = this.activeGoal.text
        this.milestones = this.activeGoal.milestones
        console.log(this.milestones)

      },
      update: function(e) {
        const editedgoal = {
          title: this.goal_title,
          text: this.goal_text,
        }
        axios.patch(`http://localhost:8000/api/goals/${this.activeGoal.id}/`, editedgoal)
        this.milestones.forEach(milestone => {
          console.log(milestone)
          if (milestone.id === undefined) {
            const params = {
              goal_parent: this.activeGoal.id,
              id: this.milestone,
              text: milestone.text,
              deadline: milestone.deadline,
            }
            axios
              .post(`http://localhost:8000/api/milestones/`, params)
              .then(response => {
                console.log(response);
                this.goal = response.data;
                this.getGoals()
              })
          } else {
            axios.patch(`http://localhost:8000/api/milestones/${milestone.id}/`, {
              text: milestone.text,
              deadline: milestone.deadline,
            })
            .then(response => {
              console.log(response);
              this.goal = response.data;
            })
          }
        })
      },
      deleteMilestone: function(id, index) {
        axios.delete(`http://localhost:8000/api/milestones/${id}`)
        .then(response => {
          console.log(this.event);
          this.deleteRow()
        });
      },
      deleteGoal: function(event) {
      axios.delete(`http://localhost:8000/api/goals/${this.activeGoal.id}`)
      .then(response => {
        console.log(this.event);
        this.getGoals()
      });
    },
      // editMilestone: function(event) {
      //   this.milestones.push({
      //     text: this.milestone_name,
      //     deadline: this.milestone_bday
      //   })
      //   this.milestone_name = this.milestone_name
      //   this.milestone_bday = this.milestone_bday
      // },

      // working with the modal to create a goal
      closeModal: function(event) {
        event.preventDefault()
        if (this.isEditing) {
          // call update method
          this.update()
          this.isEditing = false
        } else {
          // call create method
          this.createGoal()
        }
        this.goal_text = ''
        this.goal_title = ''
        this.milestones = []
        $('#createGoalModal').modal('toggle')
      },
      closeNoEdit: function(event) {
        this.isEditing = false
        $('#createGoalModal').modal('toggle')
        this.getGoals()
        this.goal_text = ''
        this.goal_title = ''
        this.milestones = []
      },
      // for dynamic ms in form //
      deleteRow: function(index) {
        this.milestones.splice(index,1)
      },

    },
    computed: {
      activeGoal: function() {
        const goal_id = $('#goals > .active').attr('href').slice(1)
        return this.goals.find((goal) => 'goal' + goal.id === goal_id)
      },

      // activeMilestone: function() {
      //   const ms_id = $('#tabContent > .active').attr('ul')
      //   return this.milestones.find((milestone) => milestones.id === milestone_id)
      // },
    },
    mounted: function() {
      this.getGoals()
    }
  });
})
