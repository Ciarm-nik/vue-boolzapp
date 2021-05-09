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
        },
        getMsgClasses(message) {
            return{
                received: message.status === 'received', 
                sent:message.status === 'sent'}
        },
        onMsgClick(message, event) {
            this.$set(message, "showPopup", true);

            event.currentTarget.focus()
        },
        onMouseOut(message) {
            this.$set(message, "showPopup", false)
        },
        onPopupClick(message) {
            message.showPopup = false;
        },
        onDeleteClick(msgIndex) {
            this.selectUser.messages.splice(msgIndex, 1)
        },
        getLastMsg(messages) {
            if (messages.length === 0) {
                return  "Nessun messaggio disponibile"
            }
            const lastMsg = messages[messages.length - 1];
            const formatteDate = this.formatTime(lastMsg.date);

            let trimmedMsg = lastMsg.text.slice(0, 30);

            if (lastMsg.text.length > 30) {
                trimmedMsg += "...";
            }

            return trimmedMsg + " - " + formatteDate;
        }
    },
// Con questo mounted appare il primo utente della chat all'avvio della pagina
    mounted() {
        this.selectUser = this.usersList[0];
    },
})