const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        selectUser: ""
    },
    methods: {
       onUserClick(user) {
           this.selectUser = user
       },
       formatTime(stringDate) {
           return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
       }
    },
    mounted(){
        this.selectUser = this.usersList[0]
    }
})