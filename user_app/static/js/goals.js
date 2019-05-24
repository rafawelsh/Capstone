Vue.component('modal', {
  template: `
  <transition name="modal">
   <div class="modal-mask">
     <div class="modal-wrapper">
       <div class="modal-container">

         <div class="modal-header">
           <slot name="header">
             default header
           </slot>
         </div>

         <div class="modal-body">
           <slot name="body">
             default body
           </slot>
         </div>

         <div class="modal-footer">
           <slot name="footer">
             default footer
             <button class="modal-default-button" @click="$emit('close')">
               OK
             </button>
           </slot>
         </div>
         <form @submit="createGoal">
           <h3>Goal</h3>
           <p>
             <label for="goal_title">Goal:</label>
             <input id="goal_title" v-model="goal_title" type="text" name="goal_title" placeholder="Title">
           </p>
           <p>
             <label for="goal_text">What is this goal?:</label>
             <textarea id="goal_text" v-model="goal_text" type="text" name="goal_text" placeholder="About the Goal"></textarea>
           </p>

           <h3>Milestones</h3>
           <ul>
             <li v-for="(milestone, index) in milestones">
               <p>
                 <label for="milestone_name">Milestones:</label>
                 <input id="milestone_name" v-model="milestone.text" type="text" name="milestone_name" placeholder="milestone"></input>
               </p>

               <p>
                 <label for="milestone_bday">Deadline:</label>
                 <input id="milestone_bday" v-model="milestone.deadline" type="date" name="milestone_bday">
               </p>
               <button @click="deleteRow(index)">Delete</button>
               <p>
             </li>
           </ul>
           <button type="button" name="button" @click='addMilestone'>Add Milestone</button>
           <input type="submit" value="Submit">
       </div>
     </div>
   </div>
 </transition>
  `
})

var renderGoals = new Vue({
  delimiters: ['${','}'],
  el: '#renderGoals',
  data: {
    goals: [],
    showModal: false
  },
  methods: {
    newModal() {

    },
  },
  mounted: function() {
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
  }
});
