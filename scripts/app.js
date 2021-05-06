const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        selectUser: "",
        search: "",
        newMsgText: "",
    },
    computed: {
        // Filtro da usare nella sezione cerca della lista contatti con due funzioni includes/starsWith
        filteredUsersList() {

            return this.usersList.filter((element) => {
                // return element.name.toLowerCase().includes(this.search.toLowerCase());
                return element.name.toLowerCase().startsWith(this.search.toLowerCase());
            });
        }
    },
    methods: {
        onUserClick(user) {
            this.selectUser = user
        },
        formatTime(stringDate) {
            return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
        },

        // Funzione per inviare e ricevere una risposta in automatico dall'utente
        sendMessage() {
            const newMessage = {
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: this.newMsgText,
                status: 'sent'
            };
            this.selectUser.messages.push(newMessage);

            this.newMsgText = "";

            setTimeout(() => {
                const newRespMsg = {
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: "OK",
                    status: 'received'
                };
                this.selectUser.messages.push(newRespMsg);
            },1000);
        }
    },
// Con questo mounted appare il primo utente della chat all'avvio della pagina
    mounted() {
        this.selectUser = this.usersList[0];
    },
})