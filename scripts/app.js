const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        selectUser: ""
    },
    methods: {
       onUserClick(user) {
           this.selectUser = user
       }
    },
    mounted(){
        this.selectUser = this.usersList[0]
    }
})