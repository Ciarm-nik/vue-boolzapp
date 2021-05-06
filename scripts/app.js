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

        // Nel momento che clicco sull'utente va a selezionare e salvare tutto l'oggetto
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

            this.scroll();

            setTimeout(() => {
                const newRespMsg = {
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: "OK. Va bene",
                    status: 'received'
                };
                this.selectUser.messages.push(newRespMsg);

                this.scroll();
            },1000);
        },
        scroll(){
            setTimeout(( )=>{
               const htmlElement = this.$refs.textScroll;
               htmlElement.scrollTop = htmlElement.scrollHeight;
            },100);
        }
    },
// Con questo mounted appare il primo utente della chat all'avvio della pagina
    mounted() {
        this.selectUser = this.usersList[0];
    },
})