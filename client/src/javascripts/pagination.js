export default {
    name: "PagintaionMenu",
    props: ["entities", "type", "search"],
    data() {
        return {
            currPage: 1,
            pagesAmount: 1
        };
    },
    created: function () {
        this.getPage();
        this.getPagesAmount();
    },
    watch: {
        entities: function () {
            this.getPagesAmount();
        }
    },
    methods: {

        previous: function () {
            if (this.currPage > 1) {
                this.currPage--;
                this.getPage();
            }
        },

        next: function () {
            if (this.currPage < this.pagesAmount) {
                this.currPage++;
                this.getPage();
            }
        },

        goTo: function () {
            const goto = document.getElementById("goto-page-num");

            if (goto.checkValidity()) {
                this.currPage = goto.value;
                this.getPage();
            }
        },

        getPage: function () {
            const jwt = localStorage.getItem("jwt");

            let path = `/api/v1/${this.type}/?page=${this.currPage}`;
            if (this.search) 
                path += `&search=${this.search}`;

            fetch(path, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
                .then(response => response.json())
                .then(result => {
                    this.$emit("update:entities", result);
                })
                .catch(console.error);
        },

        getPagesAmount: function () {
            const jwt = localStorage.getItem("jwt");
            let path = `/api/v1/${this.type}/get_pages`;

            if (this.search) 
                path += `/?search=${this.search}`;

            fetch(path, { 
                headers: { Authorization: `Bearer ${jwt}` } 
            })
                .then(response => response.json())
                .then(result => {
                    this.pagesAmount = result.pagesAmount;
                    this.$emit("update:entitiesAmount", result.resultsAmount);
                })
                .catch(err => console.log("Cannot get page amount ", err));
        }
    }
};