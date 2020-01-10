import { cryptico } from "../../cryptico-master/cryptico.js";
import router from "../router/index.js";

export default {
  name: "Mail",
  data() {
    return {
      mail: {}
    };
  },
  created: function() {
    let id = this.$route.params.id;

    let jwt = localStorage.getItem("jwt");

    fetch(`/api/v1/mails/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(response => response.json())
      .then(result => {
        this.mail = result;

        this.decryptMailText();

        if (this.mail.labels.unread) this.labelUpdate('unread');
      })
      .catch(err => console.log(err));
  },
  methods: {
    labelUpdate: function(labelName) {
      let jwt = localStorage.getItem("jwt");

      fetch(`/api/v1/mails/${this.mail._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({ labelName: labelName })
      })
        .then(res => res.json())
        .then(res => {
          this.mail.labels[labelName] = res.labels[labelName];
        })
        .catch(err => console.log(err));
    },
    showDeleteModal: function() {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this mail?')
          .then(value => {
            if (value) this.deleteMail();
          })
          .catch(err => console.log(err));
    },
    deleteMail: function() {
      let jwt = localStorage.getItem('jwt');

      fetch(`/api/v1/mails/${this.mail._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(() => router.push('/mails'))
        .catch(err => console.log(err));
    },
    decryptMailText: function() {
      let pass = localStorage.getItem("pass_phrase");
      const RSAkey = cryptico.generateRSAKey(pass, 1024);
      this.mail.text = cryptico.decrypt(this.mail.text, RSAkey).plaintext;
    }
  }
};